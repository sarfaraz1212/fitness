import ActionInterface from "../../interfaces/ActionInterface";
import { WorkoutRepository } from "../../repositories/WorkoutRepository";
import { ExerciseRepository } from "../../repositories/ExerciseRepository";

interface ExerciseInputPayload {
    name: string;
    sets: number;
    reps: number;
    weight?: number;
    duration?: string;
    restTime?: string;
    notes?: string;
}

interface CreateWorkoutPayload {
    name: string;
    description?: string;
    addedBy: string;
    exercises?: ExerciseInputPayload[];
}

export class CreateWorkoutAction implements ActionInterface {
    async execute(payload: CreateWorkoutPayload): Promise<any> {
        try {
            const exerciseIds = payload.exercises && payload.exercises.length > 0
                ? await Promise.all(payload.exercises.map(ex => ExerciseRepository.create(ex).then(e => e._id)))
                : [];

            const createdWorkout = await WorkoutRepository.create({
                name: payload.name,
                description: payload.description,
                addedBy: payload.addedBy,
                exercises: exerciseIds,
            });
            return createdWorkout;
        } catch (error) {
            throw error;
        }
    }
}
