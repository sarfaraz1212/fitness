import React, { useState } from "react";
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
import { CREATE_WORKOUT_MUTATION } from "@/graphql/mutations";
import { useToast } from "@/hooks/use-toast";

interface CreateWorkoutPlanModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const CreateWorkoutPlanModal: React.FC<CreateWorkoutPlanModalProps> = ({
    open,
    onOpenChange,
}) => {
    const { toast } = useToast();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [createWorkout, { loading: isLoading }] = useMutation(CREATE_WORKOUT_MUTATION, {
        onCompleted: () => {
            toast({
                title: "Success",
                description: "Workout plan created successfully",
            });
            setName("");
            setDescription("");
            onOpenChange(false);
        },
        onError: (error: Error) => {
            toast({
                title: "Error",
                description: error.message || "Failed to create workout plan",
                variant: "destructive",
            });
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        createWorkout({
            variables: {
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
                    <DialogTitle>Create New Workout Plan</DialogTitle>
                    <DialogDescription>
                        Enter the details for your new workout plan. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="plan-name">Plan Name</Label>
                        <Input
                            id="plan-name"
                            placeholder="e.g., Summer Strength"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="plan-description">Description</Label>
                        <Textarea
                            id="plan-description"
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
                                    Creating...
                                </>
                            ) : (
                                "Create Plan"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
