import React from "react";
import { Clock, Flame, Dumbbell, Wheat, Droplet, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Meal } from "../../types";

interface MealCardProps {
  meal: Meal;
  planId?: string;
  openEditMeal?: (planId: string, meal: Meal) => void;
  openDeleteConfirm?: (planId: string, mealId: string, name: string) => void;
  onRemove?: () => void;
}

const MealCard: React.FC<MealCardProps> = ({
  meal,
  planId,
  openEditMeal,
  openDeleteConfirm,
  onRemove
}) => {
  return (
    <div className="p-3 rounded-xl bg-muted/30 border border-border/50 flex items-start justify-between gap-3 group hover:bg-muted/50 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground text-sm">{meal.name}</span>
          {meal.time && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              {meal.time}
            </span>
          )}
        </div>

        {meal.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{meal.description}</p>
        )}

        <div className="flex flex-wrap gap-1.5 mt-2">
          <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold">
            <Flame className="w-2.5 h-2.5" />
            {meal.calories}
          </span>
          <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold">
            <Dumbbell className="w-2.5 h-2.5" />
            {meal.protein}g
          </span>
          <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 font-bold">
            <Wheat className="w-2.5 h-2.5" />
            {meal.carbs}g
          </span>
          <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-600 font-bold">
            <Droplet className="w-2.5 h-2.5" />
            {meal.fats}g
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        {openEditMeal && planId && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10"
            onClick={() => openEditMeal(planId, meal)}
          >
            <Pencil className="w-3.5 h-3.5" />
          </Button>
        )}
        {(openDeleteConfirm && planId) ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => openDeleteConfirm(planId, meal.id, meal.name)}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        ) : onRemove && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={onRemove}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default MealCard;
