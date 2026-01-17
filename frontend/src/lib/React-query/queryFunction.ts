import { client } from '@/lib/apollo';
import { GET_CLIENTS_QUERY, GET_DIETS_QUERY } from '@/graphql/queries';

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
    
    return data?.getClients ?? {
        clients: [],
        total: 0,
        totalPages: 0,
        currentPage: params.page || 1,
      };
};

export const fetchDiets = async (): Promise<any> => {

    const { data } = await client.query({
        query: GET_DIETS_QUERY,
        fetchPolicy: 'network-only',
    });
    
    return data.getDiets;
};