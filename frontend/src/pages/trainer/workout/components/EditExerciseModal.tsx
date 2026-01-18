import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useMutation } from "@apollo/client/react";
import { UPDATE_EXERCISE_MUTATION } from "@/graphql/mutations";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import type { Exercise } from "../types";

interface EditExerciseModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    planId: string | null;
    exercise: Exercise | null;
}

export const EditExerciseModal: React.FC<EditExerciseModalProps> = ({
    open,
    onOpenChange,
    planId,
    exercise,
}) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        name: "",
        sets: "",
        reps: "",
        weight: "",
        duration: "",
        restTime: "",
        notes: "",
    });

    useEffect(() => {
        if (exercise) {
            setFormData({
                name: exercise.name,
                sets: exercise.sets.toString(),
                reps: exercise.reps.toString(),
                weight: exercise.weight?.toString() || "",
                duration: exercise.duration || "",
                restTime: exercise.restTime || "",
                notes: exercise.notes || "",
            });
        }
    }, [exercise]);

    const [updateExercise, { loading: isLoading }] = useMutation(UPDATE_EXERCISE_MUTATION, {
        onCompleted: () => {
            toast({
                title: "Success",
                description: "Exercise updated successfully",
            });
            queryClient.invalidateQueries({ queryKey: ["workouts"] });
            onOpenChange(false);
        },
        onError: (error: Error) => {
            toast({
                title: "Error",
                description: error.message || "Failed to update exercise",
                variant: "destructive",
            });
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!planId || !exercise) return;

        updateExercise({
            variables: {
                workoutId: planId,
                exerciseId: exercise.id,
                input: {
                    name: formData.name,
                    sets: parseInt(formData.sets) || 0,
                    reps: parseInt(formData.reps) || 0,
                    weight: formData.weight ? parseFloat(formData.weight) : undefined,
                    duration: formData.duration,
                    restTime: formData.restTime,
                    notes: formData.notes,
                },
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Exercise</DialogTitle>
                    <DialogDescription>
                        Update exercise details. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="edit-exercise-name">Exercise Name</Label>
                        <Input
                            id="edit-exercise-name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-exercise-sets">Sets</Label>
                            <Input
                                id="edit-exercise-sets"
                                type="number"
                                value={formData.sets}
                                onChange={(e) => setFormData({ ...formData, sets: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-exercise-reps">Reps</Label>
                            <Input
                                id="edit-exercise-reps"
                                type="number"
                                value={formData.reps}
                                onChange={(e) => setFormData({ ...formData, reps: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-exercise-weight">Weight (kg) - Optional</Label>
                        <Input
                            id="edit-exercise-weight"
                            type="number"
                            step="0.1"
                            value={formData.weight}
                            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
