import { gql } from 'graphql-tag';

export const trainerTypeDefs = gql`
  type PaginatedClientsResponse {
    clients: [User]
    total: Int
    totalPages: Int
    currentPage: Int
  }

  type Query {
    getClients(page: Int, limit: Int, search: String, status: String): PaginatedClientsResponse
  }

  type Mutation {
    dummyAction(input: String!): String
  }
`;
