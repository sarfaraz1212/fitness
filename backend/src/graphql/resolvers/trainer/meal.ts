import CreateMealAction from '../../../actions/trainer/CreateMealAction';
import EditMealAction from '../../../actions/trainer/EditMealAction';
import DeleteMealAction from '../../../actions/trainer/DeleteMealAction';
import { GetMarcosAction } from '../../../actions/trainer/GetMarcosAction';
import { requireTrainer } from './requireTrainer';

export const trainerMealResolvers = {
  Query: {
    getMacros: requireTrainer(async (_: any, args: any, context: any): Promise<any> => {
      const action = new GetMarcosAction();
      return await action.execute({ name: args.name });
    }),
  },
  Mutation: {
    createMeal: requireTrainer(async (_: any, args: any, context: any) => {
      const action = new CreateMealAction();
      return await action.execute({
        userId: context.currentUser._id,
        dietId: args.dietId,
        input: args.input
      });
    }),
    editMeal: requireTrainer(async (_: any, args: any, context: any) => {
      const action = new EditMealAction();
      return await action.execute({
        userId: context.currentUser._id,
        dietId: args.dietId,
        mealId: args.mealId,
        input: args.input
      });
    }),
    deleteMeal: requireTrainer(async (_: any, args: any, context: any) => {
      const action = new DeleteMealAction();
      return await action.execute({
        userId: context.currentUser._id,
        dietId: args.dietId,
        mealId: args.mealId
      });
    }),
  },
};
