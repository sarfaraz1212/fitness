import ActionInterface from "../../interfaces/ActionInterface";
import { DietRepository } from "../../repositories/DietRepository";

interface deleteMealPayload {
    dietId: string;
}


export default class DeleteDietAction implements ActionInterface {
    async execute(payload: deleteMealPayload): Promise<any> {
        try {

            const {dietId} = payload;
            const deletedDiet = await DietRepository.delete(dietId);

            if (deletedDiet.deletedCount === 0) {
                throw new Error("Diet not found");
            }
            
            return dietId;
            
        } catch (error) {
            throw error;
        }
    }
}