import React from "react";
import { Utensils, ArrowLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ClientBuilderProfileCard from "@/components/builder/ClientProfileCard";

interface Day {
  dayId: string;
  dayLabel: string;
}

interface Plan {
  id: string;
  name: string;
  days: Day[];
  createdAt: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface ClientPlansProps {
  selectedClient: Client | null;
  clientPlans: Plan[];
  setCurrentStep: (step: "client" | "plans" | "days" | "meals") => void;
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
              <Utensils className="w-10 h-10 text-primary mx-auto mb-2" />
              <h2 className="text-lg font-semibold text-foreground dark:text-white">
                Existing Plans
              </h2>
              <p className="text-sm text-muted-foreground dark:text-gray-300">
                {selectedClient.name} has {clientPlans.length} diet plan
                {clientPlans.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Scrollable Plans List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {clientPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="p-4 rounded-xl bg-card border border-border dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground dark:text-white">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-300">
                        {plan.days.length} day{plan.days.length !== 1 ? "s" : ""} •
                        Created {plan.createdAt}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {plan.days.map((day) => (
                          <span
                            key={day.dayId}
                            className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary dark:bg-primary/20"
                          >
                            {day.dayLabel}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground dark:text-gray-300 mt-1" />
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-border dark:border-gray-700 text-center flex-shrink-0">
              <p className="text-sm text-muted-foreground dark:text-gray-300 mb-3">
                Or create a new plan
              </p>
              <Button className="w-full" onClick={() => setCurrentStep("days")}>
                <Plus className="w-4 h-4 mr-2" /> Create New Plan
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-8 flex-1 flex flex-col justify-center">
            <Utensils className="w-12 h-12 text-muted-foreground dark:text-gray-400 mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-foreground dark:text-white">
              No Existing Plans
            </h2>
            <p className="text-sm text-muted-foreground dark:text-gray-300 mb-6">
              {selectedClient.name} doesn't have any diet plans yet
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
