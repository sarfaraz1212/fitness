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
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useMutation } from "@apollo/client/react";
import { UPDATE_WORKOUT_MUTATION } from "@/graphql/mutations";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface EditWorkoutPlanModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    plan: { id: string; name: string; description: string } | null;
}

export const EditWorkoutPlanModal: React.FC<EditWorkoutPlanModalProps> = ({
    open,
    onOpenChange,
    plan,
}) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (plan) {
            setName(plan.name);
            setDescription(plan.description || "");
        }
    }, [plan]);

    const [updateWorkout, { loading: isLoading }] = useMutation(UPDATE_WORKOUT_MUTATION, {
        onCompleted: () => {
            toast({
                title: "Success",
                description: "Workout plan updated successfully",
            });
            queryClient.invalidateQueries({ queryKey: ["workouts"] });
            onOpenChange(false);
        },
        onError: (error: Error) => {
            toast({
                title: "Error",
                description: error.message || "Failed to update workout plan",
                variant: "destructive",
            });
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!plan) return;
        updateWorkout({
            variables: {
                workoutId: plan.id,
                input: {
                    name,
                    description,
                },
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Workout Plan</DialogTitle>
                    <DialogDescription>
                        Update the details for your workout plan. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="edit-plan-name">Plan Name</Label>
                        <Input
                            id="edit-plan-name"
                            placeholder="e.g., Summer Strength"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-plan-description">Description</Label>
                        <Textarea
                            id="edit-plan-description"
                            placeholder="Brief description of the plan..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
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
