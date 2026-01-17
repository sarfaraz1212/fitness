import React from "react";
import { Clock, Flame, Dumbbell, Wheat, Droplet, Pencil, Trash2 } from "lucide-react"; // adjust imports
import { Button } from "@/components/ui/button"; // adjust path if needed

const MealCard = ({ meal, planId, openEditMeal, openDeleteConfirm }) => {
  return (
    <div className="p-3 rounded-xl bg-muted/30 flex items-start justify-between gap-3">
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

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10"
          onClick={() => openEditMeal(planId, meal)}
        >
          <Pencil className="w-3.5 h-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => openDeleteConfirm(planId, meal.id, meal.name)}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
};

export default MealCard;
