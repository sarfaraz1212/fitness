import ActionInterface from "../../interfaces/ActionInterface";
import { DietRepository } from "../../repositories/DietRepository";
import { UserRepository } from "../../repositories/UserRepository";


interface AssignDietPayload {
    dietId: string;
    clientId: string;
}

export class AssignDietAction implements ActionInterface {
    async execute(payload: AssignDietPayload): Promise<any> {
        try {

            const user = await UserRepository.find(payload.clientId);

            if (!user) {
                throw new Error("User not found");
            }

            const diet = await DietRepository.find(payload.dietId);

            if (!diet) {
                throw new Error("Diet not found");
            }

            user.assigned_diet = diet._id;
            await user.save();

            return diet;
        } catch (error) {
            throw error;
        }
    }
}
