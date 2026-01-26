import ActionInterface from "../../interfaces/ActionInterface";
import { DietRepository } from "../../repositories/DietRepository";
import { CreateDietPayload } from "../../types/payloads/trainer/CreateDietPayload";
import MealRepository from "../../repositories/MealRepository";
import mongoose from "mongoose";

export class CreateDietAction implements ActionInterface {
    async execute(payload: CreateDietPayload): Promise<any> {
        
        const session = await mongoose.startSession(); 
        session.startTransaction();

        try {
            
            const daysWithMealIds = await Promise.all(
                payload.days.map(async (day) => {
                    const mealIds = await Promise.all(
                        day.meals.map(async (meal) => {
                            const createdMeal = await MealRepository.createMeal(meal, session);
                            return createdMeal.id;
                        })
                    );

                    return {
                        dayId: day.dayId,
                        dayLabel: day.dayLabel,
                        meals: mealIds
                    };
                })
            );

         
            const createDietPayload = {
                name: payload.planName,
                clientId: payload.clientId,
                assignedBy: payload.trainerId,
                days: daysWithMealIds
            };


            const createdDietplan = await DietRepository.create(createDietPayload, session);

        
            await session.commitTransaction();
            session.endSession();

            return createdDietplan;

        } catch (error) {
         
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    }
}
