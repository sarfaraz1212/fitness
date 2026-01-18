import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
    CREATE_WORKOUT_MUTATION,
    UPDATE_WORKOUT_MUTATION,
    DELETE_WORKOUT_MUTATION,
    ADD_EXERCISE_MUTATION,
    UPDATE_EXERCISE_MUTATION,
    DELETE_EXERCISE_MUTATION
} from "@/graphql/mutations";
import { fetchWorkouts } from "@/lib/React-query/queryFunction";
import type { WorkoutPlan } from "./types";

export const usePlan = (params: { page: number; limit: number; search: string }) => {
    const { toast } = useToast();
    const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
    const [pagination, setPagination] = useState({ total: 0, totalPages: 0, currentPage: 1 });
    const [loadingPlans, setLoadingPlans] = useState(true);
    const [activePlanId, setActivePlanId] = useState<string | null>(null);

    const [exerciseForm, setExerciseForm] = useState({
        name: "",
        sets: "",
        reps: "",
        weight: "",
        duration: "",
        restTime: "",
        notes: "",
    });

    const queryClient = useQueryClient();
    const [createWorkoutMutation] = useMutation<{ createWorkout: any }>(CREATE_WORKOUT_MUTATION);
    const [updateWorkoutMutation] = useMutation(UPDATE_WORKOUT_MUTATION);
    const [deleteWorkoutMutation] = useMutation(DELETE_WORKOUT_MUTATION);
    const [addExerciseMutation] = useMutation(ADD_EXERCISE_MUTATION);
    const [updateExerciseMutation] = useMutation(UPDATE_EXERCISE_MUTATION);
    const [deleteExerciseMutation] = useMutation(DELETE_EXERCISE_MUTATION);

    const { data: workoutsData, isLoading } = useQuery({
        queryKey: ["workouts", params.page, params.limit, params.search],
        queryFn: () => fetchWorkouts(params)
    });

    useEffect(() => {
        if (workoutsData && workoutsData.workouts) {
            setWorkoutPlans(prevPlans =>
                workoutsData.workouts.map((w: any) => {
                    const existing = prevPlans.find(p => p.id === w._id);
                    return {
                        id: w._id,
                        name: w.name,
                        description: w.description || "",
                        exercises: (w.exercises || []).map((e: any) => ({
                            id: e._id,
                            name: e.name,
                            sets: e.sets,
                            reps: e.reps,
                            weight: e.weight,
                            duration: e.duration,
                            restTime: e.restTime,
                            notes: e.notes,
                        })),
                        isOpen: existing ? existing.isOpen : false,
                    };
                })
            );
            setPagination({
                total: workoutsData.total || 0,
                totalPages: workoutsData.totalPages || 0,
                currentPage: workoutsData.currentPage || 1
            });
        }
        setLoadingPlans(false);
    }, [workoutsData]);

    const handleCreatePlanExternal = async (name: string, description: string) => {
        try {
            const response = await createWorkoutMutation({
                variables: { input: { name, description } }
            });
            if (response.data?.createWorkout) {
                // If on page 1, we could manually add it, or just let useQuery refetch
                // For simplicity, toast and relies on user navigating or refetching
                toast({ title: "Plan created!", description: `${name} has been created.` });
                return true;
            }
        } catch (error) {
            console.error(error);
            toast({ title: "Error", description: "Failed to create workout plan", variant: "destructive" });
        }
        return false;
    };

    const handleUpdatePlan = async (workoutId: string, name: string, description: string) => {
        try {
            await updateWorkoutMutation({
                variables: { workoutId, input: { name, description } }
            });
            toast({ title: "Plan updated!" });
            queryClient.invalidateQueries({ queryKey: ["workouts"] });
            return true;
        } catch (error) {
            console.error(error);
            toast({ title: "Error", description: "Failed to update plan", variant: "destructive" });
        }
        return false;
    };

    const handleDeletePlan = async (workoutId: string) => {
        try {
            await deleteWorkoutMutation({ variables: { workoutId } });
            toast({ title: "Plan deleted" });
            queryClient.invalidateQueries({ queryKey: ["workouts"] });
        } catch (error) {
            console.error(error);
            toast({ title: "Error", description: "Failed to delete plan", variant: "destructive" });
        }
    };

    const handleAddExercise = async (planId: string) => {
        if (!exerciseForm.name.trim()) {
            toast({ title: "Error", description: "Exercise name is required", variant: "destructive" });
            return;
        }

        try {
            const input = {
                name: exerciseForm.name.trim(),
                sets: Number(exerciseForm.sets) || 0,
                reps: Number(exerciseForm.reps) || 0,
                weight: exerciseForm.weight ? Number(exerciseForm.weight) : undefined,
                duration: exerciseForm.duration.trim() || undefined,
                restTime: exerciseForm.restTime.trim() || undefined,
                notes: exerciseForm.notes.trim() || undefined,
            };

            await addExerciseMutation({
                variables: { workoutId: planId, input }
            });

            setExerciseForm({ name: "", sets: "", reps: "", weight: "", duration: "", restTime: "", notes: "" });
            setActivePlanId(null);
            toast({ title: "Exercise added!" });
            queryClient.invalidateQueries({ queryKey: ["workouts"] });
        } catch (error) {
            console.error(error);
            toast({ title: "Error", description: "Failed to add exercise", variant: "destructive" });
        }
    };

    const handleUpdateExercise = async (planId: string, exerciseId: string, input: any) => {
        try {
            await updateExerciseMutation({
                variables: { workoutId: planId, exerciseId, input }
            });
            toast({ title: "Exercise updated!" });
            queryClient.invalidateQueries({ queryKey: ["workouts"] });
            return true;
        } catch (error) {
            console.error(error);
            toast({ title: "Error", description: "Failed to update exercise", variant: "destructive" });
        }
        return false;
    };

    const handleRemoveExercise = async (planId: string, exerciseId: string) => {
        try {
            await deleteExerciseMutation({
                variables: { workoutId: planId, exerciseId }
            });
            toast({ title: "Exercise removed" });
            queryClient.invalidateQueries({ queryKey: ["workouts"] });
        } catch (error) {
            console.error(error);
            toast({ title: "Error", description: "Failed to remove exercise", variant: "destructive" });
        }
    };

    const togglePlan = (planId: string) => {
        setWorkoutPlans(prev => prev.map(plan =>
            plan.id === planId ? { ...plan, isOpen: !plan.isOpen } : plan
        ));
    };

    return {
        workoutPlans,
        pagination,
        workoutsData,
        loadingPlans,
        isLoading,
        activePlanId,
        setActivePlanId,
        exerciseForm,
        setExerciseForm,
        handleCreatePlanExternal,
        handleUpdatePlan,
        handleDeletePlan,
        handleAddExercise,
        handleUpdateExercise,
        handleRemoveExercise,
        togglePlan,
    };
};
