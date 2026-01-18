import ActionInterface from "../../interfaces/ActionInterface";
import { WorkoutRepository } from "../../repositories/WorkoutRepository";

interface DeleteExercisePayload {
    workoutId: string;
    exerciseId: string;
}

export class DeleteExerciseAction implements ActionInterface {
    async execute(payload: DeleteExercisePayload): Promise<any> {
        try {
            const updatedWorkout = await WorkoutRepository.deleteExercise(
                payload.workoutId,
                payload.exerciseId
            );
            return updatedWorkout;
        } catch (error) {
            throw error;
        }
    }
}
