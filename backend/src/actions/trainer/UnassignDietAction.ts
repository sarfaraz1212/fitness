import ActionInterface from "../../interfaces/ActionInterface";
import { UserRepository } from "../../repositories/UserRepository";

interface UnassignDietPayload {
    clientId: string;
}

export class UnassignDietAction implements ActionInterface {
    async execute(payload: UnassignDietPayload): Promise<any> {
        try {
            const user = await UserRepository.find(payload.clientId);

            if (!user) {
                throw new Error("User not found");
            }

            user.assigned_diet = null;
            await user.save();

            return user;
        } catch (error) {
            throw error;
        }
    }
}
