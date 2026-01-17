import { CreateDietAction } from '../../actions/trainer/CreateDietAction';
import { EditDietAction } from '../../actions/trainer/EditDietAction';
import CreateMealAction  from '../../actions/trainer/CreateMealAction';
import EditMealAction from '../../actions/trainer/EditMealAction';
import DeleteDietAction from '../../actions/trainer/DeleteDietAction';
import DeleteMealAction from '../../actions/trainer/DeleteMealAction';
import { GetClientsAction } from '../../actions/trainer/GetClientsAction';
import { GetDietsAction } from '../../actions/trainer/GetDietsAction';
import { GetMarcosAction } from '../../actions/trainer/GetMarcosAction';



export const trainerResolvers = {
    Query: {
        getClients: async (_: any, args: any, context: any): Promise<any> => {

            const { page, limit, search, onboardingFilter } = args.input;

            const action = new GetClientsAction();

            const actionResponse = await action.execute({
                trainerId: context.currentUser._id,
                page,
                limit,
                search,
                onboardingFilter
            });

            return actionResponse;
        },

        getDiets: async (_: any, args: any, context: any): Promise<any> => {

            // const { page, limit, search, onboardingFilter } = args.input;

            const action = new GetDietsAction();

            const actionResponse = await action.execute({
                trainerId: context.currentUser._id,
            });

            return actionResponse;
        },

        getMacros: async (_: any, args: any, context: any): Promise<any> => {
            
            const action  = new GetMarcosAction();

            return await action.execute({ name: args.name });
        }
    },
    Mutation: {
        createDiet: async (_: any, args:any ,context:any) => {
            
            const {name,description} = args.input;

            const action         = new CreateDietAction();

            const actionResponse = await action.execute({
                name,
                description,
                addedBy: context.currentUser._id
            });

            return actionResponse;
        },
        editDiet: async (_: any, args:any ,context:any) => {
            
            const {name, description} = args.input;

            const action = new EditDietAction();

            const actionResponse = await action.execute({
                dietId: args.dietId,
                input: {
                    name,
                    description
                }
            });

            return actionResponse;
        },
        createMeal: async (_: any, args:any ,context:any) => {
            const action = new CreateMealAction();
            
            const actionReponse = await action.execute({
                dietId:args.dietId,
                input:args.input
            });

           return actionReponse;
        },
        editMeal: async (_: any, args:any ,context:any) => {
            const action = new EditMealAction();
            
            const actionResponse = await action.execute({
                dietId: args.dietId,
                mealId: args.mealId,
                input: args.input
            });

            return actionResponse;
        },
        deleteDiet: async (_: any, args:any ,context:any) => {
            const action =  new DeleteDietAction();

            const {dietId} = args;
           
            return action.execute({dietId});
        },
        deleteMeal: async(_:any, args:any,context:any) => {

            const action =  new DeleteMealAction();

            const {dietId,mealId} = args;
           
            return action.execute({dietId,mealId});
        }
    },
};
