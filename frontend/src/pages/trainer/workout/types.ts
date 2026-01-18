export interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps: number;
    weight?: number;
    duration?: string;
    restTime?: string;
    notes?: string;
}

export interface WorkoutPlan {
    id: string;
    name: string;
    description: string;
    exercises: Exercise[];
    isOpen: boolean;
}
