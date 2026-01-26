import React, { useState } from "react";
import {
  Utensils,
  ArrowLeft,
  Check,
  Plus,
  Copy,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ClientBuilderProfileCard from "@/components/builder/ClientProfileCard";
import MealCard from "./MealCard";
import PlanStats from "../plans/PlanStats";
import AddMealForm from "./AddMealForm";
import MealMacrosModal from "./MealMacrosModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import type { Client, Meal, DayConfig, MealForm, BuilderStep } from "../../types";
import SaveConfirmationModal from "@/components/builder/SaveConfirmationModal";

interface MealBuilderProps {
  planName: string;
  selectedClient: Client;
  dayConfigs: DayConfig[];
  setCurrentStep: React.Dispatch<React.SetStateAction<BuilderStep>>;
  savePlan: (assignNow: boolean) => void;
  getDayMacros: (meals: Meal[]) => { calories: number; protein: number; carbs: number; fats: number };
  copyMealsToDay: (fromDayId: string, toDayId: string) => void;
  removeMeal: (dayId: string, mealId: string) => void;
  otherDays: (currentDayId: string) => DayConfig[];
  fetchMacros: (mealName: string) => void;
  fetchMacrosLoading: boolean;
  mealForm: MealForm;
  setMealForm: React.Dispatch<React.SetStateAction<MealForm>>;
  addMeal: (dayId: string) => void;
  activeDayId: string | null;
  setActiveDayId: React.Dispatch<React.SetStateAction<string | null>>;
  openEditMeal: (dayId: string, meal: Meal) => void;
  updateMeal: (dayId: string) => void;
  cancelEdit: () => void;
}

const MealBuilder: React.FC<MealBuilderProps> = ({
  planName,
  selectedClient,
  dayConfigs,
  setCurrentStep,
  savePlan,
  getDayMacros,
  copyMealsToDay,
  removeMeal,
  otherDays,
  fetchMacros,
  fetchMacrosLoading,
  mealForm,
  setMealForm,
  addMeal,
  activeDayId,
  setActiveDayId,
  openEditMeal,
  updateMeal,
  cancelEdit
}) => {
  const [openDayId, setOpenDayId] = useState<string | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [showMacrosModal, setShowMacrosModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; meal: Meal | null; dayId: string | null }>(
    { open: false, meal: null, dayId: null }
  );

  const toggleDayConfig = (dayId: string) => {
    setOpenDayId((prev) => (prev === dayId ? null : dayId));
  };

  const handleFinishClick = () => {
    const emptyDays = dayConfigs.filter((d) => d.meals.length === 0);
    if (emptyDays.length > 0) {
      savePlan(false);
      return;
    }
    setIsConfirmModalOpen(true);
  };

  return (
    <div className="slide-up flex flex-col md:flex-row gap-6 h-full">
      {/* Left Column: Client Profile */}
      <div className="md:w-1/3 flex-shrink-0 h-full">
        <ClientBuilderProfileCard client={selectedClient} className="h-full" />
      </div>

      {/* Right Column: Meal Builder */}
      <div className="md:w-2/3 flex-1 space-y-4 overflow-y-auto p-4">
        {/* Header */}
        <div className="p-4 rounded-xl bg-card border border-border flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground">{planName}</p>
            <p className="text-sm text-muted-foreground">
              for {selectedClient.name} • {dayConfigs.length} day
              {dayConfigs.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentStep("days")}
          >
            Edit Days
          </Button>
        </div>

        {/* Day Configs */}
        {dayConfigs.map((dayConfig) => {
          const macros = getDayMacros(dayConfig.meals);

          return (
            <div key={dayConfig.dayId} className="rounded-2xl bg-card border border-border overflow-hidden">
              <div
                className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => toggleDayConfig(dayConfig.dayId)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Utensils className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground">
                      {dayConfig.dayLabel}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {dayConfig.meals.length} meal
                      {dayConfig.meals.length !== 1 ? "s" : ""} • {macros.calories} kcal
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {otherDays(dayConfig.dayId).length > 0 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        const sourceDay = otherDays(dayConfig.dayId)[0];
                        if (sourceDay) copyMealsToDay(sourceDay.dayId, dayConfig.dayId);
                      }}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  )}
                  {openDayId === dayConfig.dayId ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </div>

              {openDayId === dayConfig.dayId && (
                <div className="px-4 pb-4 space-y-4">
                  <PlanStats totals={macros} />

                  <div className="space-y-3">
                    {dayConfig.meals.map((meal) => (
                      <MealCard
                        key={meal.id}
                        meal={meal}
                        planId={dayConfig.dayId}
                        onRemove={() => setDeleteModal({ open: true, meal, dayId: dayConfig.dayId })}
                        openEditMeal={openEditMeal}
                        onViewMeal={() => {
                          setSelectedMeal(meal);
                          setShowMacrosModal(true);
                        }}
                      />
                    ))}
                  </div>

                  {activeDayId === dayConfig.dayId ? (
                    <AddMealForm
                      mealForm={mealForm}
                      setMealForm={setMealForm}
                      handleAddMeal={() => addMeal(dayConfig.dayId)}
                      handleUpdateMeal={() => updateMeal(dayConfig.dayId)}
                      handleCancel={cancelEdit}
                      fetchMacros={fetchMacros}
                      fetchMacrosLoading={fetchMacrosLoading}
                      isEditing={!!mealForm.id}
                    />
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full border-dashed"
                      onClick={() => setActiveDayId(dayConfig.dayId)}
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Meal
                    </Button>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Footer Buttons */}
        <div className="flex gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentStep("days")}
            className="flex-1 h-12"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <Button onClick={handleFinishClick} className="flex-1 h-12 shadow-lg shadow-primary/20">
            <Check className="w-4 h-4 mr-2" /> Save Plan
          </Button>
        </div>
      </div>

      <SaveConfirmationModal
        open={isConfirmModalOpen}
        onOpenChange={setIsConfirmModalOpen}
        onConfirm={savePlan}
        title="Assign Diet Plan?"
        clientName={selectedClient.name}
      />

      <MealMacrosModal
        open={showMacrosModal}
        onOpenChange={setShowMacrosModal}
        dayName={(() => {
          const currentDay = dayConfigs.find(d => d.dayId === activeDayId);
          return currentDay ? currentDay.dayLabel : "";
        })()}
        meal={selectedMeal}
      />

      <DeleteConfirmModal
        open={deleteModal.open}
        onOpenChange={(open) => setDeleteModal((prev) => ({ ...prev, open }))}
        mealName={deleteModal.meal?.name}
        onCancel={() => setDeleteModal({ open: false, meal: null, dayId: null })}
        onConfirm={() => {
          if (deleteModal.meal && deleteModal.dayId) {
            removeMeal(deleteModal.dayId, deleteModal.meal.id);
          }
          setDeleteModal({ open: false, meal: null, dayId: null });
        }}
      />
    </div>
  );
};

export default MealBuilder;
