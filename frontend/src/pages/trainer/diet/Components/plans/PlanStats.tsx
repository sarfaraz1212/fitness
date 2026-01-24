import React from "react";
import { Flame, Dumbbell, Wheat, Droplet } from "lucide-react";

interface PlanStatsProps {
  totals: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}

const PlanStats: React.FC<PlanStatsProps> = ({ totals }) => {
  return (
    <div className="p-4 rounded-xl bg-muted/50 grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
      {/* Calories */}
      <div className="text-center p-2 rounded-lg bg-primary/10">
        <Flame className="w-4 h-4 text-primary mx-auto mb-1" />
        <p className="text-xs text-muted-foreground">Calories</p>
        <p className="font-bold text-foreground">{totals.calories.toFixed(0)}</p>
      </div>

      {/* Protein */}
      <div className="text-center p-2 rounded-lg bg-emerald-100">
        <Dumbbell className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
        <p className="text-xs text-muted-foreground">Protein</p>
        <p className="font-bold text-foreground">{totals.protein.toFixed(1)}g</p>
      </div>

      {/* Carbs */}
      <div className="text-center p-2 rounded-lg bg-amber-100">
        <Wheat className="w-4 h-4 text-amber-600 mx-auto mb-1" />
        <p className="text-xs text-muted-foreground">Carbs</p>
        <p className="font-bold text-foreground">{totals.carbs.toFixed(1)}g</p>
      </div>

      {/* Fats */}
      <div className="text-center p-2 rounded-lg bg-red-100">
        <Droplet className="w-4 h-4 text-red-600 mx-auto mb-1" />
        <p className="text-xs text-muted-foreground">Fats</p>
        <p className="font-bold text-foreground">{totals.fats.toFixed(1)}g</p>
      </div>
    </div>
  );
};

export default PlanStats;
