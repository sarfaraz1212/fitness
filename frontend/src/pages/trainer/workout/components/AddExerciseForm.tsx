import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Clock, FileText, Trash2 } from "lucide-react";
import type { ExerciseForm, WeightUnit } from "../types";

interface AddExerciseFormProps {
    exerciseForm: ExerciseForm;
    weightUnit: WeightUnit;
    addSetToForm: () => void;
    removeSetFromForm: (index: number) => void;
    updateSetInForm: (index: number, field: "reps" | "weight", value: string) => void;
    handleAddExercise: () => void;
    handleCancel: () => void;
    setExerciseForm: React.Dispatch<React.SetStateAction<ExerciseForm>>;
}

const AddExerciseForm: React.FC<AddExerciseFormProps> = ({
    exerciseForm,
    weightUnit,
    addSetToForm,
    removeSetFromForm,
    updateSetInForm,
    handleAddExercise,
    handleCancel,
    setExerciseForm,
}) => {
    return (
        <div className="p-4 rounded-xl border border-border bg-card space-y-4 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Exercise Name */}
            <div className="space-y-1">
                <Label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground px-1">
                    Exercise Name *
                </Label>
                <Input
                    placeholder="e.g., Bench Press"
                    value={exerciseForm.name}
                    onChange={(e) => setExerciseForm({ ...exerciseForm, name: e.target.value })}
                    className="h-10 text-sm focus-visible:ring-primary shadow-none"
                />
            </div>

            {/* Dynamic Sets List */}
            <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                    <Label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                        Sets Configuration *
                    </Label>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={addSetToForm}
                        className="h-6 px-2 text-[10px] font-bold text-primary hover:text-primary hover:bg-primary/10"
                    >
                        <Plus className="w-3 h-3 mr-1" /> Add Set
                    </Button>
                </div>

                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
                    {exerciseForm.sets.map((set, index) => (
                        <div key={index} className="flex gap-2 items-end animate-in fade-in slide-in-from-left-2 duration-200">
                            <div className="flex-none flex items-center justify-center w-8 h-8 rounded-lg bg-muted text-[10px] font-bold text-muted-foreground mb-0.5">
                                {index + 1}
                            </div>

                            <div className="flex-1 space-y-1">
                                {index === 0 && (
                                    <Label className="text-[9px] uppercase font-bold text-muted-foreground block text-center">Reps</Label>
                                )}
                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={set.reps}
                                    onChange={(e) => updateSetInForm(index, "reps", e.target.value)}
                                    className="h-9 text-sm text-center shadow-none focus-visible:ring-primary"
                                />
                            </div>

                            <div className="flex-1 space-y-1">
                                {index === 0 && (
                                    <Label className="text-[9px] uppercase font-bold text-muted-foreground block text-center">Weight ({weightUnit})</Label>
                                )}
                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={set.weight}
                                    onChange={(e) => updateSetInForm(index, "weight", e.target.value)}
                                    className="h-9 text-sm text-center shadow-none focus-visible:ring-primary"
                                />
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                disabled={exerciseForm.sets.length === 1}
                                onClick={() => removeSetFromForm(index)}
                                className="h-9 w-9 text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <Label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground px-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Rest Between Sets
                    </Label>
                    <Input
                        placeholder="e.g., 60s"
                        value={exerciseForm.restTime}
                        onChange={(e) => setExerciseForm({ ...exerciseForm, restTime: e.target.value })}
                        className="h-9 text-sm focus-visible:ring-primary shadow-none"
                    />
                </div>
                <div className="space-y-1">
                    <Label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground px-1 flex items-center gap-1">
                        <FileText className="w-3 h-3" /> Duration (Optional)
                    </Label>
                    <Input
                        placeholder="e.g., 5 mins"
                        value={exerciseForm.duration}
                        onChange={(e) => setExerciseForm({ ...exerciseForm, duration: e.target.value })}
                        className="h-9 text-sm focus-visible:ring-primary shadow-none"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <Label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground px-1 flex items-center gap-1">
                    <FileText className="w-3 h-3" /> Notes
                </Label>
                <Input
                    placeholder="e.g., Focus on explosive movement"
                    value={exerciseForm.notes}
                    onChange={(e) => setExerciseForm({ ...exerciseForm, notes: e.target.value })}
                    className="h-10 text-sm focus-visible:ring-primary shadow-none"
                />
            </div>

            <div className="flex gap-2 pt-2 border-t border-border mt-2">
                <Button size="sm" onClick={handleAddExercise} className="flex-1 h-10 font-bold">
                    <Plus className="w-4 h-4 mr-2" /> Add to Workout
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel} className="h-10 font-medium">
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default AddExerciseForm;
