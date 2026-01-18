import ActionInterface from "../../interfaces/ActionInterface";
import { WorkoutRepository } from "../../repositories/WorkoutRepository";

interface DeleteWorkoutPayload {
    workoutId: string;
}

export class DeleteWorkoutAction implements ActionInterface {
    async execute(payload: DeleteWorkoutPayload): Promise<any> {
        try {
            await WorkoutRepository.delete(payload.workoutId);
            return payload.workoutId;
        } catch (error) {
            throw error;
        }
    }
}
