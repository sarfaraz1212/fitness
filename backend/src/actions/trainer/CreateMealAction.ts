import ActionInterface from "../../interfaces/ActionInterface";
import { DietRepository } from "../../repositories/DietRepository";

interface CreateMealPayload {
    dietId: string;
    input: {
        name: string;
        description?: string;
        time: string;
        calories: number;
        protein: number;
        carbs: number;
        fats: number;
    }

}


export default class CreateMealAction implements ActionInterface {
    async execute(payload: CreateMealPayload): Promise<any> {
        try {

            const createMeal = DietRepository.addMeal(payload);

            return createMeal;
            
        } catch (error) {
            throw error;
        }
    }
}