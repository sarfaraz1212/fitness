import React, { useState } from "react";
import {
  Utensils,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import HeroHeader from "./Components/HeroHeader";
import { SearchComponent } from "./Components/SearchComponent";
import PlanStats from "./Components/plans/PlanStats";
import MealCard from "./Components/meals/MealCard";
import NewPlanForm from "./Components/plans/NewPlanForm";
import AddMealForm from "./Components/meals/AddMealForm";
import MealDeleteComponent from "./Components/meals/MealDeleteComponent";
import PlanDeleteComponent from "./Components/plans/PlanDeleteComponent";
import EditPlanForm from "./Components/plans/EditPlanForm";
import EditMealComponent from "./Components/meals/EditMealComponent";

import { useDiet } from "./Components/useDiet";
import { useMeals } from "./Components/useMeals";
import AppPagination from "@/components/common/AppPagination";
import { useDebounce } from "use-debounce";
import { useEffect } from "react";

const Index: React.FC = () => {

  const [showNewPlanForm, setShowNewPlanForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const limit = 1; // Testing with 1 per page

  const {
    dietPlans,
    dietsData, // Actually dietsData is already in scope from useDiet refactor? No, I need to check useDiet return.
    loadingPlans,
    isLoading,
    formData,
    setFormData,
    createDietLoading,
    togglePlan,
    getTotalMacros,
    deletePlanConfirm,
    setDeletePlanConfirm,
    editPlan,
    setEditPlan,
    handleCreatePlan,
    handleDeletePlan,
    openEditPlan,
    handleEditPlanSave,
    buttonLoaders,
    setDietPlans,
  } = useDiet({
    page,
    limit,
    search: debouncedSearchQuery,
    sortBy
  });

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchQuery, sortBy]);

  const {
    mealForm,
    setMealForm,
    activePlanId,
    setActivePlanId,
    editMeal,
    setEditMeal,
    deleteMealConfirm,
    setDeleteMealConfirm,
    buttonLoaders: mealButtonLoaders,
    fetchMacros,
    fetchMacrosLoading,
    handleAddMeal,
    handleDeleteMeal,
    handleEditMealSave,
    openEditMeal,
  } = useMeals();

  const openDeleteConfirm = (planId: string, mealId: string, name: string) =>
    setDeleteMealConfirm({ isOpen: true, planId, mealId, name });


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
            createDietLoading={createDietLoading}
          />
        )}

        <SearchComponent
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          setShowNewPlanForm={setShowNewPlanForm}
        />

        <div className="grid lg:grid-cols-2 gap-6 mt-4 px-2 lg:px-0">
          {dietPlans.length === 0 && !showNewPlanForm ? (
            <div className="lg:col-span-2 text-center py-12 rounded-2xl bg-card border border-border">
              <Utensils className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchQuery || sortBy
                  ? "No diet plans match your search or filter criteria."
                  : "No diet plans yet. Create your first one!"}
              </p>
              {!searchQuery && !sortBy && (
                <Button onClick={() => setShowNewPlanForm(true)} className="mt-4">
                  <Plus className="w-4 h-4 mr-2" /> Create Plan
                </Button>
              )}
            </div>
          ) : (
            dietPlans.map((plan) => {
              const totals = getTotalMacros(plan.meals);
              return (
                <Collapsible
                  key={plan.id}
                  open={plan.isOpen ?? false}
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
                          <p className="text-sm text-muted-foreground">
                            {plan.meals.length} meals • {totals.calories} kcal
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-primary hover:text-primary hover:bg-primary/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditPlan(plan);
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeletePlanConfirm({ isOpen: true, planId: plan.id, name: plan.name });
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        {plan.isOpen ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="px-4 pb-4 space-y-4">
                        {plan.description && (
                          <p className="text-sm text-muted-foreground">{plan.description}</p>
                        )}

                        <PlanStats totals={totals} />

                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                          {plan.meals.map((meal) => (
                            <MealCard
                              key={meal.id}
                              meal={meal}
                              planId={plan.id}
                              openEditMeal={openEditMeal}
                              openDeleteConfirm={openDeleteConfirm}
                            />
                          ))}
                        </div>

                        {activePlanId === plan.id ? (
                          <AddMealForm
                            mealForm={mealForm}
                            setMealForm={setMealForm}
                            handleAddMeal={() => handleAddMeal(plan.id, dietPlans, setDietPlans)}
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

        {dietsData && (
          <div className="flex justify-center mt-10 pb-10">
            <AppPagination
              currentPage={dietsData.currentPage}
              totalPages={dietsData.totalPages}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        )}
      </main>

      {/* Delete Modals */}
      <MealDeleteComponent
        deleteMealConfirm={deleteMealConfirm}
        handleDeleteMeal={() => handleDeleteMeal(dietPlans, setDietPlans)}
        setDeleteMealConfirm={setDeleteMealConfirm}
        buttonLoaders={mealButtonLoaders}
      />

      <PlanDeleteComponent
        deletePlanConfirm={deletePlanConfirm}
        handleDeletePlan={handleDeletePlan}
        setDeletePlanConfirm={setDeletePlanConfirm}
        buttonLoaders={buttonLoaders}
      />

      <EditPlanForm
        editPlan={editPlan}
        setEditPlan={setEditPlan}
        handleEditPlanSave={handleEditPlanSave}
        buttonLoaders={buttonLoaders}
      />

      <EditMealComponent
        editMeal={editMeal}
        setEditMeal={setEditMeal}
        handleEditMealSave={() => handleEditMealSave(dietPlans, setDietPlans)}
        fetchMacros={fetchMacros}
        fetchMacrosLoading={fetchMacrosLoading}
        buttonLoaders={mealButtonLoaders}
      />
    </div>
  );
};

export default Index;
