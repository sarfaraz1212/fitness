import ActionInterface from "../../interfaces/ActionInterface";
import MealRepository from "../../repositories/MealRepository";
import { DietRepository } from "../../repositories/DietRepository";

interface deleteMealPayload {
    userId: string;
    dietId: string;
    mealId: string;
}


export default class DeleteMealAction implements ActionInterface {
    async execute(payload: deleteMealPayload): Promise<any> {
        try {

            const {userId, dietId, mealId} = payload;
            const meal = await MealRepository.findById(mealId);

            if (!meal) {
                throw new Error("Meal not found");
            }

            // Check if current user is the one who added the meal
            if (!meal.addedBy.equals(userId)) {
                throw new Error("Unauthorized: You can only delete meals you added");
            }

            // Remove meal from diet's meals array
            await DietRepository.removeMealFromDiet(dietId, mealId);

            const deletedMeal = await MealRepository.deleteById(mealId)
            
            return { dietId, mealId };
            
        } catch (error) {
            throw error;
        }
    }
}