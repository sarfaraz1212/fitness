import ActionInterface from "../../interfaces/ActionInterface";
import MealRepository from "../../repositories/MealRepository";
import { DietRepository } from "../../repositories/DietRepository";

interface CreateMealPayload {
  userId: string;
  dietId: string;
  input: {
    name: string;
    description?: string;
    time: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}

export default class CreateMealAction implements ActionInterface {
  async execute(payload: CreateMealPayload): Promise<any> {
    try {
      const normalizedInput = {
        ...payload.input,
        name: payload.input.name.trim(),   
        addedBy: payload.userId
      };

      const createdMeal = await MealRepository.createMeal(normalizedInput);

      // Add the meal to the diet
      await DietRepository.addMealToDiet(payload.dietId, createdMeal._id);

      return createdMeal;
    } catch (error) {
      throw error;
    }
  }
}
