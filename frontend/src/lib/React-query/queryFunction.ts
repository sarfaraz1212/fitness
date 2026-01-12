import { client } from '@/lib/apollo';
import { GET_CLIENTS_QUERY } from '@/graphql/queries';
import type { User } from '@/graphql/types';

export interface FetchClientsParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
}

export const fetchClients = async (params: FetchClientsParams = {}): Promise<any> => {
    const { data } = await client.query({
        query: GET_CLIENTS_QUERY,
        variables: params,
        fetchPolicy: 'network-only',
    });
    return data?.getClients;
};