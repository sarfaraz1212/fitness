export interface SetInfo {
    reps: number;
    weight: number;
}

export interface Exercise {
    id: string;
    name: string;
    sets: SetInfo[];
    duration?: string;
    restTime?: string;
    notes?: string;
}

export interface WorkoutPlan {
    id: string;
    name: string;
    description: string;
    exercises: Exercise[];
    isOpen?: boolean;
}

export interface Client {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

export interface DayConfig {
    dayId: string;
    dayLabel: string;
    exercises: Exercise[];
    isOpen: boolean;
}

export type BuilderStep = "client" | "plans" | "days" | "exercises";

export type WeightUnit = "kg" | "lbs";

export interface ExerciseForm {
    name: string;
    sets: { reps: string; weight: string }[];
    duration: string;
    restTime: string;
    notes: string;
}
