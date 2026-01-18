import ActionInterface from "../../interfaces/ActionInterface";
import { WorkoutRepository } from "../../repositories/WorkoutRepository";

interface UpdateExercisePayload {
    workoutId: string;
    exerciseId: string;
    input: any;
}

export class UpdateExerciseAction implements ActionInterface {
    async execute(payload: UpdateExercisePayload): Promise<any> {
        try {
            const updatedWorkout = await WorkoutRepository.updateExercise(
                payload.workoutId,
                payload.exerciseId,
                payload.input
            );
            return updatedWorkout;
        } catch (error) {
            throw error;
        }
    }
}
