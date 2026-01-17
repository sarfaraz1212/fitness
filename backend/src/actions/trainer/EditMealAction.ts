import ActionInterface from "../../interfaces/ActionInterface";
import { DietRepository } from "../../repositories/DietRepository";

interface EditMealPayload {
    dietId: string;
    mealId: string;
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

export default class EditMealAction implements ActionInterface {
    async execute(payload: EditMealPayload): Promise<any> {
        try {
            const { dietId, mealId, input } = payload;

            // Verify meal exists
            const meal = await DietRepository.findMeal(dietId, mealId);

            if (!meal) {
                throw new Error("Meal not found");
            }

            // Update meal using repository
            const updatedMeal = await DietRepository.updateMeal(dietId, mealId, input);
            
            return updatedMeal;
            
        } catch (error) {
            throw error;
        }
    }
}
