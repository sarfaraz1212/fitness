import { GetClientsAction } from '../../../actions/trainer/GetClientsAction';
import { requireTrainer } from './requireTrainer';

export const trainerClientResolvers = {
  Query: {
    getClients: requireTrainer(async (_: any, args: any, context: any) => {
      const { page, limit, search, onboardingFilter } = args.input;
      const action = new GetClientsAction();
      return await action.execute({
        trainerId: context.currentUser._id,
        page,
        limit,
        search,
        onboardingFilter
      });
    }),
  },
};
