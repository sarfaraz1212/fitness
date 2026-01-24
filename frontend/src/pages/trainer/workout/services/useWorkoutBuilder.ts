import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import type {
    Exercise,
    Client,
    DayConfig,
    BuilderStep,
    ExerciseForm,
    WeightUnit,
    SetInfo
} from "../types";

const daysOfWeek = [
    { id: "monday", label: "Monday", short: "Mon" },
    { id: "tuesday", label: "Tuesday", short: "Tue" },
    { id: "wednesday", label: "Wednesday", short: "Wed" },
    { id: "thursday", label: "Thursday", short: "Thu" },
    { id: "friday", label: "Friday", short: "Fri" },
    { id: "saturday", label: "Saturday", short: "Sat" },
    { id: "sunday", label: "Sunday", short: "Sun" },
];

export const useWorkoutBuilder = () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    // Step management
    const [currentStep, setCurrentStep] = useState<BuilderStep>("client");

    // Global settings
    const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");

    // Step 1: Client selection
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [clientSearch, setClientSearch] = useState("");

    // Step 2: Days configuration
    const [planName, setPlanName] = useState("");
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    // Step 3: Exercise configuration per day
    const [dayConfigs, setDayConfigs] = useState<DayConfig[]>([]);

    // Exercise form state
    const [activeDayId, setActiveDayId] = useState<string | null>(null);
    const [exerciseForm, setExerciseForm] = useState<ExerciseForm>({
        name: "",
        sets: [{ reps: "", weight: "" }],
        duration: "",
        restTime: "",
        notes: "",
    });

    const proceedToExercises = (name: string, days: string[]) => {
        if (!name.trim()) {
            toast({ title: "Error", description: "Please enter a plan name", variant: "destructive" });
            return;
        }
        if (days.length === 0) {
            toast({ title: "Error", description: "Please select at least one day", variant: "destructive" });
            return;
        }

        setPlanName(name);
        setSelectedDays(days);

        const orderedDays = daysOfWeek.filter((d) => days.includes(d.id));
        const configs: DayConfig[] = orderedDays.map((d) => ({
            dayId: d.id,
            dayLabel: d.label,
            exercises: [],
            isOpen: false,
        }));
        setDayConfigs(configs);
        setCurrentStep("exercises");
    };

    const addSetToForm = () => {
        setExerciseForm(prev => ({
            ...prev,
            sets: [...prev.sets, { reps: "", weight: "" }]
        }));
    };

    const removeSetFromForm = (index: number) => {
        setExerciseForm(prev => ({
            ...prev,
            sets: prev.sets.filter((_, i) => i !== index)
        }));
    };

    const updateSetInForm = (index: number, field: "reps" | "weight", value: string) => {
        setExerciseForm(prev => ({
            ...prev,
            sets: prev.sets.map((s, i) => i === index ? { ...s, [field]: value } : s)
        }));
    };

    const addExercise = (dayId: string) => {
        if (!exerciseForm.name.trim()) {
            toast({ title: "Error", description: "Exercise name is required", variant: "destructive" });
            return;
        }

        const validSets: SetInfo[] = exerciseForm.sets
            .filter(s => s.reps.trim() !== "")
            .map(s => ({
                reps: Number(s.reps) || 0,
                weight: Number(s.weight) || 0
            }));

        if (validSets.length === 0) {
            toast({ title: "Error", description: "At least one set is required", variant: "destructive" });
            return;
        }

        const newExercise: Exercise = {
            id: `e${Date.now()}`,
            name: exerciseForm.name.trim(),
            sets: validSets,
            duration: exerciseForm.duration.trim() || undefined,
            restTime: exerciseForm.restTime.trim() || undefined,
            notes: exerciseForm.notes.trim() || undefined,
        };

        setDayConfigs((prev) =>
            prev.map((d) =>
                d.dayId === dayId ? { ...d, exercises: [...d.exercises, newExercise] } : d
            )
        );

        // Reset form
        setExerciseForm({
            name: "",
            sets: [{ reps: "", weight: "" }],
            duration: "",
            restTime: "",
            notes: ""
        });
        setActiveDayId(null);
        toast({ title: "Exercise added", description: `${newExercise.name} added to the day` });
    };

    const removeExercise = (dayId: string, exerciseId: string) => {
        setDayConfigs((prev) =>
            prev.map((d) =>
                d.dayId === dayId
                    ? { ...d, exercises: d.exercises.filter((e) => e.id !== exerciseId) }
                    : d
            )
        );
    };

    const copyExercisesToDay = (sourceDayId: string, targetDayId: string) => {
        const sourceDay = dayConfigs.find((d) => d.dayId === sourceDayId);
        if (!sourceDay || sourceDay.exercises.length === 0) {
            toast({ title: "Error", description: "No exercises to copy", variant: "destructive" });
            return;
        }

        const copiedExercises: Exercise[] = sourceDay.exercises.map((ex) => ({
            ...ex,
            id: `e${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        }));

        setDayConfigs((prev) =>
            prev.map((d) =>
                d.dayId === targetDayId
                    ? { ...d, exercises: [...d.exercises, ...copiedExercises] }
                    : d
            )
        );

        const targetDay = dayConfigs.find((d) => d.dayId === targetDayId);
        toast({
            title: "Exercises copied!",
            description: `${copiedExercises.length} exercise${copiedExercises.length !== 1 ? "s" : ""} copied to ${targetDay?.dayLabel}`,
        });
    };

    const otherDays = (currentDayId: string) =>
        dayConfigs.filter((d) => d.dayId !== currentDayId && d.exercises.length > 0);

    const savePlan = (assignNow: boolean = false) => {
        const emptyDays = dayConfigs.filter((d) => d.exercises.length === 0);
        if (emptyDays.length > 0) {
            toast({
                title: "Incomplete plan",
                description: `Add exercises to: ${emptyDays.map((d) => d.dayLabel).join(", ")}`,
                variant: "destructive",
            });
            return;
        }

        console.log("Saving workout plan:", {
            client: selectedClient,
            planName,
            weightUnit,
            assignNow,
            days: dayConfigs,
        });

        toast({
            title: assignNow ? "Workout plan created & assigned!" : "Workout plan created!",
            description: `Plan "${planName}" ${assignNow ? "assigned to" : "created for"} ${selectedClient?.name}`,
        });

        navigate("/create/workout");
    };

    const resetBuilder = () => {
        setCurrentStep("client");
        setSelectedClient(null);
        setPlanName("");
        setSelectedDays([]);
        setDayConfigs([]);
        setWeightUnit("kg");
    };

    return {
        currentStep,
        setCurrentStep,
        weightUnit,
        setWeightUnit,
        selectedClient,
        setSelectedClient,
        clientSearch,
        setClientSearch,
        planName,
        setPlanName,
        selectedDays,
        setSelectedDays,
        dayConfigs,
        setDayConfigs,
        exerciseForm,
        setExerciseForm,
        activeDayId,
        setActiveDayId,
        proceedToExercises,
        addSetToForm,
        removeSetFromForm,
        updateSetInForm,
        addExercise,
        removeExercise,
        copyExercisesToDay,
        otherDays,
        savePlan,
        resetBuilder
    };
};
