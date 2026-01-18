import ActionInterface from "../../interfaces/ActionInterface";
import { WorkoutRepository } from "../../repositories/WorkoutRepository";

interface GetWorkoutsPayload {
    trainerId: string;
    page?: number;
    limit?: number;
    search?: string;
}

export class GetWorkoutsAction implements ActionInterface {
    async execute(payload: GetWorkoutsPayload): Promise<any> {
        try {
            const condition = { addedBy: payload.trainerId };
            const page = payload.page || 1;
            const limit = payload.limit || 8;

            const data = await WorkoutRepository.getPaginated(
                condition,
                page,
                limit,
                payload.search
            );

            return data;
        } catch (error) {
            throw error;
        }
    }
}
