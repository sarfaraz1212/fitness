import Workout, { IWorkout } from '../models/Workout';
import { ExerciseRepository } from './ExerciseRepository';

export class WorkoutRepository {
    static async create(data: any): Promise<IWorkout> {
        const workout = new Workout(data);
        await workout.save();
        return await workout.populate('exercises');
    }

    static async getByTrainer(addedBy: string) {
        return Workout.find({ addedBy }).sort({ createdAt: -1 }).populate('exercises');
    }

    static async getPaginated(
        condition: any,
        page: number = 1,
        limit: number = 8,
        search?: string
    ): Promise<{ workouts: IWorkout[], total: number, totalPages: number, currentPage: number }> {
        const query: any = { ...condition };

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (page - 1) * limit;

        const [workouts, total] = await Promise.all([
            Workout.find(query)
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .populate('exercises'),
            Workout.countDocuments(query)
        ]);

        return {
            workouts,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        };
    }

    static async delete(workoutId: string) {
        return await Workout.deleteOne({ _id: workoutId });
    }

    static async updatePlan(workoutId: string, input: {
        name: string;
        description?: string;
    }): Promise<IWorkout | null> {
        return await Workout.findByIdAndUpdate(
            workoutId,
            { name: input.name, description: input.description },
            { new: true }
        ).populate('exercises');
    }

    static async addExercise(workoutId: string, exerciseInput: any): Promise<IWorkout | null> {
        const exercise = await ExerciseRepository.create(exerciseInput);
        const workout = await Workout.findByIdAndUpdate(
            workoutId,
            { $push: { exercises: exercise._id } },
            { new: true }
        ).populate('exercises');
        return workout;
    }

    static async updateExercise(workoutId: string, exerciseId: string, input: any): Promise<IWorkout | null> {
        await ExerciseRepository.update(exerciseId, input);
        return await Workout.findById(workoutId).populate('exercises');
    }

    static async deleteExercise(workoutId: string, exerciseId: string): Promise<IWorkout | null> {
        await ExerciseRepository.delete(exerciseId);
        return await Workout.findByIdAndUpdate(
            workoutId,
            { $pull: { exercises: exerciseId } },
            { new: true }
        ).populate('exercises');
    }
}
