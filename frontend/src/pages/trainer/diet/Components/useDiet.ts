import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client/react"; 
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { CREATE_DIET_MUTATION, DELETE_DIET } from "@/graphql/mutations";
import { fetchDiets } from "@/lib/React-query/queryFunction";

import type { 
        DietPlan,
        CreateDietResponse, 
        CreateDietVariables, 
        DeleteDietResponse, 
        DeleteDietVariables, 
        Meal 
} from "../types";

export const useDiet = () => {
  const { toast } = useToast();

  const [dietPlans, setDietPlans]                 = useState<DietPlan[]>([]);
  const [loadingPlans, setLoadingPlans]           = useState(true);
  const [formData, setFormData]                   = useState({ name: "", description: "" });
  const [deletePlanConfirm, setDeletePlanConfirm] = useState<null | { isOpen: boolean; planId: string; name: string }>(null);

  const [createDietLoading, setCreateDietLoading] = useState(false);
  const [buttonLoaders, setButtonLoaders] = useState({ deletingPlan: false });

  const [createDiet] = useMutation<CreateDietResponse, CreateDietVariables>(CREATE_DIET_MUTATION);
  const [deletePlan] = useMutation<DeleteDietResponse, DeleteDietVariables>(DELETE_DIET);

  // Fetch diets
  const { data: diets, isLoading } = useQuery({ queryKey: ["diets"], queryFn: fetchDiets });

  useEffect(() => {
    if (diets) {
      const mapped: DietPlan[] = diets.map((d: any) => ({
        id: d._id,
        name: d.name,
        description: d.description,
        meals: d.meals.map((m: any) => ({
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
    }
    setLoadingPlans(false);
  }, [diets]);

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

  const handleCreatePlan = async () => {
    if (!formData.name.trim()) return toast({ title: "Error", description: "Plan name is required", variant: "destructive" });

    setCreateDietLoading(true);
    try {
      const response = await createDiet({ variables: { input: { name: formData.name.trim(), description: formData.description.trim() } } });
      if (response.data?.createDiet) {
        const newPlan: DietPlan = { id: response.data.createDiet._id, name: formData.name.trim(), description: formData.description.trim(), meals: [] };
        setDietPlans(prev => [...prev, newPlan]);
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

  return {
    dietPlans,
    loadingPlans,
    isLoading,
    formData,
    setFormData,
    deletePlanConfirm,
    setDeletePlanConfirm,
    createDietLoading,
    buttonLoaders,
    togglePlan,
    getTotalMacros,
    handleCreatePlan,
    handleDeletePlan,
    setDietPlans
  };
};
