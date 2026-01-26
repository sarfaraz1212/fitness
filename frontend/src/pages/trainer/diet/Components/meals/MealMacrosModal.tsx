import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Flame, Beef, Wheat, Droplets, Pill, Sparkles } from "lucide-react";

interface MealMacrosModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dayName: string;
  meal?: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    vitamins?: { name: string; amount: string }[];
    minerals?: { name: string; amount: string }[];
  };
  }






const macroConfig = [
  { name: "Calories", key: "calories", unit: "kcal", icon: Flame, color: "from-orange-500 to-red-500" },
  { name: "Protein", key: "protein", unit: "g", icon: Beef, color: "from-rose-500 to-pink-500" },
  { name: "Carbs", key: "carbs", unit: "g", icon: Wheat, color: "from-amber-500 to-yellow-500" },
  { name: "Fats", key: "fats", unit: "g", icon: Droplets, color: "from-blue-500 to-cyan-500" },
];

const MealMacrosModal = ({ open, onOpenChange, dayName, meal }: MealMacrosModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-background via-background to-muted/30 border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            {dayName} - {meal?.name || "Meal"} Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Macros Section */}
          <div className="grid grid-cols-2 gap-4">
            {macroConfig.map((macro, index) => {
              const Icon = macro.icon;
              const value = meal ? (meal as any)[macro.key] : 0;
              return (
                <div
                  key={macro.name}
                  className="relative group overflow-hidden rounded-2xl bg-card border border-border p-4 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${macro.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                  <div className="relative flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${macro.color} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{macro.name}</p>
                      <p className="text-2xl font-bold text-foreground">
                        {value}
                        <span className="text-sm font-normal text-muted-foreground ml-1">{macro.unit}</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Vitamins & Minerals Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Vitamins */}
            <div className="rounded-2xl bg-card border border-border p-5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg">
                  <Pill className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Vitamins</h3>
              </div>
              <div className="space-y-3">
                {(meal?.vitamins || []).map((vitamin, index) => (
                  <div
                    key={vitamin.name}
                    className="flex items-center justify-between py-2 px-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="text-sm font-medium text-foreground">{vitamin.name}</span>
                    <span className="text-sm font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                      {vitamin.amount}
                    </span>
                  </div>
                ))}
                {(meal?.vitamins?.length === 0 || !meal?.vitamins) && (
                  <span className="text-muted-foreground text-sm">No vitamin data</span>
                )}
              </div>
            </div>

            {/* Minerals */}
            <div className="rounded-2xl bg-card border border-border p-5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Minerals</h3>
              </div>
              <div className="space-y-3">
                {(meal?.minerals || []).map((mineral, index) => (
                  <div
                    key={mineral.name}
                    className="flex items-center justify-between py-2 px-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="text-sm font-medium text-foreground">{mineral.name}</span>
                    <span className="text-sm font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                      {mineral.amount}
                    </span>
                  </div>
                ))}
                {(meal?.minerals?.length === 0 || !meal?.minerals) && (
                  <span className="text-muted-foreground text-sm">No mineral data</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MealMacrosModal;