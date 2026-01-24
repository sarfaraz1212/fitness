import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { client } from "@/lib/apollo";
import { GET_MACROS_QUERY } from "@/graphql/queries";
import type {
    Meal,
    Client,
    DayConfig,
    BuilderStep,
    GetMacrosResponse,
    GetMacrosVariables,
    MealForm
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

export const useDietBuilder = () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    // Step management
    const [currentStep, setCurrentStep] = useState<BuilderStep>("client");

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
    const [mealForm, setMealForm] = useState<MealForm>({
        name: "",
        description: "",
        time: "",
        calories: "",
        protein: "",
        carbs: "",
        fats: "",
    });
    const [fetchMacrosLoading, setFetchMacrosLoading] = useState(false);

    const fetchMacros = async (mealName: string) => {
        if (!mealName.trim()) return;
        setFetchMacrosLoading(true);
        try {
            const { data } = await client.query<GetMacrosResponse, GetMacrosVariables>({
                query: GET_MACROS_QUERY,
                variables: { name: mealName },
            });
            if (data?.getMacros) {
                setMealForm(prev => ({
                    ...prev,
                    calories: data.getMacros.calories.toString(),
                    protein: data.getMacros.protein.toString(),
                    carbs: data.getMacros.carbs.toString(),
                    fats: data.getMacros.fats.toString(),
                }));
                toast({ title: "Macros fetched!", description: `Nutritional data for ${mealName} updated.` });
            }
        } catch (error) {
            console.error("Error fetching macros:", error);
            toast({ title: "Error", description: "Failed to fetch macros", variant: "destructive" });
        } finally {
            setFetchMacrosLoading(false);
        }
    };

    const proceedToMeals = (name: string, days: string[]) => {
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
            meals: [],
            isOpen: false,
        }));
        if (configs.length > 0) configs[0].isOpen = true;
        setDayConfigs(configs);
        setCurrentStep("meals");
    };

    const addMeal = (dayId: string) => {
        if (!mealForm.name.trim()) {
            toast({ title: "Error", description: "Meal name is required", variant: "destructive" });
            return;
        }

        const newMeal: Meal = {
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

        const copiedMeals: Meal[] = sourceDay.meals.map((meal) => ({
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

    const getDayMacros = (meals: Meal[]) => {
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

    const otherDays = (currentDayId: string) =>
        dayConfigs.filter((d) => d.dayId !== currentDayId && d.meals.length > 0);

    const savePlan = () => {

        console.log(dayConfigs);
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

    const resetBuilder = () => {
        setCurrentStep("client");
        setSelectedClient(null);
        setPlanName("");
        setSelectedDays([]);
        setDayConfigs([]);
    };

    return {
        currentStep,
        setCurrentStep,
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
        mealForm,
        setMealForm,
        activeDayId,
        setActiveDayId,
        fetchMacrosLoading,
        fetchMacros,
        proceedToMeals,
        addMeal,
        removeMeal,
        copyMealsToDay,
        getDayMacros,
        otherDays,
        savePlan,
        resetBuilder
    };
};
