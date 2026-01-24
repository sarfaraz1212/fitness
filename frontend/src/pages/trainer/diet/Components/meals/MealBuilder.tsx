import React, { useState } from "react";
import {
  Utensils,
  ArrowLeft,
  Check,
  Plus,
  Trash2,
  Clock,
  ChevronUp,
  ChevronDown,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import ClientBuilderProfileCard from "@/components/builder/ClientProfileCard";

interface Client {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface Meal {
  id: string;
  name: string;
  description?: string;
  time?: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface DayConfig {
  dayId: string;
  dayLabel: string;
  meals: Meal[];
  isOpen?: boolean;
}

interface MealBuilderProps {
  planName: string;
  selectedClient: Client;
  dayConfigs: DayConfig[];
  setCurrentStep: React.Dispatch<
    React.SetStateAction<"client" | "plans" | "days" | "meals">
  >;
  savePlan: () => void;
  getDayMacros: (meals: Meal[]) => { calories: number; protein: number; carbs: number; fats: number };
  copyMealsToDay: (fromDayId: string, toDayId: string) => void;
  removeMeal: (dayId: string, mealId: string) => void;
  otherDays: (currentDayId: string) => DayConfig[];
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
}) => {
  const [activeDayId, setActiveDayId] = useState<string | null>(null);
  const [mealForm, setMealForm] = useState<Partial<Meal>>({});

  const toggleDayConfig = (dayId: string) => {
    // Toggle open/close for collapsible
    dayConfigs.forEach((d) => {
      if (d.dayId === dayId) d.isOpen = !d.isOpen;
      else d.isOpen = false;
    });
  };

  const addMeal = (dayId: string) => {
    if (!mealForm.name || !mealForm.calories) return;
    const day = dayConfigs.find((d) => d.dayId === dayId);
    if (!day) return;
    const newMeal: Meal = {
      id: Date.now().toString(),
      name: mealForm.name || "",
      description: mealForm.description || "",
      time: mealForm.time,
      calories: Number(mealForm.calories) || 0,
      protein: Number(mealForm.protein) || 0,
      carbs: Number(mealForm.carbs) || 0,
      fats: Number(mealForm.fats) || 0,
    };
    day.meals.push(newMeal);
    setMealForm({});
    setActiveDayId(null);
  };

  return (
    <div className="slide-up flex flex-col md:flex-row gap-6 h-full">
      {/* Left Column: Client Profile */}
      <div className="md:w-1/3 flex-shrink-0 h-full">
        <ClientBuilderProfileCard client={selectedClient} className="h-full" />
      </div>

      {/* Right Column: Meal Builder */}
      <div className="md:w-2/3 flex-1 space-y-4 overflow-y-auto p-4">
        <div className="p-4 rounded-xl bg-card flex items-center justify-between">
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

        {dayConfigs.map((dayConfig) => {
          const macros = getDayMacros(dayConfig.meals);
          return (
            <Collapsible
              key={dayConfig.dayId}
              open={dayConfig.isOpen}
              onOpenChange={() => toggleDayConfig(dayConfig.dayId)}
            >
              <div className="rounded-2xl bg-card shadow-soft overflow-hidden">
                <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Utensils className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground">{dayConfig.dayLabel}</h3>
                      <p className="text-sm text-muted-foreground">
                        {dayConfig.meals.length} meal{dayConfig.meals.length !== 1 ? "s" : ""} • {macros.calories} kcal
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {otherDays(dayConfig.dayId).length > 0 && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                            <Copy className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <p className="px-2 py-1.5 text-xs text-muted-foreground font-medium">
                            Copy meals from...
                          </p>
                          {otherDays(dayConfig.dayId).map((sourceDay) => (
                            <DropdownMenuItem
                              key={sourceDay.dayId}
                              onClick={(e) => {
                                e.stopPropagation();
                                copyMealsToDay(sourceDay.dayId, dayConfig.dayId);
                              }}
                            >
                              {sourceDay.dayLabel} ({sourceDay.meals.length} meals)
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                    {dayConfig.isOpen ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="px-4 pb-4 space-y-4">
                    {dayConfig.meals.map((meal) => (
                      <div
                        key={meal.id}
                        className="p-3 rounded-xl bg-muted/30 flex items-start justify-between gap-3"
                      >
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
                            <span className="text-xs px-1.5 py-0.5 rounded bg-accent/20 text-accent font-medium">{meal.calories} kcal</span>
                            <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">P: {meal.protein}g</span>
                            <span className="text-xs px-1.5 py-0.5 rounded bg-accent/10 text-accent font-medium">C: {meal.carbs}g</span>
                            <span className="text-xs px-1.5 py-0.5 rounded bg-destructive/10 text-destructive font-medium">F: {meal.fats}g</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeMeal(dayConfig.dayId, meal.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ))}

                    {/* Add Meal Form */}
                    {activeDayId === dayConfig.dayId ? (
                      <div className="p-4 rounded-xl border border-border space-y-3">
                        {/* Meal form inputs... */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs">Meal Name *</Label>
                            <Input
                              placeholder="e.g., Breakfast"
                              value={mealForm.name || ""}
                              onChange={(e) => setMealForm({ ...mealForm, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Time</Label>
                            <Input
                              type="time"
                              value={mealForm.time || ""}
                              onChange={(e) => setMealForm({ ...mealForm, time: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Description</Label>
                          <Input
                            placeholder="e.g., Eggs with toast"
                            value={mealForm.description || ""}
                            onChange={(e) => setMealForm({ ...mealForm, description: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="space-y-1">
                            <Label className="text-xs">Calories</Label>
                            <Input
                              type="number"
                              placeholder="0"
                              value={mealForm.calories || ""}
                              onChange={(e) => setMealForm({ ...mealForm, calories: e.target.value })}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Protein</Label>
                            <Input
                              type="number"
                              placeholder="0"
                              value={mealForm.protein || ""}
                              onChange={(e) => setMealForm({ ...mealForm, protein: e.target.value })}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Carbs</Label>
                            <Input
                              type="number"
                              placeholder="0"
                              value={mealForm.carbs || ""}
                              onChange={(e) => setMealForm({ ...mealForm, carbs: e.target.value })}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Fats</Label>
                            <Input
                              type="number"
                              placeholder="0"
                              value={mealForm.fats || ""}
                              onChange={(e) => setMealForm({ ...mealForm, fats: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => addMeal(dayConfig.dayId)} className="flex-1">
                            <Plus className="w-4 h-4 mr-1" /> Add Meal
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setActiveDayId(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setActiveDayId(dayConfig.dayId)}
                      >
                        <Plus className="w-4 h-4 mr-2" /> Add Meal
                      </Button>
                    )}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          );
        })}

        <div className="flex gap-2 mt-6">
          <Button variant="outline" onClick={() => setCurrentStep("days")} className="flex-1">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <Button onClick={savePlan} className="flex-1">
            <Check className="w-4 h-4 mr-2" /> Save Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MealBuilder;
