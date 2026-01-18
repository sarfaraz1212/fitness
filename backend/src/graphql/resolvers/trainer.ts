import { CreateDietAction } from '../../actions/trainer/CreateDietAction';
import { EditDietAction } from '../../actions/trainer/EditDietAction';
import CreateMealAction from '../../actions/trainer/CreateMealAction';
import EditMealAction from '../../actions/trainer/EditMealAction';
import DeleteDietAction from '../../actions/trainer/DeleteDietAction';
import DeleteMealAction from '../../actions/trainer/DeleteMealAction';
import { GetClientsAction } from '../../actions/trainer/GetClientsAction';
import { GetDietsAction } from '../../actions/trainer/GetDietsAction';
import { GetMarcosAction } from '../../actions/trainer/GetMarcosAction';
import { CreateWorkoutAction } from '../../actions/trainer/CreateWorkoutAction';
import { GetWorkoutsAction } from '../../actions/trainer/GetWorkoutsAction';
import { UpdateWorkoutAction } from '../../actions/trainer/UpdateWorkoutAction';
import { DeleteWorkoutAction } from '../../actions/trainer/DeleteWorkoutAction';
import { AddExerciseAction } from '../../actions/trainer/AddExerciseAction';
import { UpdateExerciseAction } from '../../actions/trainer/UpdateExerciseAction';
import { DeleteExerciseAction } from '../../actions/trainer/DeleteExerciseAction';
import { AssignDietAction } from '../../actions/trainer/AssignDietAction';
import { UnassignDietAction } from '../../actions/trainer/UnassignDietAction';



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
            const { page, limit, search, sortBy } = args.input || {};

            const action = new GetDietsAction();

            const actionResponse = await action.execute({
                trainerId: context.currentUser._id,
                page,
                limit,
                search,
                sortBy
            });

            return actionResponse;
        },

        getMacros: async (_: any, args: any, context: any): Promise<any> => {

            const action = new GetMarcosAction();

            return await action.execute({ name: args.name });
        },

        getWorkouts: async (_: any, args: any, context: any): Promise<any> => {
            const { page, limit, search } = args.input || {};

            const action = new GetWorkoutsAction();

            const actionResponse = await action.execute({
                trainerId: context.currentUser._id,
                page,
                limit,
                search
            });

            return actionResponse;
        }
    },
    Mutation: {
        createDiet: async (_: any, args: any, context: any) => {

            const { name, description } = args.input;

            const action = new CreateDietAction();

            const actionResponse = await action.execute({
                name,
                description,
                addedBy: context.currentUser._id
            });

            return actionResponse;
        },
        editDiet: async (_: any, args: any, context: any) => {

            const { name, description } = args.input;

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
        createMeal: async (_: any, args: any, context: any) => {
            const action = new CreateMealAction();

            const actionReponse = await action.execute({
                dietId: args.dietId,
                input: args.input
            });

            return actionReponse;
        },
        editMeal: async (_: any, args: any, context: any) => {
            const action = new EditMealAction();

            const actionResponse = await action.execute({
                dietId: args.dietId,
                mealId: args.mealId,
                input: args.input
            });

            return actionResponse;
        },
        deleteDiet: async (_: any, args: any, context: any) => {
            const action = new DeleteDietAction();

            const { dietId } = args;

            return action.execute({ dietId });
        },
        deleteMeal: async (_: any, args: any, context: any) => {

            const action = new DeleteMealAction();

            const { dietId, mealId } = args;

            return action.execute({ dietId, mealId });
        },
        createWorkout: async (_: any, args: any, context: any) => {
            const { name, description } = args.input;
            const action = new CreateWorkoutAction();

            const actionResponse = await action.execute({
                name,
                description,
                addedBy: context.currentUser._id
            });

            return actionResponse;
        },
        updateWorkout: async (_: any, args: any, context: any) => {
            const action = new UpdateWorkoutAction();
            return await action.execute({
                workoutId: args.workoutId,
                input: args.input
            });
        },
        deleteWorkout: async (_: any, args: any, context: any) => {
            const action = new DeleteWorkoutAction();
            return await action.execute({ workoutId: args.workoutId });
        },
        addExercise: async (_: any, args: any, context: any) => {
            const action = new AddExerciseAction();
            return await action.execute({
                workoutId: args.workoutId,
                input: args.input
            });
        },
        updateExercise: async (_: any, args: any, context: any) => {
            const action = new UpdateExerciseAction();
            return await action.execute({
                workoutId: args.workoutId,
                exerciseId: args.exerciseId,
                input: args.input
            });
        },
        deleteExercise: async (_: any, args: any, context: any) => {
            const action = new DeleteExerciseAction();
            return await action.execute({
                workoutId: args.workoutId,
                exerciseId: args.exerciseId
            });
        },
        assignDiet: async (_: any, args: any, context: any) => {
            const action = new AssignDietAction();
            return await action.execute({
                dietId: args.dietId,
                clientId: args.clientId
            });
        },
        unassignDiet: async (_: any, args: any, context: any) => {
            const action = new UnassignDietAction();
            return await action.execute({
                clientId: args.clientId
            });
        }
    },
};
