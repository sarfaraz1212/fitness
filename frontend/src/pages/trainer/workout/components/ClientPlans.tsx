import React from "react";
import { Dumbbell, ArrowLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ClientBuilderProfileCard from "@/components/builder/ClientProfileCard";
import type { Client, WorkoutPlan, BuilderStep } from "../types";

interface ClientPlansProps {
    selectedClient: Client | null;
    clientPlans: WorkoutPlan[];
    setCurrentStep: (step: BuilderStep) => void;
}

const ClientPlans: React.FC<ClientPlansProps> = ({
    selectedClient,
    clientPlans,
    setCurrentStep,
}) => {
    if (!selectedClient) return null;

    return (
        <div className="slide-up flex flex-col md:flex-row gap-6 h-[calc(100vh-4rem)]">
            {/* Left Column: Profile */}
            <div className="md:w-1/3 flex-shrink-0 h-full">
                <ClientBuilderProfileCard
                    client={selectedClient}
                    className="h-full"
                />
            </div>

            {/* Right Column: Plans */}
            <div className="md:w-2/3 flex-1 flex flex-col h-full bg-transparent">
                {clientPlans.length > 0 ? (
                    <>
                        {/* Header */}
                        <div className="text-center md:text-center mb-4 flex-shrink-0">
                            <Dumbbell className="w-10 h-10 text-primary mx-auto mb-2" />
                            <h2 className="text-lg font-semibold text-foreground">
                                Existing Plans
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                {selectedClient.name} has {clientPlans.length} workout plan
                                {clientPlans.length !== 1 ? "s" : ""}
                            </p>
                        </div>

                        {/* Scrollable Plans List */}
                        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                            {clientPlans.map((plan) => (
                                <div
                                    key={plan.id}
                                    className="p-4 rounded-xl bg-card border border-border group hover:border-primary/50 transition-colors cursor-pointer"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold text-foreground">
                                                {plan.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {plan.exercises.length} exercises
                                            </p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-muted-foreground mt-1 group-hover:text-primary transition-colors" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="pt-4 border-t border-border text-center flex-shrink-0">
                            <p className="text-sm text-muted-foreground mb-3">
                                Or create a new plan
                            </p>
                            <Button className="w-full" onClick={() => setCurrentStep("days")}>
                                <Plus className="w-4 h-4 mr-2" /> Create New Plan
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-8 flex-1 flex flex-col justify-center">
                        <Dumbbell className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                        <h2 className="text-lg font-semibold text-foreground">
                            No Existing Plans
                        </h2>
                        <p className="text-sm text-muted-foreground mb-6">
                            {selectedClient.name} doesn't have any workout plans yet
                        </p>
                        <Button onClick={() => setCurrentStep("days")}>
                            <Plus className="w-4 h-4 mr-2" /> Create First Plan
                        </Button>
                    </div>
                )}

                <Button
                    variant="outline"
                    className="w-full mt-4 flex-shrink-0"
                    onClick={() => setCurrentStep("client")}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
            </div>
        </div>
    );
};

export default ClientPlans;
