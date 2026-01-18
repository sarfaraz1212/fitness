import { reminderQueue } from '../../queues/reminderQueue';

export const clientResolvers = {
  Query: {
    checkDailyWeightIn: async (_: any, __: any, context: any): Promise<boolean> => {
      const action = new GetDailyWeightInStatusAction();
      return await action.execute({ userId: context.currentUser.id });
    },
  },

  Mutation: {
    remindWeightIn: async (_: any, { minutesFromNow }: { minutesFromNow: number }, context: any): Promise<boolean> => {
    

   await reminderQueue.add(
  'daily-weight-in-reminder',
  { userId: 123 },
  { delay: 10000 } // 10 seconds for quick test
);


      return true;
    },
  },
};
