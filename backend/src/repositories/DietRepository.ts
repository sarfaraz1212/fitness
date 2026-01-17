import { Types } from 'mongoose';
import Diet, { IDiet, IMeal } from '../models/Diet';

export class DietRepository {
    static async create(data:any): Promise<IDiet> {
        const diet = new Diet(data);
        return await diet.save();
    }    

    static async getByTrainer(addedBy: string) {
        return Diet.find({ addedBy });
    }

    static async delete(dietId: string)
    {
        return await Diet.deleteOne({ _id: dietId });
    }

    static async findMeal(dietId: string, mealId: string) {
        const diet = await Diet.findById(dietId);
    
        if (!diet) {
            throw new Error("Diet not found");
        }
    
        const meal = diet.meals.find(
            meal => meal._id.toString() === mealId
        );
          
        if (!meal) {
            throw new Error("Meal not found");
        }
    
        return meal;
    }

    static async addMeal(data:any): Promise<IMeal> {

        const diet = await Diet.findById(data.dietId);

        if (!diet) {
        throw new Error("Diet not found");
        }


        const newMeal = {
            _id: new Types.ObjectId(),
            name: data.input.name,
            description: data.input.description || "",
            time: data.input.time,
            calories: data.input.calories,
            protein: data.input.protein,
            carbs: data.input.carbs,
            fats: data.input.fats,
        };

        diet.meals.push(newMeal);
        await diet.save();

        return diet.meals[diet.meals.length - 1];

    }   

    static async deleteMeal(dietId: string, mealId: string) {
        const result = await Diet.updateOne(
            { _id: dietId, "meals._id": mealId },
            { $pull: { meals: { _id: mealId } } }
        );

        if (result.matchedCount === 0) {
            throw new Error("Diet or meal not found");
        }

        return {
            dietId,
            mealId
        }

    }

    static async updateMeal(dietId: string, mealId: string, input: {
        name: string;
        description?: string;
        time: string;
        calories: number;
        protein: number;
        carbs: number;
        fats: number;
    }): Promise<IMeal> {
        const diet = await Diet.findById(dietId);

        if (!diet) {
            throw new Error("Diet not found");
        }

        const meal = diet.meals.find(
            meal => meal._id.toString() === mealId
        );

        if (!meal) {
            throw new Error("Meal not found");
        }

        // Update meal fields
        meal.name = input.name;
        meal.description = input.description || "";
        meal.time = input.time;
        meal.calories = input.calories;
        meal.protein = input.protein;
        meal.carbs = input.carbs;
        meal.fats = input.fats;

        await diet.save();

        return meal;
    }

    static async updatePlan(dietId: string, input: {
        name: string;
        description?: string;
    }): Promise<IDiet> {
        const diet = await Diet.findById(dietId);

        if (!diet) {
            throw new Error("Diet not found");
        }

        // Update diet fields
        diet.name = input.name;
        diet.description = input.description || "";

        await diet.save();

        return diet;
    }

    
}


