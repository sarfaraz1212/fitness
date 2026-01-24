// useMeals.ts
import { useState } from "react";
import { useMutation } from "@apollo/client/react"; 
import { useToast } from "@/hooks/use-toast";
import { CREATE_MEAL_MUTATION, DELETE_MEAL, EDIT_MEAL_MUTATION } from "@/graphql/mutations";
import { GET_MACROS_QUERY } from "@/graphql/queries";
import { client } from "@/lib/apollo";
import type { Meal, GetMacrosResponse, GetMacrosVariables, DeleteMealVariables } from "../types";
import { useAuthStore } from "@/stores/authStore";


export const useMeals = () => {
  const { toast } = useToast();


  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const [mealForm, setMealForm] = useState({ name: "", description: "", time: "", calories: "", protein: "", carbs: "", fats: "" });
  const [editMeal, setEditMeal] = useState<null | { isOpen: boolean; meal: Meal & { _id: string }; planId: string; originalName: string }>(null);
  const [deleteMealConfirm, setDeleteMealConfirm] = useState<null | { isOpen: boolean; planId: string; mealId: string; name: string }>(null);
  const [activePlanId, setActivePlanId] = useState<string | null>(null);
  const [fetchMacrosLoading, setFetchMacrosLoading] = useState(false);
  const [buttonLoaders, setButtonLoaders] = useState({ deletingMeal: false, updatingMeal: false });

  const [createMealMutation] = useMutation(CREATE_MEAL_MUTATION);
  const [editMealMutation] = useMutation(EDIT_MEAL_MUTATION);
  const [deleteMeal] = useMutation<DeleteMealVariables, DeleteMealVariables>(DELETE_MEAL);

  const fetchMacros = async (
    mealName: string,
    onSuccess?: (macros: { calories: number; protein: number; carbs: number; fats: number }) => void
  ) => {
    setFetchMacrosLoading(true);
    try {
      const { data } = await client.query<GetMacrosResponse, GetMacrosVariables>({
        query: GET_MACROS_QUERY,
        variables: { name: mealName },
      });
      if (data?.getMacros) {
        const macros = {
          calories: data.getMacros.calories,
          protein: data.getMacros.protein,
          carbs: data.getMacros.carbs,
          fats: data.getMacros.fats,
        };
        
        // If callback provided, use it (for edit context), otherwise update mealForm (for create context)
        if (onSuccess) {
          onSuccess(macros);
        } else {
          setMealForm(prev => ({
            ...prev,
            calories: macros.calories.toString(),
            protein: macros.protein.toString(),
            carbs: macros.carbs.toString(),
            fats: macros.fats.toString(),
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching macros:", error);
    } finally {
      setFetchMacrosLoading(false);
    }
  };

  const handleAddMeal = async (planId: string, dietPlans: any, setDietPlans: any) => {
    if (!mealForm.name.trim()) return toast({ title: "Error", description: "Meal name is required", variant: "destructive" });

    const newMealInput = {
      addedBy: isAuthenticated && user ? user._id : "",
      name: mealForm.name.trim(),
      description: mealForm.description.trim(),
      time: mealForm.time,
      calories: Number(mealForm.calories) || 0,
      protein: Number(mealForm.protein) || 0,
      carbs: Number(mealForm.carbs) || 0,
      fats: Number(mealForm.fats) || 0,
    };

    try {
      const { data } = await createMealMutation(
        { variables: {input: newMealInput, dietId: planId } 
      });

      const newMeal = { id: data.createMeal._id, ...newMealInput };
      setDietPlans(prev => prev.map(plan => (plan.id === planId ? { ...plan, meals: [...plan.meals, newMeal] } : plan)));
      setMealForm({ name: "", description: "", time: "", calories: "", protein: "", carbs: "", fats: "" });
      setActivePlanId(null);
      toast({ title: "Meal added!", description: `${newMeal.name} has been added.` });
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to add meal", variant: "destructive" });
    }
  };

  const removeMeal = async (planId: string, mealId: string, dietPlans: any, setDietPlans: any) => {
    setButtonLoaders(prev => ({ ...prev, deletingMeal: true }));
    try {
      await deleteMeal({ variables: { dietId: planId, mealId } });
      setDietPlans(prev => prev.map(plan => (plan.id === planId ? { ...plan, meals: plan.meals.filter(m => m.id !== mealId) } : plan)));
      toast({ title: "Meal deleted", description: "The meal has been removed from the plan." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete meal", variant: "destructive" });
    } finally {
      setButtonLoaders(prev => ({ ...prev, deletingMeal: false }));
    }
  };

  const handleDeleteMeal = async (dietPlans: any, setDietPlans: any) => {
    if (deleteMealConfirm) {
      await removeMeal(deleteMealConfirm.planId, deleteMealConfirm.mealId, dietPlans, setDietPlans);
      setDeleteMealConfirm(null);
    }
  };

  const handleEditMealSave = async (dietPlans: any, setDietPlans: any) => {
    if (!editMeal) return;
    
    if (!editMeal.meal.name.trim()) {
      toast({ title: "Error", description: "Meal name is required", variant: "destructive" });
      return;
    }

    setButtonLoaders(prev => ({ ...prev, updatingMeal: true }));

    try {
      const mealInput = {
        name: editMeal.meal.name.trim(),
        description: editMeal.meal.description?.trim() || "",
        time: editMeal.meal.time || "",
        calories: editMeal.meal.calories || 0,
        protein: editMeal.meal.protein || 0,
        carbs: editMeal.meal.carbs || 0,
        fats: editMeal.meal.fats || 0,
      };

      const { data } = await editMealMutation({
        variables: {
          dietId: editMeal.planId,
          mealId: editMeal.meal._id,
          input: mealInput,
        },
      });

      if (data?.editMeal) {
        const updatedMeal = {
          id: data.editMeal._id,
          name: data.editMeal.name,
          description: data.editMeal.description || "",
          time: data.editMeal.time,
          calories: data.editMeal.calories,
          protein: data.editMeal.protein,
          carbs: data.editMeal.carbs,
          fats: data.editMeal.fats,
        };

        // Update the meal in the dietPlans
        setDietPlans((prev: any) =>
          prev.map((plan: any) =>
            plan.id === editMeal.planId
              ? {
                  ...plan,
                  meals: plan.meals.map((m: any) =>
                    m.id === editMeal.meal._id ? updatedMeal : m
                  ),
                }
              : plan
          )
        );

        setEditMeal(null);
        toast({ title: "Meal updated!", description: `${updatedMeal.name} has been updated.` });
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to update meal", variant: "destructive" });
    } finally {
      setButtonLoaders(prev => ({ ...prev, updatingMeal: false }));
    }
  };

  const openEditMeal = (planId: string, meal: any) => {
    const mealForEdit = {
      _id: meal.id,
      name: meal.name || "",
      description: meal.description || "",
      time: meal.time || "",
      calories: meal.calories || 0,
      protein: meal.protein || 0,
      carbs: meal.carbs || 0,
      fats: meal.fats || 0,
    };
    setEditMeal({ isOpen: true, meal: mealForEdit, planId, originalName: meal.name || "" });
  };

  return {
    mealForm,
    setMealForm,
    editMeal,
    setEditMeal,
    deleteMealConfirm,
    setDeleteMealConfirm,
    activePlanId,
    setActivePlanId,
    fetchMacrosLoading,
    buttonLoaders,
    fetchMacros,
    handleAddMeal,
    handleDeleteMeal,
    handleEditMealSave,
    openEditMeal,
  };
};
