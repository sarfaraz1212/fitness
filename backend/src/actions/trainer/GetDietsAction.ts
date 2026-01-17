import ActionInterface from "../../interfaces/ActionInterface";
import { DietRepository } from "../../repositories/DietRepository";


interface GetDietsPayload {
    trainerId: string;
}

export class GetDietsAction implements ActionInterface {
    async execute(payload: GetDietsPayload): Promise<any> {
        try {
           
            const diets = DietRepository.getByTrainer(payload.trainerId);

            return diets;
           
        } catch (error) {
            throw error;
        }
    }
}