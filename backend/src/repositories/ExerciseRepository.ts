import Exercise, { IExercise } from "../models/Exercise";

export class ExerciseRepository {
  static async create(input: Partial<IExercise>): Promise<IExercise> {
    const exercise = new Exercise(input);
    return await exercise.save();
  }

  static async update(exerciseId: string, input: Partial<IExercise>): Promise<IExercise | null> {
    return await Exercise.findByIdAndUpdate(exerciseId, input, { new: true });
  }

  static async delete(exerciseId: string): Promise<void> {
    await Exercise.deleteOne({ _id: exerciseId });
  }

  static async findByIds(ids: string[]): Promise<IExercise[]> {
    return await Exercise.find({ _id: { $in: ids } });
  }
}
