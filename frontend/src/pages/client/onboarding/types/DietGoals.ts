import type { BaseType } from "./BaseType";

export interface DietGoalsProps extends BaseType {
    formData: {
        dietPreference: string;
        fitnessGoals: string[];
    };
    handleFitnessGoalChange: (goals: string[]) => void;
}

