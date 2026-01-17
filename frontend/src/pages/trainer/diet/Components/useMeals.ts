// useMeals.ts
import { useState } from "react";
import { useMutation } from "@apollo/client/react"; 
import { useToast } from "@/hooks/use-toast";
import { CREATE_MEAL_MUTATION, DELETE_MEAL } from "@/graphql/mutations";
import { GET_MACROS_QUERY } from "@/graphql/queries";
import { client } from "@/lib/apollo";
import type { Meal, GetMacrosResponse, GetMacrosVariables, DeleteMealVariables } from "../types";

export const useMeals = () => {
  const { toast } = useToast();

  const [mealForm, setMealForm] = useState({ name: "", description: "", time: "", calories: "", protein: "", carbs: "", fats: "" });
  const [editMeal, setEditMeal] = useState<null | { isOpen: boolean; meal: Meal & { _id: string } }>(null);
  const [deleteMealConfirm, setDeleteMealConfirm] = useState<null | { isOpen: boolean; planId: string; mealId: string; name: string }>(null);
  const [activePlanId, setActivePlanId] = useState<string | null>(null);
  const [fetchMacrosLoading, setFetchMacrosLoading] = useState(false);
  const [buttonLoaders, setButtonLoaders] = useState({ deletingMeal: false });

  const [createMealMutation] = useMutation(CREATE_MEAL_MUTATION);
  const [deleteMeal] = useMutation<DeleteMealVariables, DeleteMealVariables>(DELETE_MEAL);

  const fetchMacros = async (mealName: string) => {
    setFetchMacrosLoading(true);
    try {
      const { data } = await client.query<GetMacrosResponse, GetMacrosVariables>({
        query: GET_MACROS_QUERY,
        variables: { name: mealName },
      });
      if (data?.getMacros) {
        
        setMealForm(prev => ({
          ...prev,
          calories: data.getMacros.calories.toString(),
          protein: data.getMacros.protein.toString(),
          carbs: data.getMacros.carbs.toString(),
          fats: data.getMacros.fats.toString(),
        }));
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
      name: mealForm.name.trim(),
      description: mealForm.description.trim(),
      time: mealForm.time,
      calories: Number(mealForm.calories) || 0,
      protein: Number(mealForm.protein) || 0,
      carbs: Number(mealForm.carbs) || 0,
      fats: Number(mealForm.fats) || 0,
    };

    try {
      const { data } = await createMealMutation({ variables: { dietId: planId, input: newMealInput } });
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

  const handleEditMealSave = () => console.log(editMeal);

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
  };
};
