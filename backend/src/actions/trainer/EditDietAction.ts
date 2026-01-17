import ActionInterface from "../../interfaces/ActionInterface";
import { DietRepository } from "../../repositories/DietRepository";

interface EditDietPayload {
    dietId: string;
    input: {
        name: string;
        description?: string;
    }
}

export class EditDietAction implements ActionInterface {
    async execute(payload: EditDietPayload): Promise<any> {
        try {
            const { dietId, input } = payload;

            // Update diet using repository
            const updatedDiet = await DietRepository.updatePlan(dietId, input);
            
            return updatedDiet;
            
        } catch (error) {
            throw error;
        }
    }
}
