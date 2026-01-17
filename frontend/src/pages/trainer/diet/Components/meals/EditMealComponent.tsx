import React from "react";
import { Pencil } from "lucide-react";
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

interface Meal {
  _id: string;
  name: string;
  description?: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface EditMealProps {
  editMeal: { isOpen: boolean; meal: Meal } | null;
  setEditMeal: React.Dispatch<
    React.SetStateAction<{ isOpen: boolean; meal: Meal } | null>
  >;
  handleEditMealSave: () => void;
}

const EditMealComponent: React.FC<EditMealProps> = ({
  editMeal,
  setEditMeal,
  handleEditMealSave,
}) => {
  if (!editMeal) return null;

  const handleChange = (field: keyof Meal, value: string) => {
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
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setEditMeal(null)}>
            Cancel
          </Button>
          <Button onClick={handleEditMealSave}>
            <Pencil className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditMealComponent;
