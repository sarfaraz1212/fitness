import { gql } from "graphql-tag";

export const dietTypeDefs = gql`
  type Nutrient {
    name: String!
    amount: String!
  }

  input NutrientInput {
    name: String!
    amount: String!
  }

  type Meal {
    _id: ID!
    name: String!
    description: String
    time: String!
    calories: Float!
    protein: Float!
    carbs: Float!
    fats: Float!
    vitamins: [Nutrient!]!
    minerals: [Nutrient!]!
    createdAt: String!
    updatedAt: String!
  }

  input MealInput {
    name: String!
    description: String
    time: String!
    calories: Float!
    protein: Float!
    carbs: Float!
    fats: Float!
    vitamins: [NutrientInput!]!
    minerals: [NutrientInput!]!
  }

  type DietDay {
    dayId: String!
    dayLabel: String!
    meals: [Meal!]!
  }

  input DietDayInput {
    dayId: String!
    dayLabel: String!
    meals: [MealInput!]!
  }

  type Diet {
    _id: ID!
    client: ID
    name: String!
    description: String
    days: [DietDay!]!
    createdAt: String!
    updatedAt: String!
  }

  type PaginatedDietsResponse {
    diets: [Diet]
    total: Int
    totalPages: Int
    currentPage: Int
  }

  input FetchDietsInput {
    page: Int
    limit: Int
    search: String
    sortBy: String
  }

  input CreateDietInput {
    clientId: ID!
    planName: String!
    assignNow: Boolean!
    days: [DietDayInput!]!
  }

  input EditDietInput {
    name: String!
    description: String
  }

  type DeleteMealResponse {
    dietId: String!
    mealId: String!
  }

  type MacroResponse {
    name: String!
    calories: Float!
    protein: Float!
    carbs: Float!
    fats: Float!
    vitamins: [Nutrient!]!
    minerals: [Nutrient!]!
  }

  type Query {
    getDiets(input: FetchDietsInput): PaginatedDietsResponse!
    getMacros(name: String!): MacroResponse!
  }

  type Mutation {
    createDiet(input: CreateDietInput!): Diet!
    editDiet(dietId: String!, input: EditDietInput!): Diet!
    deleteDiet(dietId: String!): ID!

    createMeal(input: MealInput!, dietId: String!): Meal!
    editMeal(dietId: String!, mealId: String!, input: MealInput!): Meal!
    deleteMeal(dietId: String!, mealId: String!): DeleteMealResponse!
    assignDiet(dietId: String!, clientId: String!): Diet!
    unassignDiet(clientId: String!): User!
  }
`,