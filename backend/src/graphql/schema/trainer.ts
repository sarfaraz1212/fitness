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

  type Exercise {
    _id: ID!
    name: String!
    sets: Int!
    reps: Int!
    weight: Float
    duration: String
    restTime: String
    notes: String
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

  type Workout {
    _id: ID!
    addedBy: ID!
    name: String!
    description: String
    exercises: [Exercise!]!
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

  type PaginatedWorkoutsResponse {
    workouts: [Workout]
    total: Int
    totalPages: Int
    currentPage: Int
  }

  input FetchWorkoutsInput {
    page: Int
    limit: Int
    search: String
  }


  input CreateDietInput {
    name: String!
    description: String
  }

  input EditDietInput {
    name: String!
    description: String
  }

  input CreateWorkoutInput {
    name: String!
    description: String
  }

  input ExerciseInput {
    name: String!
    sets: Int!
    reps: Int!
    weight: Float
    duration: String
    restTime: String
    notes: String
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
    getDiets(input: FetchDietsInput): PaginatedDietsResponse!
    getMacros(name: String!): MacroResponse!
    getWorkouts(input: FetchWorkoutsInput): PaginatedWorkoutsResponse!
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
    createWorkout(input: CreateWorkoutInput!): Workout!
    updateWorkout(workoutId: String!, input: CreateWorkoutInput!): Workout!
    deleteWorkout(workoutId: String!): String!
    addExercise(workoutId: String!, input: ExerciseInput!): Workout!
    updateExercise(workoutId: String!, exerciseId: String!, input: ExerciseInput!): Workout!
    deleteExercise(workoutId: String!, exerciseId: String!): Workout!
  }
`;
