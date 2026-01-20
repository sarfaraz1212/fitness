
import {UserRepository} from '../../repositories/UserRepository';
import ActionInterface from '../../interfaces/ActionInterface';
import {DietRepository} from '../../repositories/DietRepository';
import DailyDietPlanRepository from '../../repositories/DailyDietPlanRepository';

export default class GetDailyAssignedDietPlan implements ActionInterface {

 
  
  async execute({ userId }: { userId: string }) {

    try{

        const user = await UserRepository.find(userId);
        
        if(!user.assigned_diet)
        {
            throw new Error("No diet plan assigned to user");
        }

        const dailyDietPlan = await DailyDietPlanRepository.getDailyDietPlan(userId, new Date());
    
        if(!dailyDietPlan)
        {
            const dietPlan  = await DietRepository.find(user.assigned_diet);

            if(!dietPlan)
            {
                throw new Error("Diet plan not found");
            }

            const meals = dietPlan.meals.map(meal => ({
                meal_id: meal._id,
                is_swapped:  false,
                is_complete:  false,
            }));

            return await DailyDietPlanRepository.createDailyDietPlan(userId, new Date(), meals);
        }

        console.log(dailyDietPlan);
        return dailyDietPlan;
        
        // console.log(user);
        
    }catch(error){
        throw error
    }
    
  }
}