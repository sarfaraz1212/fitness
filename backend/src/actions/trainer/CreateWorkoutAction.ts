import ActionInterface from "../../interfaces/ActionInterface";
import { WorkoutRepository } from "../../repositories/WorkoutRepository";

interface CreateWorkoutPayload {
    name: string;
    description?: string;
    addedBy: string;
}

export class CreateWorkoutAction implements ActionInterface {
    async execute(payload: CreateWorkoutPayload): Promise<any> {
        try {
            const createdWorkout = await WorkoutRepository.create(payload);
            return createdWorkout;
        } catch (error) {
            throw error;
        }
    }
}
