import { Meal,IMeal } from '../models/Meal';

export default class MealRepository {

    static async createMeal(mealData: IMeal) {
        return await Meal.create(mealData);
    }

    static async createOrUpdate(mealData: IMeal) {
        return await Meal.findOneAndUpdate(
            { name: mealData.name },
            { $set: mealData },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true,
            }
        );
    }

    static async findById(mealId: string) {
        return await Meal.findById(mealId);
    }

    static async updateById(mealId: string, updateData: Partial<IMeal>) {
        return await Meal.findByIdAndUpdate(mealId, updateData, { new: true });
    }

    static async deleteById(mealId: string) {
        return await Meal.findByIdAndDelete(mealId);
    }
}