// Nutrient
export interface Nutrient {
    name: string;
    amount: string; // e.g., "14.8 mg" or "2.4 µg"
}

// Client / User
export interface Onboarding {
    fitness_goals: string[];
    profile_image: string;
}

export interface Client {
    id: string;
    name: string;
    email: string;
    onboarding: Onboarding;
}

// Meal
export interface Meal {
    id: string;
    name: string;
    description: string;
    time: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    vitamins: Nutrient[];
    minerals: Nutrient[];
}

// Day (NO isOpen)
export interface Day {
    dayId: string;
    dayLabel: string;
    meals: Meal[];
}

// Final payload
export interface CreateDietPayload {
    client: Client;
    planName: string;
    assignedBy: boolean;
    trainerId: string;
    days: Day[];
}
