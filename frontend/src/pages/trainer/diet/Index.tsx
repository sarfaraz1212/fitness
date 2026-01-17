import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Utensils,
  Plus,
  Trash2,
  Clock,
  Flame,
  ChevronDown,
  ChevronUp,
  Dumbbell,
  Wheat,
  Droplet,
  AlertTriangle,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useMutation } from "@apollo/client/react";
import { CREATE_DIET_MUTATION, CREATE_MEAL_MUTATION } from "@/graphql/mutations";
import { useQuery } from "@tanstack/react-query";
import { fetchDiets } from "@/lib/React-query/queryFunction";
import NewPlanForm from "./Components/NewPlanForm";
import AddMealForm from "./Components/AddMealForm";
import HeroHeader from "./Components/HeroHeader";
import { SearchComponent } from "./Components/SearchComponent";
import type { CreateDietResponse, CreateDietVariables, DietPlan, GetMacrosResponse, GetMacrosVariables, Meal } from "./types";
import { GET_MACROS_QUERY } from "@/graphql/queries";
import { client } from '@/lib/apollo';

const Index = () => {
  const navigate  = useNavigate();
  const { toast } = useToast();

  // State
  const [formData, setFormData] = useState({
    name        : "",
    description : "",
  });

  const [mealForm, setMealForm] = useState({
    name        : "",
    description : "",
    time        : "",
    calories    : "",
    protein     : "",
    carbs       : "",
    fats        : "",
  });

  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    type: 'plan' | 'meal';
    planId: string;
    mealId?: string;
    name: string;
  } | null>(null);

  const [dietPlans, setDietPlans]             = useState<DietPlan[]>([]);
  const [showNewPlanForm, setShowNewPlanForm] = useState(false);
  const [activePlanId, setActivePlanId]       = useState<string | null>(null);
  const [loadingPlans, setLoadingPlans]       = useState(true);
  const [searchQuery, setSearchQuery]         = useState("");
  const [sortBy, setSortBy]                   = useState("");



  const [createDiet] = useMutation<CreateDietResponse, CreateDietVariables>(CREATE_DIET_MUTATION);
  const [createDietLoading,setCreateDietLoading]   = useState(false);
  const [createMealLoading,setCreateMealLoading]   = useState(false);
  const [fetchMacrosLoading,setFetchMacrosLoading] = useState(false); 


  const [createMealMutation] = useMutation(CREATE_MEAL_MUTATION);

  const { data: diets, isLoading } = useQuery({
    queryKey: ["diets"],
    queryFn: () => fetchDiets(),
  });

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

    const fetchMacros = async (mealName: string) => {

      setFetchMacrosLoading(true);
      try {
        const { data } = await client.query<
        GetMacrosResponse,
        GetMacrosVariables
        >({
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
        return null;
      } finally{
        setFetchMacrosLoading(false);
      }
    };
  

  const handleCreatePlan = async () => {

    setCreateDietLoading(true);
  
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Plan name is required",
        variant: "destructive",
      });
      return;
    }
  
    try {
      const response = await createDiet({
        variables: {
          input: {
            name: formData.name.trim(),
            description: formData.description.trim(),
          },
        },
      });


      if (response.data?.createDiet) {
        const { _id } = response.data.createDiet; 
    
    
        const newPlan: DietPlan = {
          id:_id, 
          name: formData.name.trim(),
          description: formData.description.trim(),
          meals: [],
        };

        console.log(newPlan);
    
        setDietPlans((prev) => [...prev, newPlan]);
        setFormData({ name: "", description: "" });
        setShowNewPlanForm(false);
    
        toast({
          title: "Plan created!",
          description: `${newPlan.name} has been created.`,
        });
      }
     
    } catch (error) {
      console.error(error);
    } finally{
      setCreateDietLoading(false);
    }
  };
  

  const handleAddMeal = async (planId: string) => {

    console.log(dietPlans);
    if (!mealForm.name.trim()) {
      toast({ title: "Error", description: "Meal name is required", variant: "destructive" });
      return;
    }
  
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
      const { data } = await createMealMutation({
        variables: {
          dietId: planId,
          input: newMealInput,
        },
      });
  
      // Update local state with the returned meal from server
      const newMeal = {
        id: data.createMeal._id,
        ...newMealInput,
      };
  
      setDietPlans(prev =>
        prev.map(plan =>
          plan.id === planId ? { ...plan, meals: [...plan.meals, newMeal] } : plan
        )
      );
  
      setMealForm({ name: "", description: "", time: "", calories: "", protein: "", carbs: "", fats: "" });
      setActivePlanId(null);
      toast({ title: "Meal added!", description: `${newMeal.name} has been added.` });
  
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to add meal", variant: "destructive" });
    }
  };
  
  const removeMeal = (planId: string, mealId: string) => {
    setDietPlans(prev => prev.map(plan => 
      plan.id === planId 
        ? { ...plan, meals: plan.meals.filter(m => m.id !== mealId) }
        : plan
    ));
    toast({ title: "Meal deleted", description: "The meal has been removed from the plan." });
  };
  
  const handleDeleteConfirm = () => {
    if (!deleteConfirm) return;
    
    if (deleteConfirm.type === 'plan') {
      removePlan(deleteConfirm.planId);
    } else if (deleteConfirm.type === 'meal' && deleteConfirm.mealId) {
      removeMeal(deleteConfirm.planId, deleteConfirm.mealId);
    }
    setDeleteConfirm(null);
  };

  const openDeleteConfirm = (type: 'plan' | 'meal', planId: string, name: string, mealId?: string) => {
    setDeleteConfirm({ isOpen: true, type, planId, mealId, name });
  };

  const removePlan = (planId: string) => {
    setDietPlans(prev => prev.filter(p => p.id !== planId));
    toast({ title: "Plan deleted" });
  };

  const togglePlan = (planId: string) => {
  
    setDietPlans(prev =>
      prev.map(plan =>
        plan.id === planId ? { ...plan, isOpen: !plan.hasOwnProperty("isOpen") ? true : !plan.isOpen } : plan
      )
    );
  };

  const getTotalMacros = (meals: Meal[]) => {
    return meals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fats: acc.fats + meal.fats,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  };

  if (loadingPlans || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading diet plans...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <HeroHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* New Plan Form */}
        {showNewPlanForm && (
          <NewPlanForm
            formData={formData}
            setFormData={setFormData}
            handleCreatePlan={handleCreatePlan}
            setShowNewPlanForm={setShowNewPlanForm}
            createDietLoading = {createDietLoading}
          />
        )}

        <SearchComponent
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          setShowNewPlanForm={setShowNewPlanForm}
        />

        <div className="grid lg:grid-cols-2 gap-6 mt-4">
          {dietPlans.length === 0 && !showNewPlanForm ? (
            <div className="lg:col-span-2 text-center py-12 rounded-2xl bg-card border border-border">
              <Utensils className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No diet plans yet. Create your first one!
              </p>
              <Button onClick={() => setShowNewPlanForm(true)} className="mt-4">
                <Plus className="w-4 h-4 mr-2" /> Create Plan
              </Button>
            </div>
          ) : (
            dietPlans.map(plan => {
              const totals = getTotalMacros(plan.meals);
              return (
                <Collapsible
                  key={plan.id}
                  open={plan.hasOwnProperty("isOpen") ? plan.isOpen : false}
                  onOpenChange={() => togglePlan(plan.id)}
                >
                  <div className="rounded-2xl bg-card border border-border overflow-hidden">
                    <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Utensils className="w-6 h-6 text-primary" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-foreground text-lg">{plan.name}</h3>
                          <p className="text-sm text-muted-foreground">{plan.meals.length} meals • {totals.calories} kcal</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={(e) => { e.stopPropagation(); removePlan(plan.id); }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        {plan.hasOwnProperty("isOpen") && plan.isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="px-4 pb-4 space-y-4">
                        {plan.description && (
                          <p className="text-sm text-muted-foreground">{plan.description}</p>
                        )}

                        {/* Total Macros */}
                        <div className="p-4 rounded-xl bg-muted/50 grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {/* Calories */}
                        <div className="text-center p-2 rounded-lg bg-primary/10">
                          <Flame className="w-4 h-4 text-primary mx-auto mb-1" />
                          <p className="text-xs text-muted-foreground">Calories</p>
                          <p className="font-bold text-foreground">{totals.calories}</p>
                        </div>

                        {/* Protein */}
                        <div className="text-center p-2 rounded-lg bg-primary/10">
                          <Dumbbell className="w-4 h-4 text-primary mx-auto mb-1" />
                          <p className="text-xs text-muted-foreground">Protein</p>
                          <p className="font-bold text-foreground">{totals.protein}g</p>
                        </div>

                        {/* Carbs */}
                        <div className="text-center p-2 rounded-lg bg-primary/10">
                          <Wheat className="w-4 h-4 text-primary mx-auto mb-1" />
                          <p className="text-xs text-muted-foreground">Carbs</p>
                          <p className="font-bold text-foreground">{totals.carbs}g</p>
                        </div>

                        {/* Fats */}
                        <div className="text-center p-2 rounded-lg bg-primary/10">
                          <Droplet className="w-4 h-4 text-primary mx-auto mb-1" />
                          <p className="text-xs text-muted-foreground">Fats</p>
                          <p className="font-bold text-foreground">{totals.fats}g</p>
                        </div>
                      </div>


                        {/* Meals */}
                        <div className="space-y-2">
                          {plan.meals.map(meal => (
                            <div key={meal.id} className="p-3 rounded-xl bg-muted/30 flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-foreground text-sm">{meal.name}</span>
                                  {meal.time && (
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {meal.time}
                                    </span>
                                  )}
                                </div>
                                {meal.description && (
                                  <p className="text-xs text-muted-foreground mt-0.5">{meal.description}</p>
                                )}
                               <div className="flex flex-wrap gap-1.5 mt-2">
                                  {/* Calories */}
                                  <span className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded bg-primary/20 text-primary font-medium">
                                    <Flame className="w-3 h-3" />
                                    {meal.calories} kcal
                                  </span>

                                  {/* Protein */}
                                  <span className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                                    <Dumbbell className="w-3 h-3" />
                                    {meal.protein}g
                                  </span>

                                  {/* Carbs */}
                                  <span className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
                                    <Wheat className="w-3 h-3" />
                                    {meal.carbs}g
                                  </span>

                                  {/* Fats */}
                                  <span className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400 font-medium">
                                    <Droplet className="w-3 h-3" />
                                    {meal.fats}g
                                  </span>
                                </div>

                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => openDeleteConfirm('meal', plan.id, meal.name, meal.id)}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          ))}
                        </div>

                        {/* Add Meal Form */}
                        {activePlanId === plan.id ? (
                          <AddMealForm
                            mealForm={mealForm}
                            setMealForm={setMealForm}
                            handleAddMeal={() => handleAddMeal(plan.id)}
                            handleCancel={() => setActivePlanId(null)}
                            fetchMacros={fetchMacros}
                            fetchMacrosLoading={fetchMacrosLoading}
                          />
                        ) : (
                          <Button variant="outline" className="w-full" onClick={() => setActivePlanId(plan.id)}>
                            <Plus className="w-4 h-4 mr-2" /> Add Meal
                          </Button>
                        )}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              );
            })
          )}
        </div>
      </main>

      <AlertDialog open={deleteConfirm?.isOpen} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader className="space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <AlertDialogTitle className="text-center text-xl">
              Delete {deleteConfirm?.type === 'plan' ? 'Diet Plan' : 'Meal'}?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Are you sure you want to delete <span className="font-semibold text-foreground">"{deleteConfirm?.name}"</span>? 
              {deleteConfirm?.type === 'plan' && (
                <span className="block mt-1 text-destructive/80">This will remove all meals in this plan.</span>
              )}
              <span className="block mt-2 text-muted-foreground">This action cannot be undone.</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2 mt-4">
            <AlertDialogCancel className="flex-1 sm:flex-none">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="flex-1 sm:flex-none bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete {deleteConfirm?.type === 'plan' ? 'Plan' : 'Meal'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
