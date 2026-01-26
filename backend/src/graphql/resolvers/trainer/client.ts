import { GetClientsAction } from '../../../actions/trainer/GetClientsAction';

export const trainerClientResolvers = {
  Query: {
    getClients: async (_: any, args: any, context: any): Promise<any> => {
      const { page, limit, search, onboardingFilter } = args.input;
      const action = new GetClientsAction();
      return await action.execute({
        trainerId: context.currentUser._id,
        page,
        limit,
        search,
        onboardingFilter
      });
    },
  },
};
