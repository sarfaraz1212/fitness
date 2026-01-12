import { GetClientsAction } from '../../actions/trainer/GetClientsAction';
import { IUser } from '../../models/User';


export const trainerResolvers = {
    Query: {
        getClients: async (_: any, { page, limit, search, status }: any, context: any): Promise<any> => {

            const action = new GetClientsAction();

            const actionResponse = await action.execute({
                trainerId: context.currentUser._id,
                page,
                limit,
                search,
                status
            });

            return actionResponse;
        },
    },
    Mutation: {
        dummyAction: async (_: any, { input }: { input: string }) => {
            console.log("Mutation input received:", input);
            return `You sent: ${input}`;
        },
    },
};
