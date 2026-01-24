import React, { useState } from "react";
import {
    Dumbbell,
    ArrowLeft,
    Check,
    Plus,
    Copy,
    ChevronUp,
    ChevronDown,
    Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ClientBuilderProfileCard from "@/components/builder/ClientProfileCard";
import ExerciseCard from "./ExerciseCard";
import AddExerciseForm from "./AddExerciseForm";
import type { Client, DayConfig, ExerciseForm, BuilderStep, WeightUnit } from "../types";
import SaveConfirmationModal from "@/components/builder/SaveConfirmationModal";

interface WorkoutBuilderProps {
    planName: string;
    selectedClient: Client;
    dayConfigs: DayConfig[];
    setCurrentStep: React.Dispatch<React.SetStateAction<BuilderStep>>;
    savePlan: (assignNow: boolean) => void;
    copyExercisesToDay: (fromDayId: string, toDayId: string) => void;
    removeExercise: (dayId: string, exerciseId: string) => void;
    otherDays: (currentDayId: string) => DayConfig[];
    exerciseForm: ExerciseForm;
    setExerciseForm: React.Dispatch<React.SetStateAction<ExerciseForm>>;
    addExercise: (dayId: string) => void;
    activeDayId: string | null;
    setActiveDayId: React.Dispatch<React.SetStateAction<string | null>>;
    weightUnit: WeightUnit;
    setWeightUnit: (unit: WeightUnit) => void;
    addSetToForm: () => void;
    removeSetFromForm: (index: number) => void;
    updateSetInForm: (index: number, field: "reps" | "weight", value: string) => void;
}

const WorkoutBuilder: React.FC<WorkoutBuilderProps> = ({
    planName,
    selectedClient,
    dayConfigs,
    setCurrentStep,
    savePlan,
    copyExercisesToDay,
    removeExercise,
    otherDays,
    exerciseForm,
    setExerciseForm,
    addExercise,
    activeDayId,
    setActiveDayId,
    weightUnit,
    setWeightUnit,
    addSetToForm,
    removeSetFromForm,
    updateSetInForm
}) => {
    const [openDayId, setOpenDayId] = useState<string | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const toggleDayConfig = (dayId: string) => {
        setOpenDayId((prev) => (prev === dayId ? null : dayId));
    };

    const handleFinishClick = () => {
        const emptyDays = dayConfigs.filter((d) => d.exercises.length === 0);
        if (emptyDays.length > 0) {
            savePlan(false);
            return;
        }
        setIsConfirmModalOpen(true);
    };

    return (
        <div className="slide-up flex flex-col md:flex-row gap-6 h-full">
            {/* Left Column: Client Profile */}
            <div className="md:w-1/3 flex-shrink-0 h-full">
                <ClientBuilderProfileCard client={selectedClient} className="h-full" />
            </div>

            {/* Right Column: Workout Builder */}
            <div className="md:w-2/3 flex-1 space-y-4 overflow-y-auto p-4">
                {/* Header */}
                <div className="p-4 rounded-xl bg-card border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-sm gap-4">
                    <div>
                        <p className="font-bold text-foreground text-lg">{planName}</p>
                        <p className="text-sm text-muted-foreground font-medium">
                            for {selectedClient.name} • {dayConfigs.length} day
                            {dayConfigs.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        {/* Weight Unit Toggle */}
                        <div className="flex items-center gap-1 bg-muted p-1 rounded-lg border border-border">
                            <Button
                                variant={weightUnit === "kg" ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setWeightUnit("kg")}
                                className={`h-7 px-3 text-[10px] font-bold rounded-md ${weightUnit === "kg" ? "shadow-sm" : "text-muted-foreground"}`}
                            >
                                KG
                            </Button>
                            <Button
                                variant={weightUnit === "lbs" ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setWeightUnit("lbs")}
                                className={`h-7 px-3 text-[10px] font-bold rounded-md ${weightUnit === "lbs" ? "shadow-sm" : "text-muted-foreground"}`}
                            >
                                LBS
                            </Button>
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentStep("days")}
                            className="rounded-lg h-9 px-4 font-semibold shrink-0"
                        >
                            Edit Days
                        </Button>
                    </div>
                </div>

                {/* Day Configs */}
                <div className="space-y-4">
                    {dayConfigs.map((dayConfig) => (
                        <div key={dayConfig.dayId} className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm">
                            <div
                                className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer"
                                onClick={() => toggleDayConfig(dayConfig.dayId)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Dumbbell className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-foreground text-base">
                                            {dayConfig.dayLabel}
                                        </h3>
                                        <p className="text-xs text-muted-foreground font-medium">
                                            {dayConfig.exercises.length} exercise
                                            {dayConfig.exercises.length !== 1 ? "s" : ""}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {otherDays(dayConfig.dayId).length > 0 && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const sourceDay = otherDays(dayConfig.dayId)[0];
                                                if (sourceDay) copyExercisesToDay(sourceDay.dayId, dayConfig.dayId);
                                            }}
                                        >
                                            <Copy className="w-4 h-4" />
                                        </Button>
                                    )}
                                    {openDayId === dayConfig.dayId ? (
                                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                    )}
                                </div>
                            </div>

                            {openDayId === dayConfig.dayId && (
                                <div className="px-4 pb-4 space-y-4 animate-in fade-in duration-300">
                                    <div className="space-y-3">
                                        {dayConfig.exercises.length === 0 ? (
                                            <div className="py-8 text-center bg-muted/20 rounded-xl border border-dashed border-border flex flex-col items-center gap-2">
                                                <Scale className="w-6 h-6 text-muted-foreground/30" />
                                                <p className="text-xs text-muted-foreground font-medium">No exercises added yet for this day</p>
                                            </div>
                                        ) : (
                                            dayConfig.exercises.map((exercise) => (
                                                <ExerciseCard
                                                    key={exercise.id}
                                                    exercise={exercise}
                                                    weightUnit={weightUnit}
                                                    onRemove={() => removeExercise(dayConfig.dayId, exercise.id)}
                                                />
                                            ))
                                        )}
                                    </div>

                                    {activeDayId === dayConfig.dayId ? (
                                        <AddExerciseForm
                                            exerciseForm={exerciseForm}
                                            weightUnit={weightUnit}
                                            addSetToForm={addSetToForm}
                                            removeSetFromForm={removeSetFromForm}
                                            updateSetInForm={updateSetInForm}
                                            handleAddExercise={() => addExercise(dayConfig.dayId)}
                                            handleCancel={() => setActiveDayId(null)}
                                            setExerciseForm={setExerciseForm}
                                        />
                                    ) : (
                                        <Button
                                            variant="outline"
                                            className="w-full border-dashed h-12 text-sm font-bold rounded-xl hover:bg-primary/5 hover:text-primary hover:border-primary/50 transition-all shadow-sm"
                                            onClick={() => setActiveDayId(dayConfig.dayId)}
                                        >
                                            <Plus className="w-4 h-4 mr-2" /> Add Exercise
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-4 mt-8">
                    <Button
                        variant="outline"
                        onClick={() => setCurrentStep("days")}
                        className="flex-1 h-14 text-base font-bold rounded-2xl hover:bg-muted"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    <Button
                        onClick={handleFinishClick}
                        className="flex-1 h-14 text-base font-bold rounded-2xl shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 transition-all"
                    >
                        <Check className="w-4 h-4 mr-2" /> Finish & Save Plan
                    </Button>
                </div>
            </div>

            <SaveConfirmationModal
                open={isConfirmModalOpen}
                onOpenChange={setIsConfirmModalOpen}
                onConfirm={savePlan}
                title="Assign Workout Plan?"
                clientName={selectedClient.name}
            />
        </div>
    );
};

export default WorkoutBuilder;
