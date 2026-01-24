import React, { useState } from "react";
import { Utensils, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ClientBuilderProfileCard from "@/components/builder/ClientProfileCard";

interface Client {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface DaySelectionProps {
  selectedClient: Client;
  setCurrentStep: React.Dispatch<
    React.SetStateAction<"client" | "plans" | "days" | "meals">
  >;
  proceedToMeals: (planName: string, selectedDays: string[]) => void;
}

const daysOfWeek = [
  { id: "monday", name: "Monday" },
  { id: "tuesday", name: "Tuesday" },
  { id: "wednesday", name: "Wednesday" },
  { id: "thursday", name: "Thursday" },
  { id: "friday", name: "Friday" },
  { id: "saturday", name: "Saturday" },
  { id: "sunday", name: "Sunday" },
];

const DaySelection: React.FC<DaySelectionProps> = ({
  selectedClient,
  setCurrentStep,
  proceedToMeals,
}) => {
  const [planName, setPlanName] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const toggleDay = (dayId: string) => {
    setSelectedDays((prev) =>
      prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId]
    );
  };

  return (
    <div className="slide-up flex flex-col md:flex-row gap-6 h-full">
      {/* Left Column: Profile Card */}
      <div className="md:w-1/3 flex-shrink-0 h-[80vh] overflow-y-auto sticky top-4">
    <ClientBuilderProfileCard client={selectedClient} />
  </div>
      {/* Right Column: Form */}
      <div className="md:w-2/3 flex-1 space-y-6 overflow-y-auto p-4">
        {/* Header */}
        <div className="text-center md:text-left">
          <Utensils className="w-12 h-12 text-primary mx-auto md:mx-0 mb-3" />
          <h2 className="text-lg font-semibold text-foreground dark:text-white">
            Configure Plan
          </h2>
          <p className="text-sm text-muted-foreground dark:text-gray-300">
            Name your plan and select the days
          </p>
        </div>

        {/* Client Info */}
      

        {/* Plan Name Input */}
        <div className="space-y-2">
          <Label className="text-foreground dark:text-white">Plan Name *</Label>
          <Input
            placeholder="e.g., Muscle Building Diet"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
          />
        </div>

        {/* Day Selection */}
        <div className="space-y-3">
          <Label className="text-foreground dark:text-white">Meal Days *</Label>
          <div className="grid grid-cols-2 gap-3">
            {daysOfWeek.map((day, index) => {
              const isSelected = selectedDays.includes(day.id);
              const isLastOdd =
                index === daysOfWeek.length - 1 && daysOfWeek.length % 2 !== 0;

              return (
                <button
                  key={day.id}
                  onClick={() => toggleDay(day.id)}
                  className={`
                    relative flex items-center gap-3 p-4 rounded-xl border-2
                    transition-all duration-200 ease-out
                    ${isLastOdd ? "col-span-2" : ""}
                    ${
                      isSelected
                        ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/25 scale-[1.02]"
                        : "bg-card border-border text-foreground hover:border-primary/50 hover:shadow-md hover:scale-[1.01] dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    }
                  `}
                >
                  {/* Checkbox */}
                  <div
                    className={`
                      flex items-center justify-center w-6 h-6 rounded-md border-2
                      transition-all duration-200
                      ${
                        isSelected
                          ? "bg-primary-foreground border-primary-foreground"
                          : "border-muted-foreground/30 bg-transparent"
                      }
                    `}
                  >
                    <Check
                      className={`
                        w-4 h-4 text-primary
                        transition-all duration-200
                        ${isSelected ? "opacity-100 scale-100" : "opacity-0 scale-50"}
                      `}
                    />
                  </div>

                  <span className="font-medium">{day.name}</span>

                  {isSelected && (
                    <div className="absolute inset-0 rounded-xl ring-2 ring-primary ring-offset-2 ring-offset-background animate-pulse pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
          <p className="text-sm text-muted-foreground dark:text-gray-300 text-center md:text-left pt-1">
            <span className="font-semibold text-primary">{selectedDays.length}</span>{" "}
            day{selectedDays.length !== 1 ? "s" : ""} selected
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-2 pt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentStep("plans")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <Button
            className="flex-1"
            onClick={() => proceedToMeals(planName, selectedDays)}
            disabled={!planName || selectedDays.length === 0}
          >
            Continue <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DaySelection;
