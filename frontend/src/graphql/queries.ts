import { gql } from '@apollo/client';

export const GET_CLIENTS_QUERY = gql`
  query getClients($page: Int, $limit: Int, $search: String, $status: String) {
    getClients(page: $page, limit: $limit, search: $search, status: $status) {
      clients {
        id
        name
        email
        onboarding {
          fitness_goals
          profile_image
        }
      }
      total
      totalPages
      currentPage
    }
  }
`;
