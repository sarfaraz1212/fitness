import { gql } from "graphql-tag";

export const clientTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    role: Role!
    is_verified: Boolean!
    is_onboarded: Boolean!
    onboarding: Onboarding
    assigned_diet: Diet
    createdAt: String!
    updatedAt: String!
  }

  type PaginatedClientsResponse {
    clients: [User]
    total: Int
    totalPages: Int
    currentPage: Int
  }

  input FetchClientsInput {
    page: Int
    limit: Int
    search: String
    status: String
    onboardingFilter: Boolean
  }

  type Query {
    getClients(input: FetchClientsInput): PaginatedClientsResponse
  }
`,