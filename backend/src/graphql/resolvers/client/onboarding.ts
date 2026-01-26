import { reminderQueue } from '../../../queues/reminderQueue';

export const clientOnboardingResolvers = {
  Query: {
    checkDailyWeightIn: async (_: any, __: any, context: any): Promise<boolean> => {
      const action = new GetDailyWeightInStatusAction();
      return await action.execute({ userId: context.currentUser.id });
    },
  },

  Mutation: {
    remindWeightIn: async (_: any, { minutesFromNow }: { minutesFromNow: number }, context: any): Promise<boolean> => {
      // Implement reminder logic here
      return true;
    },
  },
};
