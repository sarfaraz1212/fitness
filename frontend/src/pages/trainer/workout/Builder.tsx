import { Link } from "react-router-dom";
import {
    ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ClientList from "@/components/builder/ClientList"
import ClientPlans from "./components/ClientPlans";
import DaySelection from "./components/DaySelection";
import WorkoutBuilderComponent from "./components/WorkoutBuilder";
import { useWorkoutBuilder } from "./services/useWorkoutBuilder";

const Builder = () => {
    const {
        currentStep,
        setCurrentStep,
        weightUnit,
        setWeightUnit,
        selectedClient,
        setSelectedClient,
        clientSearch,
        setClientSearch,
        planName,
        dayConfigs,
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
    } = useWorkoutBuilder();

    const stepNumber = currentStep === "client" ? 1 : currentStep === "plans" ? 2 : currentStep === "days" ? 3 : 4;
    const totalSteps = 4;

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
                <div className="container max-w-2xl py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to="/trainer/workout-plans">
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <ArrowLeft className="w-5 h-5" />
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-xl font-display font-bold text-foreground">
                                    Create Workout Plan
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Step {stepNumber} of {totalSteps}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="flex gap-2 mt-4">
                        {["client", "plans", "days", "exercises"].map((step, idx) => (
                            <div
                                key={step}
                                className={`h-1 flex-1 rounded-full transition-colors ${idx < stepNumber ? "bg-primary" : "bg-muted"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </header>

            <main className="container max-w-7xl py-6 px-4">
                {/* Step 1: Client Selection */}
                {currentStep === "client" && (
                    <ClientList
                        clientSearch={clientSearch}
                        setClientSearch={setClientSearch}
                        selectedClient={selectedClient}
                        setSelectedClient={setSelectedClient}
                        setCurrentStep={setCurrentStep}
                    />
                )}

                {/* Step 2: Client Plans */}
                {currentStep === "plans" && selectedClient && (
                    <ClientPlans
                        selectedClient={selectedClient}
                        clientPlans={[
                            {
                                id: "plan1",
                                name: "Basic Strength",
                                exercises: [],
                                description: "Full body strength training",
                                isOpen: false
                            }
                        ]}
                        setCurrentStep={setCurrentStep}
                    />
                )}


                {/* Step 3: Day Selection */}
                {currentStep === "days" && selectedClient && (
                    <DaySelection
                        selectedClient={selectedClient}
                        setCurrentStep={setCurrentStep}
                        proceedToExercises={proceedToExercises}
                    />
                )}

                {/* Step 4: Workout Builder */}
                {currentStep === "exercises" && selectedClient && (
                    <WorkoutBuilderComponent
                        planName={planName}
                        selectedClient={selectedClient}
                        dayConfigs={dayConfigs}
                        setCurrentStep={setCurrentStep}
                        savePlan={savePlan}
                        copyExercisesToDay={copyExercisesToDay}
                        removeExercise={removeExercise}
                        otherDays={otherDays}
                        exerciseForm={exerciseForm}
                        setExerciseForm={setExerciseForm}
                        addExercise={addExercise}
                        activeDayId={activeDayId}
                        setActiveDayId={setActiveDayId}
                        weightUnit={weightUnit}
                        setWeightUnit={setWeightUnit}
                        addSetToForm={addSetToForm}
                        removeSetFromForm={removeSetFromForm}
                        updateSetInForm={updateSetInForm}
                    />
                )}
            </main>
        </div>
    );
};

export default Builder;
