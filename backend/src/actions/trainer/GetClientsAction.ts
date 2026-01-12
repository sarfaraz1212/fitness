import ActionInterface from "../../interfaces/ActionInterface";
import { IUser } from "../../models/User";
import { UserRepository } from "../../repositories/UserRepository";

interface GetClientsPayload {
    trainerId: string;
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
}

export class GetClientsAction implements ActionInterface {
    async execute(payload: GetClientsPayload): Promise<any> {
        try {
            const condition = { assigned_trainer: payload.trainerId };
            const page = payload.page || 1;
            const limit = payload.limit || 8;

            const data =  await UserRepository.getPaginated(
                condition,
                page,
                limit,
                payload.search,
                payload.status
            );

            console.log("Data"  , data);
            return data;
        } catch (error) {
            throw error;
        }
    }
}