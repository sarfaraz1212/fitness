import { GetDailyWeightInStatusAction } from '../../actions/client/GetDailyWeightInStatusAction';
import { LogDailyWeightInAction } from '../../actions/client/LogDailyWeightInAction';
import { GetDailyWeightAction } from '../../actions/client/GetDailyWeightAction';
import { UpdateDailyWeightInAction } from '../../actions/client/UpdateDailyWeightInAction';
import GetDailyAssignedDietPlan  from '../../actions/client/GetDailyAssignedDietPlan';
export const clientResolvers = {
  Query: {
    getDailyWeight: async (_: any, __: any, context: any): Promise<any> => {
      const action = new GetDailyWeightAction();
      const record = await action.execute({ userId: context.currentUser.id });

      return record;
    },

    getAssignedDietPlan: async (_:any, __: any, context: any): Promise<boolean> => {
      
      const action = new GetDailyAssignedDietPlan();
      await action.execute({ userId: context.currentUser.id });
      return true;
    }
  },

  Mutation: {
    logDailyWeightIn: async (_: any, { input }: { input: { weight: number, unit: string } }, context: any): Promise<any> => {
      const action = new LogDailyWeightInAction();
      return await action.execute({ userId: context.currentUser.id, weight: input.weight, unit: input.unit });
    },

    updateDailyWeightIn: async (_: any, { input }: { input: { date: string, weight: number, unit: string } }, context: any): Promise<any> => {
      const action = new UpdateDailyWeightInAction();
      const date = new Date(input.date);
      return await action.execute({ userId: context.currentUser.id, date, weight: input.weight, unit: input.unit });
    },
  },
};
