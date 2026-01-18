import { client } from '@/lib/apollo';
import {
     GET_CLIENTS_QUERY, 
     GET_DIETS_QUERY, 
     GET_WORKOUTS_QUERY, 
     GET_USER_QUERY as GET_CLIENT_QUERY,
     DAILY_WEIGHT_CHECK_QUERY 
} from '@/graphql/queries';
import { ASSIGN_DIET_MUTATION, CREATE_DIET_MUTATION, UNASSIGN_DIET_MUTATION } from '@/graphql/mutations';

export interface FetchClientsParams {
    page?: number;
    limit?: number;
    search?: string;
    onboardingFilter?: boolean | null;
}

export const fetchClients = async (params: FetchClientsParams = {}): Promise<any> => {
    const { data } = await client.query({
        query: GET_CLIENTS_QUERY,
        variables: { input: params },
        fetchPolicy: 'network-only',
    });

    return (data as any)?.getClients ?? {
        clients: [],
        total: 0,
        totalPages: 0,
        currentPage: params.page || 1,
    };
};

export interface FetchDietsParams {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
}

export const fetchDiets = async (params: FetchDietsParams = {}): Promise<any> => {
    const response = await client.query({
        query: GET_DIETS_QUERY,
        variables: { input: params },
        fetchPolicy: 'network-only',
    });

    return (response.data as any)?.getDiets ?? {
        diets: [],
        total: 0,
        totalPages: 0,
        currentPage: params.page || 1,
    };
};

export interface FetchWorkoutsParams {
    page?: number;
    limit?: number;
    search?: string;
}

export const fetchWorkouts = async (params: FetchWorkoutsParams = {}): Promise<any> => {
    const response = await client.query({
        query: GET_WORKOUTS_QUERY,
        variables: { input: params },
        fetchPolicy: 'network-only',
    });

    return (response.data as any)?.getWorkouts ?? {
        workouts: [],
        total: 0,
        totalPages: 0,
        currentPage: params.page || 1,
    };
};

export const fetchClient = async (id: string): Promise<any> => {
    const { data } = await client.query({
        query: GET_CLIENT_QUERY,
        variables: { userId: id },
        fetchPolicy: 'network-only',
    });

    return (data as any)?.user;
};

export const assignDiet = async (dietId: string, clientId: string): Promise<any> => {
    const { data } = await client.mutate({
        mutation: ASSIGN_DIET_MUTATION,
        variables: { dietId, clientId },
    });

    return (data as any)?.assignDiet;
};

export const createDiet = async (input: { name: string; description?: string }): Promise<any> => {
    const { data } = await client.mutate({
        mutation: CREATE_DIET_MUTATION,
        variables: { input },
    });

    return (data as any)?.createDiet;
};

export const unassignDiet = async (clientId: string): Promise<any> => {
    const { data } = await client.mutate({
        mutation: UNASSIGN_DIET_MUTATION,
        variables: { clientId },
    });

    return (data as any)?.unassignDiet;
};

