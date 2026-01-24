import { Link } from "react-router-dom";
import {
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ClientList from "@/components/builder/ClientList"
import ClientPlans from "@/pages/trainer/diet/Components/plans/ClientPlans";
import DaySelection from "@/pages/trainer/diet/Components/plans/DaySelection";
import MealBuilder from "@/pages/trainer/diet/Components/meals/MealBuilder";
import { useDietBuilder } from "./services/useDietBuilder";

// Mock clients data
const mockClients = [
  { id: "c1", name: "John Smith", email: "john@example.com", avatar: "JS" },
  { id: "c2", name: "Sarah Johnson", email: "sarah@example.com", avatar: "SJ" },
  { id: "c3", name: "Mike Williams", email: "mike@example.com", avatar: "MW" },
  { id: "c4", name: "Emily Brown", email: "emily@example.com", avatar: "EB" },
  { id: "c5", name: "David Lee", email: "david@example.com", avatar: "DL" },
];

const Builder = () => {
  const {
    currentStep,
    setCurrentStep,
    selectedClient,
    setSelectedClient,
    clientSearch,
    setClientSearch,
    planName,
    dayConfigs,
    mealForm,
    setMealForm,
    activeDayId,
    setActiveDayId,
    fetchMacrosLoading,
    fetchMacros,
    proceedToMeals,
    addMeal,
    openEditMeal,
    updateMeal,
    cancelEdit,
    removeMeal,
    copyMealsToDay,
    getDayMacros,
    otherDays,
    savePlan,
  } = useDietBuilder();

  const filteredClients = mockClients.filter(
    (c) =>
      c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(clientSearch.toLowerCase())
  );

  const stepNumber = currentStep === "client" ? 1 : currentStep === "plans" ? 2 : currentStep === "days" ? 3 : 4;
  const totalSteps = 4;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-2xl py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/create/diet">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-display font-bold text-foreground">
                  Create Diet Plan
                </h1>
                <p className="text-sm text-muted-foreground">
                  Step {stepNumber} of {totalSteps}
                </p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex gap-2 mt-4">
            {["client", "plans", "days", "meals"].map((step, idx) => (
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
                name: "Weight Loss Plan",
                days: [
                  { dayId: "day1", dayLabel: "Monday" },
                  { dayId: "day2", dayLabel: "Tuesday" },
                ],
                createdAt: "2026-01-24",
              },
              {
                id: "plan2",
                name: "Muscle Gain Plan",
                days: [
                  { dayId: "day1", dayLabel: "Monday" },
                  { dayId: "day2", dayLabel: "Wednesday" },
                ],
                createdAt: "2026-01-20",
              },
            ]}
            setCurrentStep={setCurrentStep}
          />
        )}


        {/* Step 3: Day Selection */}
        {currentStep === "days" && selectedClient && (
          <DaySelection
            selectedClient={selectedClient}
            setCurrentStep={setCurrentStep}
            proceedToMeals={proceedToMeals}
          />
        )}

        {/* Step 4: Meals Builder */}
        {currentStep === "meals" && selectedClient && (
          <MealBuilder
            planName={planName}
            selectedClient={selectedClient}
            dayConfigs={dayConfigs}
            setCurrentStep={setCurrentStep as any}
            savePlan={savePlan}
            getDayMacros={getDayMacros}
            copyMealsToDay={copyMealsToDay}
            removeMeal={removeMeal}
            otherDays={otherDays}
            fetchMacros={fetchMacros}
            fetchMacrosLoading={fetchMacrosLoading}
            mealForm={mealForm}
            setMealForm={setMealForm}
            addMeal={addMeal}
            openEditMeal={openEditMeal}
            updateMeal={updateMeal}
            cancelEdit={cancelEdit}
            activeDayId={activeDayId}
            setActiveDayId={setActiveDayId}
          />
        )}
      </main>
    </div>
  );
};

export default Builder;
