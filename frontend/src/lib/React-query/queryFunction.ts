import { client } from '@/lib/apollo';
import { GET_CLIENTS_QUERY, GET_DIETS_QUERY, GET_WORKOUTS_QUERY } from '@/graphql/queries';

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