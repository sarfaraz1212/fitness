import React from "react";
import { Flame, Dumbbell, Wheat, Droplet } from "lucide-react";

interface MacrosProps {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const MacrosComponent: React.FC<MacrosProps> = ({ calories, protein, carbs, fats }) => {
  return (
    <>
      {/* Calories */}
      <span className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded bg-primary/20 text-primary font-medium">
        <Flame className="w-3 h-3" />
        {calories} kcal
      </span>

      {/* Protein */}
      <span className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
        <Dumbbell className="w-3 h-3" />
        {protein}g
      </span>

      {/* Carbs */}
      <span className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
        <Wheat className="w-3 h-3" />
        {carbs}g
      </span>

      {/* Fats */}
      <span className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400 font-medium">
        <Droplet className="w-3 h-3" />
        {fats}g
      </span>
    </>
  );
};

export default MacrosComponent;
