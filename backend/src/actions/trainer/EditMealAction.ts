import ActionInterface from "../../interfaces/ActionInterface";
import MealRepository from "../../repositories/MealRepository";

interface EditMealPayload {
    userId: string;
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
            const { userId, mealId, input } = payload;

            // Verify meal exists
            const meal = await MealRepository.findById(mealId);

            if (!meal) {
                throw new Error("Meal not found");
            }

            // Check if current user is the one who added the meal
            if (!meal.addedBy.equals(userId)) {
                throw new Error("Unauthorized: You can only edit meals you added");
            }

            // Update meal using repository
            const updatedMeal = await MealRepository.updateById(mealId, input);
            
            return updatedMeal;
            
        } catch (error) {
            throw error;
        }
    }
}
