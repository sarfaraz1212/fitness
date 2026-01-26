import { CreateWorkoutAction } from '../../../actions/trainer/CreateWorkoutAction';
import { GetWorkoutsAction } from '../../../actions/trainer/GetWorkoutsAction';
import { UpdateWorkoutAction } from '../../../actions/trainer/UpdateWorkoutAction';
import { DeleteWorkoutAction } from '../../../actions/trainer/DeleteWorkoutAction';
import { AddExerciseAction } from '../../../actions/trainer/AddExerciseAction';
import { UpdateExerciseAction } from '../../../actions/trainer/UpdateExerciseAction';
import { DeleteExerciseAction } from '../../../actions/trainer/DeleteExerciseAction';
import { requireTrainer } from './requireTrainer';

export const trainerWorkoutResolvers = {
  Query: {
    getWorkouts: requireTrainer(async (_: any, args: any, context: any): Promise<any> => {
      const { page, limit, search } = args.input || {};
      const action = new GetWorkoutsAction();
      return await action.execute({
        trainerId: context.currentUser._id,
        page,
        limit,
        search
      });
    }),
  },
  Mutation: {
    createWorkout: requireTrainer(async (_: any, args: any, context: any) => {
      const { name, description, exercises } = args.input;
      const action = new CreateWorkoutAction();
      return await action.execute({
        name,
        description,
        exercises,
        addedBy: context.currentUser._id
      });
    }),
    updateWorkout: requireTrainer(async (_: any, args: any, context: any) => {
      const action = new UpdateWorkoutAction();
      return await action.execute({
        workoutId: args.workoutId,
        input: args.input
      });
    }),
    deleteWorkout: requireTrainer(async (_: any, args: any, context: any) => {
      const action = new DeleteWorkoutAction();
      return await action.execute({ workoutId: args.workoutId });
    }),
    addExercise: requireTrainer(async (_: any, args: any, context: any) => {
      const action = new AddExerciseAction();
      return await action.execute({
        workoutId: args.workoutId,
        input: args.input
      });
    }),
    updateExercise: requireTrainer(async (_: any, args: any, context: any) => {
      const action = new UpdateExerciseAction();
      return await action.execute({
        workoutId: args.workoutId,
        exerciseId: args.exerciseId,
        input: args.input
      });
    }),
    deleteExercise: requireTrainer(async (_: any, args: any, context: any) => {
      const action = new DeleteExerciseAction();
      return await action.execute({
        workoutId: args.workoutId,
        exerciseId: args.exerciseId
      });
    }),
  },
};
