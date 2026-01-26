import { CreateDietAction } from '../../../actions/trainer/CreateDietAction';
import { EditDietAction } from '../../../actions/trainer/EditDietAction';
import DeleteDietAction from '../../../actions/trainer/DeleteDietAction';
import { GetDietsAction } from '../../../actions/trainer/GetDietsAction';

export const trainerDietResolvers = {
  Query: {
    getDiets: async (_: any, args: any, context: any): Promise<any> => {
      const { page, limit, search, sortBy } = args.input || {};
      const action = new GetDietsAction();
      return await action.execute({
        trainerId: context.currentUser._id,
        page,
        limit,
        search,
        sortBy
      });
    },
  },
  Mutation: {
    createDiet: async (_: any, args: any, context: any) => {
      const action = new CreateDietAction();
      return await action.execute({ trainerId: context.currentUser._id, ...args.input });
    },
    editDiet: async (_: any, args: any, context: any) => {
      const { name, description } = args.input;
      const action = new EditDietAction();
      return await action.execute({
        dietId: args.dietId,
        input: { name, description }
      });
    },
    deleteDiet: async (_: any, args: any, context: any) => {
      const action = new DeleteDietAction();
      return await action.execute({ dietId: args.dietId });
    },
  },
};
