import ActionInterface from "../../interfaces/ActionInterface";
import { WorkoutRepository } from "../../repositories/WorkoutRepository";

interface AddExercisePayload {
    workoutId: string;
    input: any;
}

export class AddExerciseAction implements ActionInterface {
    async execute(payload: AddExercisePayload): Promise<any> {
        try {
            const updatedWorkout = await WorkoutRepository.addExercise(payload.workoutId, payload.input);
            return updatedWorkout;
        } catch (error) {
            throw error;
        }
    }
}
