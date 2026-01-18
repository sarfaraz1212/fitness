import Workout, { IWorkout } from '../models/Workout';

export class WorkoutRepository {
    static async create(data: any): Promise<IWorkout> {
        const workout = new Workout(data);
        return await workout.save();
    }

    static async getByTrainer(addedBy: string) {
        return Workout.find({ addedBy }).sort({ createdAt: -1 });
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
                .sort({ createdAt: -1 }),
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
        );
    }

    static async addExercise(workoutId: string, exercise: any): Promise<IWorkout | null> {
        return await Workout.findByIdAndUpdate(
            workoutId,
            { $push: { exercises: exercise } },
            { new: true }
        );
    }

    static async updateExercise(workoutId: string, exerciseId: string, input: any): Promise<IWorkout | null> {
        const updateDoc: any = {};
        for (const key in input) {
            updateDoc[`exercises.$.${key}`] = input[key];
        }

        return await Workout.findOneAndUpdate(
            { _id: workoutId, 'exercises._id': exerciseId },
            { $set: updateDoc },
            { new: true }
        );
    }

    static async deleteExercise(workoutId: string, exerciseId: string): Promise<IWorkout | null> {
        return await Workout.findByIdAndUpdate(
            workoutId,
            { $pull: { exercises: { _id: exerciseId } } },
            { new: true }
        );
    }
}
