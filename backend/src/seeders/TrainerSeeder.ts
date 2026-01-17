import User from '../models/User';
import Diet from '../models/Diet';
import { Types } from 'mongoose';

export class TrainerSeeder {
  async seed(): Promise<void> {
    try {
      console.log('🌱 Starting Trainer Seeder...');

  
      const existingTrainer = await User.findOne({ email: 'trainer@example.com' });
      
      let trainer;
      if (existingTrainer) {
        console.log('✅ Trainer already exists, using existing trainer...');
        trainer = existingTrainer;
      } else {
        // Create trainer
        trainer = new User({
          name: 'John Trainer',
          email: 'trainer@example.com',
          password: 'password',
          role: 'TRAINER',
          is_verified: true,
          is_onboarded: true,
        });
        await trainer.save();
        console.log('✅ Trainer created:', trainer.email);
      }

      const existingDiets = await Diet.find({ addedBy: trainer._id });
      
      if (existingDiets.length > 0) {
        console.log(`✅ ${existingDiets.length} diet plans already exist for this trainer. Skipping...`);
        return;
      }


      const mealPlans = [
        {
          name: 'Weight Loss Plan',
          description: 'A balanced diet plan focused on calorie deficit for weight loss',
          meals: [
            {
              _id: new Types.ObjectId(),
              name: 'Breakfast',
              description: 'Oatmeal with berries',
              time: '08:00',
              calories: 350,
              protein: 12,
              carbs: 55,
              fats: 8,
            },
            {
              _id: new Types.ObjectId(),
              name: 'Lunch',
              description: 'Grilled chicken salad',
              time: '13:00',
              calories: 450,
              protein: 35,
              carbs: 25,
              fats: 20,
            },
            {
              _id: new Types.ObjectId(),
              name: 'Dinner',
              description: 'Baked salmon with vegetables',
              time: '19:00',
              calories: 500,
              protein: 40,
              carbs: 30,
              fats: 22,
            },
          ],
        },
        {
          name: 'Muscle Gain Plan',
          description: 'High protein diet plan for muscle building and strength',
          meals: [
            {
              _id: new Types.ObjectId(),
              name: 'Breakfast',
              description: 'Protein pancakes with eggs',
              time: '07:00',
              calories: 600,
              protein: 45,
              carbs: 65,
              fats: 15,
            },
            {
              _id: new Types.ObjectId(),
              name: 'Pre-Workout',
              description: 'Banana with protein shake',
              time: '11:00',
              calories: 300,
              protein: 25,
              carbs: 40,
              fats: 5,
            },
            {
              _id: new Types.ObjectId(),
              name: 'Post-Workout',
              description: 'Chicken breast with rice',
              time: '13:30',
              calories: 650,
              protein: 55,
              carbs: 70,
              fats: 12,
            },
            {
              _id: new Types.ObjectId(),
              name: 'Dinner',
              description: 'Lean beef with sweet potato',
              time: '19:00',
              calories: 700,
              protein: 60,
              carbs: 80,
              fats: 18,
            },
          ],
        },
        {
          name: 'Maintenance Plan',
          description: 'Balanced nutrition plan for maintaining current weight',
          meals: [
            {
              _id: new Types.ObjectId(),
              name: 'Breakfast',
              description: 'Greek yogurt with granola',
              time: '08:00',
              calories: 400,
              protein: 20,
              carbs: 50,
              fats: 12,
            },
            {
              _id: new Types.ObjectId(),
              name: 'Lunch',
              description: 'Turkey wrap with vegetables',
              time: '12:30',
              calories: 500,
              protein: 30,
              carbs: 45,
              fats: 18,
            },
            {
              _id: new Types.ObjectId(),
              name: 'Snack',
              description: 'Mixed nuts and apple',
              time: '16:00',
              calories: 250,
              protein: 8,
              carbs: 25,
              fats: 15,
            },
            {
              _id: new Types.ObjectId(),
              name: 'Dinner',
              description: 'Grilled fish with quinoa',
              time: '19:00',
              calories: 550,
              protein: 35,
              carbs: 55,
              fats: 20,
            },
          ],
        },
        {
          name: 'Keto Plan',
          description: 'Low carb, high fat diet plan for ketosis',
          meals: [
            {
              _id: new Types.ObjectId(),
              name: 'Breakfast',
              description: 'Eggs with avocado and bacon',
              time: '08:00',
              calories: 550,
              protein: 25,
              carbs: 8,
              fats: 45,
            },
            {
              _id: new Types.ObjectId(),
              name: 'Lunch',
              description: 'Caesar salad with chicken',
              time: '13:00',
              calories: 600,
              protein: 40,
              carbs: 12,
              fats: 42,
            },
            {
              _id: new Types.ObjectId(),
              name: 'Dinner',
              description: 'Steak with broccoli',
              time: '19:00',
              calories: 650,
              protein: 50,
              carbs: 10,
              fats: 45,
            },
          ],
        },
        {
          name: 'Vegetarian Plan',
          description: 'Plant-based nutrition plan with complete proteins',
          meals: [
            {
              _id: new Types.ObjectId(),
              name: 'Breakfast',
              description: 'Tofu scramble with vegetables',
              time: '08:00',
              calories: 400,
              protein: 22,
              carbs: 35,
              fats: 18,
            },
            {
              _id: new Types.ObjectId(),
              name: 'Lunch',
              description: 'Lentil curry with brown rice',
              time: '13:00',
              calories: 550,
              protein: 28,
              carbs: 75,
              fats: 12,
            },
            {
              _id: new Types.ObjectId(),
              name: 'Snack',
              description: 'Hummus with vegetables',
              time: '16:00',
              calories: 200,
              protein: 8,
              carbs: 20,
              fats: 10,
            },
            {
              _id: new Types.ObjectId(),
              name: 'Dinner',
              description: 'Chickpea and vegetable stir-fry',
              time: '19:00',
              calories: 500,
              protein: 25,
              carbs: 65,
              fats: 15,
            },
          ],
        },
      ];

      // Create diet plans
      for (const planData of mealPlans) {
        const diet = new Diet({
          addedBy: trainer._id,
          name: planData.name,
          description: planData.description,
          meals: planData.meals,
        });
        await diet.save();
        console.log(`✅ Created diet plan: ${planData.name} with ${planData.meals.length} meals`);
      }

      console.log('✅ Trainer Seeder completed successfully!');
    } catch (error) {
      console.error('❌ Error in TrainerSeeder:', error);
      throw error;
    }
  }
}
