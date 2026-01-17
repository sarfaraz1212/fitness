import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client/react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { CREATE_DIET_MUTATION, DELETE_DIET, EDIT_DIET_MUTATION } from "@/graphql/mutations";
import { fetchDiets } from "@/lib/React-query/queryFunction";

import type {
  DietPlan,
  CreateDietResponse,
  CreateDietVariables,
  DeleteDietResponse,
  DeleteDietVariables,
  EditDietResponse,
  EditDietVariables,
  Meal
} from "../types";

export const useDiet = (params: { page: number; limit: number; search: string; sortBy: string }) => {
  const { toast } = useToast();

  const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 0, currentPage: 1 });
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [deletePlanConfirm, setDeletePlanConfirm] = useState<null | { isOpen: boolean; planId: string; name: string }>(null);
  const [editPlan, setEditPlan] = useState<null | { isOpen: boolean; plan: DietPlan }>(null);

  const [createDietLoading, setCreateDietLoading] = useState(false);
  const [buttonLoaders, setButtonLoaders] = useState({ deletingPlan: false, updatingPlan: false });

  const [createDiet] = useMutation<CreateDietResponse, CreateDietVariables>(CREATE_DIET_MUTATION);
  const [editDiet] = useMutation<EditDietResponse, EditDietVariables>(EDIT_DIET_MUTATION);
  const [deletePlan] = useMutation<DeleteDietResponse, DeleteDietVariables>(DELETE_DIET);

  // Fetch diets
  const { data: dietsData, isLoading } = useQuery({
    queryKey: ["diets", params.page, params.limit, params.search, params.sortBy],
    queryFn: () => fetchDiets(params)
  });

  useEffect(() => {
    if (dietsData && dietsData.diets) {
      const mapped: DietPlan[] = dietsData.diets.map((d: any) => ({
        id: d._id,
        name: d.name,
        description: d.description,
        meals: (d.meals || []).map((m: any) => ({
          id: m._id,
          name: m.name,
          description: m.description,
          time: m.time,
          calories: m.calories,
          protein: m.protein,
          carbs: m.carbs,
          fats: m.fats,
        })),
      }));
      setDietPlans(mapped);
      setPagination({
        total: dietsData.total || 0,
        totalPages: dietsData.totalPages || 0,
        currentPage: dietsData.currentPage || 1
      });
    } else if (dietsData) {
      // Handle the case where dietsData exists but maybe empty or default
      setPagination(prev => ({
        ...prev,
        total: dietsData.total || 0,
        totalPages: dietsData.totalPages || 0,
        currentPage: dietsData.currentPage || 1
      }));
    }
    setLoadingPlans(false);
  }, [dietsData]);

  const togglePlan = (planId: string) => {
    setDietPlans(prev =>
      prev.map(plan => (plan.id === planId ? { ...plan, isOpen: !plan.hasOwnProperty("isOpen") ? true : !plan.isOpen } : plan))
    );
  };

  const getTotalMacros = (meals: Meal[]) =>
    meals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fats: acc.fats + meal.fats,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );

  const handleCreatePlan = async (): Promise<void> => {
    if (!formData.name.trim()) {
      toast({ title: "Error", description: "Plan name is required", variant: "destructive" });
      return;
    }

    setCreateDietLoading(true);
    try {
      const response = await createDiet({ variables: { input: { name: formData.name.trim(), description: formData.description.trim() } } });
      if (response.data?.createDiet) {
        const newPlan: DietPlan = { id: response.data.createDiet._id, name: formData.name.trim(), description: formData.description.trim(), meals: [] };
        // Refetching might be better with pagination, but for now we just add it locally if it's page 1
        if (params.page === 1) {
          setDietPlans(prev => [newPlan, ...prev].slice(0, params.limit));
        }
        setFormData({ name: "", description: "" });
        toast({ title: "Plan created!", description: `${newPlan.name} has been created.` });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCreateDietLoading(false);
    }
  };

  const removePlan = async (planId: string) => {
    setButtonLoaders(prev => ({ ...prev, deletingPlan: true }));
    try {
      const { data } = await deletePlan({ variables: { dietId: planId } });
      if (data?.deleteDiet) {
        setDietPlans(prev => prev.filter(p => p.id !== data.deleteDiet));
        toast({ title: "Plan deleted" });
      } else toast({ title: "Error deleting plan", variant: "destructive" });
    } catch (error) {
      console.error(error);
      toast({ title: "Error deleting plan", variant: "destructive" });
    } finally {
      setButtonLoaders(prev => ({ ...prev, deletingPlan: false }));
    }
  };

  const handleDeletePlan = async () => {
    if (deletePlanConfirm) {
      await removePlan(deletePlanConfirm.planId);
      setDeletePlanConfirm(null);
    }
  };

  const openEditPlan = (plan: DietPlan) => {
    setEditPlan({ isOpen: true, plan: { ...plan } });
  };

  const handleEditPlanSave = async () => {
    if (!editPlan) return;

    if (!editPlan.plan.name.trim()) {
      toast({ title: "Error", description: "Plan name is required", variant: "destructive" });
      return;
    }

    setButtonLoaders(prev => ({ ...prev, updatingPlan: true }));

    try {
      const response = await editDiet({
        variables: {
          dietId: editPlan.plan.id,
          input: {
            name: editPlan.plan.name.trim(),
            description: editPlan.plan.description.trim(),
          },
        },
      });

      if (response.data?.editDiet) {
        const updatedPlan: DietPlan = {
          id: response.data.editDiet._id,
          name: response.data.editDiet.name,
          description: response.data.editDiet.description || "",
          meals: editPlan.plan.meals, // Keep existing meals
        };

        setDietPlans(prev =>
          prev.map(plan => (plan.id === editPlan.plan.id ? updatedPlan : plan))
        );

        setEditPlan(null);
        toast({ title: "Plan updated!", description: `${updatedPlan.name} has been updated.` });
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to update plan", variant: "destructive" });
    } finally {
      setButtonLoaders(prev => ({ ...prev, updatingPlan: false }));
    }
  };

  return {
    dietPlans,
    pagination,
    dietsData,
    loadingPlans,
    isLoading,
    formData,
    setFormData,
    deletePlanConfirm,
    setDeletePlanConfirm,
    editPlan,
    setEditPlan,
    createDietLoading,
    buttonLoaders,
    togglePlan,
    getTotalMacros,
    handleCreatePlan,
    handleDeletePlan,
    openEditPlan,
    handleEditPlanSave,
    setDietPlans
  };
};
