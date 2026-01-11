import { gql } from 'graphql-tag';

export const userTypeDefs = gql`
  enum Role {
    TRAINER
    CLIENT
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: Role!
    is_verified: Boolean!
    is_onboarded: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    name: String
    email: String
    role: Role
  }

  input LoginUserInput {
    email: String!
    password: String!
    role: Role!
  }

  input CreateClientInput {
    name: String!
    email: String!
    assigned_trainer: ID
    role: Role = CLIENT
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    createClient(input: CreateClientInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): Boolean!
    login(input: LoginUserInput!): AuthPayload
  }
`;