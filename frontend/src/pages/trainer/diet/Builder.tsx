import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Utensils,
  ArrowLeft,
  ArrowRight,
  Check,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Search,
  User,
  Clock,
  Flame,
  Copy,
  Dumbbell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ClientList from "@/components/builder/ClientList"
import ClientPlans from "@/pages/trainer/diet/Components/plans/ClientPlans";
import DaySelection from "@/pages/trainer/diet/Components/plans/DaySelection";
import MealBuilder from "@/pages/trainer/diet/Components/meals/MealBuilder";
// Mock clients data
const mockClients = [
  { id: "c1", name: "John Smith", email: "john@example.com", avatar: "JS" },
  { id: "c2", name: "Sarah Johnson", email: "sarah@example.com", avatar: "SJ" },
  { id: "c3", name: "Mike Williams", email: "mike@example.com", avatar: "MW" },
  { id: "c4", name: "Emily Brown", email: "emily@example.com", avatar: "EB" },
  { id: "c5", name: "David Lee", email: "david@example.com", avatar: "DL" },
];

const daysOfWeek = [
  { id: "monday", label: "Monday", short: "Mon" },
  { id: "tuesday", label: "Tuesday", short: "Tue" },
  { id: "wednesday", label: "Wednesday", short: "Wed" },
  { id: "thursday", label: "Thursday", short: "Thu" },
  { id: "friday", label: "Friday", short: "Fri" },
  { id: "saturday", label: "Saturday", short: "Sat" },
  { id: "sunday", label: "Sunday", short: "Sun" },
];

interface MealConfig {
  id: string;
  name: string;
  description: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface DayConfig {
  dayId: string;
  dayLabel: string;
  meals: MealConfig[];
  isOpen: boolean;
}

interface Client {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface SavedPlan {
  id: string;
  clientId: string;
  name: string;
  days: DayConfig[];
  createdAt: string;
}

// Mock saved plans per client
const mockSavedPlans: SavedPlan[] = [
  {
    id: "dp1",
    clientId: "c1",
    name: "Muscle Building Diet",
    days: [
      { dayId: "monday", dayLabel: "Monday", meals: [
        { id: "m1", name: "Breakfast", description: "Eggs with toast", time: "07:00", calories: 450, protein: 35, carbs: 40, fats: 18 }
      ], isOpen: false },
      { dayId: "wednesday", dayLabel: "Wednesday", meals: [], isOpen: false },
    ],
    createdAt: "2024-01-15"
  },
  {
    id: "dp2",
    clientId: "c1",
    name: "Cutting Phase",
    days: [
      { dayId: "monday", dayLabel: "Monday", meals: [], isOpen: false },
    ],
    createdAt: "2024-01-20"
  },
  {
    id: "dp3",
    clientId: "c2",
    name: "Balanced Nutrition",
    days: [
      { dayId: "tuesday", dayLabel: "Tuesday", meals: [], isOpen: false },
      { dayId: "thursday", dayLabel: "Thursday", meals: [], isOpen: false },
    ],
    createdAt: "2024-01-18"
  },
];

type Step = "client" | "plans" | "days" | "meals";

const Builder = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Step management
  const [currentStep, setCurrentStep] = useState<Step>("client");

  // Step 1: Client selection
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientSearch, setClientSearch] = useState("");

  // Step 2: Days configuration
  const [planName, setPlanName] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  // Step 3: Meal configuration per day
  const [dayConfigs, setDayConfigs] = useState<DayConfig[]>([]);

  // Meal form state
  const [activeDayId, setActiveDayId] = useState<string | null>(null);
  const [mealForm, setMealForm] = useState({
    name: "",
    description: "",
    time: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
  });

  const filteredClients = mockClients.filter(
    (c) =>
      c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(clientSearch.toLowerCase())
  );

  const toggleDay = (dayId: string) => {
    setSelectedDays((prev) =>
      prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId]
    );
  };

  const proceedToMeals = (planName: string, selectedDays: number) => {
    if (!planName.trim()) {
      toast({ title: "Error", description: "Please enter a plan name", variant: "destructive" });
      return;
    }
    if (selectedDays.length === 0) {
      toast({ title: "Error", description: "Please select at least one day", variant: "destructive" });
      return;
    }

    // Initialize day configs in order
    const orderedDays = daysOfWeek.filter((d) => selectedDays.includes(d.id));
    const configs: DayConfig[] = orderedDays.map((d) => ({
      dayId: d.id,
      dayLabel: d.label,
      meals: [],
      isOpen: false,
    }));
    if (configs.length > 0) configs[0].isOpen = true;
    setDayConfigs(configs);
    setCurrentStep("meals");
  };

  const toggleDayConfig = (dayId: string) => {
    setDayConfigs((prev) =>
      prev.map((d) => (d.dayId === dayId ? { ...d, isOpen: !d.isOpen } : d))
    );
  };

  const addMeal = (dayId: string) => {
    if (!mealForm.name.trim()) {
      toast({ title: "Error", description: "Meal name is required", variant: "destructive" });
      return;
    }

    const newMeal: MealConfig = {
      id: `m${Date.now()}`,
      name: mealForm.name.trim(),
      description: mealForm.description.trim(),
      time: mealForm.time,
      calories: Number(mealForm.calories) || 0,
      protein: Number(mealForm.protein) || 0,
      carbs: Number(mealForm.carbs) || 0,
      fats: Number(mealForm.fats) || 0,
    };

    setDayConfigs((prev) =>
      prev.map((d) =>
        d.dayId === dayId ? { ...d, meals: [...d.meals, newMeal] } : d
      )
    );

    // Reset form
    setMealForm({ name: "", description: "", time: "", calories: "", protein: "", carbs: "", fats: "" });
    setActiveDayId(null);
    toast({ title: "Meal added", description: `${newMeal.name} added to the day` });
  };

  const removeMeal = (dayId: string, mealId: string) => {
    setDayConfigs((prev) =>
      prev.map((d) =>
        d.dayId === dayId
          ? { ...d, meals: d.meals.filter((m) => m.id !== mealId) }
          : d
      )
    );
  };

  const copyMealsToDay = (sourceDayId: string, targetDayId: string) => {
    const sourceDay = dayConfigs.find((d) => d.dayId === sourceDayId);
    if (!sourceDay || sourceDay.meals.length === 0) {
      toast({ title: "Error", description: "No meals to copy", variant: "destructive" });
      return;
    }

    const copiedMeals = sourceDay.meals.map((meal) => ({
      ...meal,
      id: `m${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }));

    setDayConfigs((prev) =>
      prev.map((d) =>
        d.dayId === targetDayId
          ? { ...d, meals: [...d.meals, ...copiedMeals] }
          : d
      )
    );

    const targetDay = dayConfigs.find((d) => d.dayId === targetDayId);
    toast({
      title: "Meals copied!",
      description: `${copiedMeals.length} meal${copiedMeals.length !== 1 ? "s" : ""} copied to ${targetDay?.dayLabel}`,
    });
  };

  const getDayMacros = (meals: MealConfig[]) => {
    return meals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fats: acc.fats + meal.fats,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  };

  const savePlan = () => {
    
    const emptyDays = dayConfigs.filter((d) => d.meals.length === 0);
    if (emptyDays.length > 0) {
      toast({
        title: "Incomplete plan",
        description: `Add meals to: ${emptyDays.map((d) => d.dayLabel).join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    console.log("Saving plan:", {
      client: selectedClient,
      planName,
      days: dayConfigs,
    });

    toast({
      title: "Plan created!",
      description: `Diet plan "${planName}" created for ${selectedClient?.name}`,
    });

    navigate("/create/diet");
  };

  const stepNumber = currentStep === "client" ? 1 : currentStep === "plans" ? 2 : currentStep === "days" ? 3 : 4;
  const totalSteps = 4;

  const clientPlans = selectedClient
    ? mockSavedPlans.filter((p) => p.clientId === selectedClient.id)
    : [];

  const otherDays = (currentDayId: string) =>
    dayConfigs.filter((d) => d.dayId !== currentDayId && d.meals.length > 0);

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
                className={`h-1 flex-1 rounded-full transition-colors ${
                  idx < stepNumber ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      <main className="container max-w-8xl py-6">
        {/* Step 1: Client Selection */}
        {currentStep === "client" && (
            <ClientList
                clientSearch={clientSearch}
                setClientSearch={setClientSearch}
                filteredClients={filteredClients}
                selectedClient={selectedClient}
                setSelectedClient={setSelectedClient}
                setCurrentStep={setCurrentStep}
            />
        )}

        {/* Step 2: Client Plans */}
        {currentStep === "plans" && (
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
        {currentStep === "days" && (
          <DaySelection
            selectedClient={selectedClient}
            setCurrentStep={setCurrentStep}
            proceedToMeals={proceedToMeals}
          />
        )}

        {/* Step 4: Meals Builder */}
      {currentStep === "meals" && (
  <MealBuilder
    planName={planName} // string
    selectedClient={selectedClient} // Client object
    dayConfigs={dayConfigs} // array of DayConfig objects
    setCurrentStep={setCurrentStep} // function to change steps
    savePlan={savePlan} // function to save the plan
    getDayMacros={getDayMacros} // function that calculates macros for a meal array
    copyMealsToDay={copyMealsToDay} // function to copy meals from one day to another
    removeMeal={removeMeal} // function to remove a meal
    otherDays={otherDays} // function returning DayConfigs for other days
  />
)}

      </main>
    </div>
  );
};

export default Builder;
