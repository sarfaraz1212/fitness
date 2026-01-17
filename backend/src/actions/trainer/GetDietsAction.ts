import ActionInterface from "../../interfaces/ActionInterface";
import { DietRepository } from "../../repositories/DietRepository";


interface GetDietsPayload {
    trainerId: string;
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
}

export class GetDietsAction implements ActionInterface {
    async execute(payload: GetDietsPayload): Promise<any> {
        try {
            const condition = { addedBy: payload.trainerId };
            const page = payload.page || 1;
            const limit = payload.limit || 8;

            const data = await DietRepository.getPaginated(
                condition,
                page,
                limit,
                payload.search,
                payload.sortBy
            );

            return data;
        } catch (error) {
            throw error;
        }
    }
}