import React from "react";
import { Clock, Trash2, GripVertical, FileText, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Exercise, WeightUnit } from "../types";

interface ExerciseCardProps {
    exercise: Exercise;
    weightUnit: WeightUnit;
    onRemove: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, weightUnit, onRemove }) => {
    return (
        <div className="group relative p-3 rounded-xl bg-muted/40 border border-border/50 hover:bg-muted/60 hover:border-primary/20 transition-all duration-200">
            <div className="flex items-start gap-3">
                {/* Handle */}
                <div className="mt-1 text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors shrink-0">
                    <GripVertical className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <h4 className="font-bold text-sm text-foreground truncate">{exercise.name}</h4>
                            <p className="text-[10px] text-muted-foreground font-medium">
                                {exercise.sets.length} {exercise.sets.length === 1 ? "set" : "sets"} total
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-all"
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemove();
                            }}
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                    </div>

                    {/* Sets List */}
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {exercise.sets.map((set, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-card border border-border/40 text-[11px]"
                            >
                                <span className="font-bold text-primary w-4">{idx + 1}</span>
                                <span className="text-foreground font-medium">{set.reps} reps</span>
                                <ChevronRight className="w-2.5 h-2.5 text-muted-foreground/30" />
                                <span className="text-foreground font-bold">{set.weight}{weightUnit}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                        {exercise.restTime && (
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold">
                                <Clock className="w-3 h-3" />
                                Rest: {exercise.restTime}
                            </div>
                        )}
                        {exercise.duration && (
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 text-[10px] font-bold">
                                <FileText className="w-3 h-3" />
                                {exercise.duration}
                            </div>
                        )}
                    </div>

                    {exercise.notes && (
                        <div className="mt-2 flex items-start gap-1.5 text-[11px] text-muted-foreground italic bg-muted/50 p-2 rounded-lg border-l-2 border-primary/20">
                            <span className="line-clamp-2">{exercise.notes}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExerciseCard;
