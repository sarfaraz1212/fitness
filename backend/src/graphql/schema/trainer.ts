import { gql } from "graphql-tag";

export const trainerTypeDefs = gql`

  type Meal {
    _id: ID!
    name: String!
    description: String
    time: String!
    calories: Float!
    protein: Float!
    carbs: Float!
    fats: Float!
  }

  input MealInput {
    name: String!
    description: String
    time: String!
    calories: Float!
    protein: Float!
    carbs: Float!
    fats: Float!
  }


  type Diet {
    _id: ID!
    addedBy: ID!
    name: String!
    description: String
    meals: [Meal!]!
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


  input CreateDietInput {
    name: String!
    description: String
  }

  input EditDietInput {
    name: String!
    description: String
  }

  type MacroResponse {
    name: String!
    calories: Float!
    protein: Float!
    carbs: Float!
    fats: Float!
  }



  type Query {
    getClients(input: FetchClientsInput): PaginatedClientsResponse
    getDiets: [Diet!]!
    getMacros(name: String!): MacroResponse!
  }

  type DeleteMealResponse{
    dietId: String!
    mealId: String!
  }

  type Mutation {
    createDiet(input: CreateDietInput!): Diet!
    editDiet(dietId: String!, input: EditDietInput!): Diet!
    deleteDiet(dietId:String!): ID!
    createMeal(dietId:String! ,input: MealInput!): Meal!
    editMeal(dietId: String!, mealId: String!, input: MealInput!): Meal!
    deleteMeal(dietId: String!, mealId: String!): DeleteMealResponse!
  }
`;
