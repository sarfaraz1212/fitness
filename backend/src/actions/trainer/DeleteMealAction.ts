import ActionInterface from "../../interfaces/ActionInterface";
import { DietRepository } from "../../repositories/DietRepository";

interface deleteMealPayload {
    dietId: string;
    mealId: string;
}


export default class DeleteMealAction implements ActionInterface {
    async execute(payload: deleteMealPayload): Promise<any> {
        try {

            console.log("Payload:",payload);
            const {dietId,mealId} = payload;
            const meal = await DietRepository.findMeal(dietId,mealId);

            if (!meal) {
                throw new Error("Meal not found");
            }

            const deletedMeal = await DietRepository.deleteMeal(dietId,mealId)
            
            return deletedMeal;
            
        } catch (error) {
            throw error;
        }
    }
}