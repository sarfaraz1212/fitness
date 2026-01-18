import ActionInterface from "../../interfaces/ActionInterface";
import { WorkoutRepository } from "../../repositories/WorkoutRepository";

interface UpdateWorkoutPayload {
    workoutId: string;
    input: {
        name: string;
        description?: string;
    };
}

export class UpdateWorkoutAction implements ActionInterface {
    async execute(payload: UpdateWorkoutPayload): Promise<any> {
        try {
            const updatedWorkout = await WorkoutRepository.updatePlan(payload.workoutId, payload.input);
            return updatedWorkout;
        } catch (error) {
            throw error;
        }
    }
}
