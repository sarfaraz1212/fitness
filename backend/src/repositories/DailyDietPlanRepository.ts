import { DailyDietPlan } from '../models/DailyDietPlan';

export default class DailyDietPlanRepository {
    static async createDailyDietPlan(userId: string, date: Date, meals: { meal_id: string; is_swapped?: boolean; is_complete?: boolean }[]): Promise<any> {
        // Normalize date to start of day to ensure uniqueness
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        const record = await DailyDietPlan.create({
            user_id: userId,
            date: startOfDay,
            meals: meals,
        });
        return record;
    }

    static async getDailyDietPlan(userId: string, date: Date): Promise<any> {
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

        return await DailyDietPlan.findOne({
            user_id: userId,
            date: { $gte: startOfDay, $lt: endOfDay }
        }).populate('meals.meal_id');
    }

    static async updateMealStatus(userId: string, date: Date, mealId: string, isComplete: boolean): Promise<any> {
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

        return await DailyDietPlan.findOneAndUpdate(
            {
                user_id: userId,
                date: { $gte: startOfDay, $lt: endOfDay },
                'meals.meal_id': mealId
            },
            {
                $set: { 'meals.$.is_complete': isComplete }
            },
            { new: true }
        ).populate('meals.meal_id');
    }

    static async swapMeal(userId: string, date: Date, oldMealId: string, newMealId: string): Promise<any> {
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

        return await DailyDietPlan.findOneAndUpdate(
            {
                user_id: userId,
                date: { $gte: startOfDay, $lt: endOfDay },
                'meals.meal_id': oldMealId
            },
            {
                $set: {
                    'meals.$.meal_id': newMealId,
                    'meals.$.is_swapped': true
                }
            },
            { new: true }
        ).populate('meals.meal_id');
    }

    static async hasDailyDietPlan(userId: string, date: Date): Promise<boolean> {
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

        const record = await DailyDietPlan.findOne({
            user_id: userId,
            date: { $gte: startOfDay, $lt: endOfDay }
        });
        return !!record;
    }
}