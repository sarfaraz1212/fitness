import React from "react";
import { Pencil, Loader2, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Meal } from "../../types";

type EditMealMeal = Meal & { _id: string };

interface EditMealProps {
  editMeal: { isOpen: boolean; meal: EditMealMeal; planId: string; originalName: string } | null;
  setEditMeal: React.Dispatch<
    React.SetStateAction<{ isOpen: boolean; meal: EditMealMeal; planId: string; originalName: string } | null>
  >;
  handleEditMealSave: () => void;
  fetchMacros: (mealName: string, onSuccess?: (macros: { calories: number; protein: number; carbs: number; fats: number }) => void) => void;
  fetchMacrosLoading?: boolean;
  buttonLoaders?: { updatingMeal?: boolean };
}

const EditMealComponent: React.FC<EditMealProps> = ({
  editMeal,
  setEditMeal,
  handleEditMealSave,
  fetchMacros,
  fetchMacrosLoading = false,
  buttonLoaders,
}) => {
  if (!editMeal) return null;

  const handleChange = (field: keyof EditMealMeal, value: string) => {
    setEditMeal((prev) =>
      prev
        ? {
            ...prev,
            meal: {
              ...prev.meal,
              [field]:
                field === "name" || field === "time" || field === "description"
                  ? value
                  : parseFloat(value) || 0,
            },
          }
        : null
    );
  };

  const handleNameBlur = () => {
    if (!editMeal?.meal.name.trim()) return;
    
    // Only fetch macros if the name has changed from the original
    const currentName = editMeal.meal.name.trim();
    const originalName = editMeal.originalName?.trim() || "";
    
    if (currentName !== originalName) {
      fetchMacros(editMeal.meal.name, (macros) => {
        setEditMeal((prev) =>
          prev
            ? {
                ...prev,
                meal: {
                  ...prev.meal,
                  calories: macros.calories,
                  protein: macros.protein,
                  carbs: macros.carbs,
                  fats: macros.fats,
                },
              }
            : null
        );
      });
    }
  };

  return (
    <Dialog
      open={editMeal.isOpen}
      onOpenChange={(open) => {
        if (!open) setEditMeal(null);
      }}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pencil className="w-5 h-5 text-primary" />
            Edit Meal
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-meal-name">Meal Name *</Label>
              <Input
                id="edit-meal-name"
                placeholder="e.g., Breakfast"
                value={editMeal.meal.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={handleNameBlur}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-meal-time">Time</Label>
              <Input
                id="edit-meal-time"
                type="time"
                value={editMeal.meal.time}
                onChange={(e) => handleChange("time", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-meal-desc">Description</Label>
            <Input
              id="edit-meal-desc"
              placeholder="e.g., Eggs with toast"
              value={editMeal.meal.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {fetchMacrosLoading ? (
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 p-6">
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite linear",
                }}
              />
              <div className="flex flex-col items-center justify-center gap-3 relative z-10">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                  </div>
                  <Loader2 className="w-14 h-14 text-primary absolute -top-1 -left-1 animate-spin" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">Fetching with AI...</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Analyzing nutrition data</p>
                </div>
                <div className="flex gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3">
              {(["calories", "protein", "carbs", "fats"] as const).map(
                (macro) => (
                  <div className="space-y-2" key={macro}>
                    <Label htmlFor={`edit-meal-${macro}`} className="text-xs">
                      {macro.charAt(0).toUpperCase() + macro.slice(1)}
                      {macro !== "calories" ? " (g)" : ""}
                    </Label>
                    <Input
                      id={`edit-meal-${macro}`}
                      type="number"
                      step="0.1"
                      placeholder="0"
                      value={editMeal.meal[macro]}
                      onChange={(e) => handleChange(macro, e.target.value)}
                    />
                  </div>
                )
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setEditMeal(null)} disabled={buttonLoaders?.updatingMeal}>
            Cancel
          </Button>
          <Button onClick={handleEditMealSave} disabled={buttonLoaders?.updatingMeal}>
            {buttonLoaders?.updatingMeal ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Pencil className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditMealComponent;
