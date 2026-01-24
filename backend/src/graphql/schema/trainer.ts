import { gql } from "graphql-tag";

export const trainerTypeDefs = gql`
  """
  =====================
  MEAL
  =====================
  """
  type Meal {
    _id: ID!
    name: String!
    description: String
    time: String!
    calories: Float!
    protein: Float!
    carbs: Float!
    fats: Float!
    addedBy: ID!
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
  }

  """
  =====================
  DIET DAY
  =====================
  """
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

  """
  =====================
  DIET
  =====================
  """
  type Diet {
    _id: ID!
    addedBy: ID!
    client: ID
    name: String!
    description: String
    days: [DietDay!]!
    createdAt: String!
    updatedAt: String!
  }

  """
  =====================
  WORKOUT
  =====================
  """
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

  type Workout {
    _id: ID!
    addedBy: ID!
    name: String!
    description: String
    exercises: [Exercise!]!
    createdAt: String!
    updatedAt: String!
  }

  """
  =====================
  PAGINATION
  =====================
  """
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

  """
  =====================
  INPUTS
  =====================
  """
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

  """
  =====================
  OTHER TYPES
  =====================
  """
  type MacroResponse {
    name: String!
    calories: Float!
    protein: Float!
    carbs: Float!
    fats: Float!
  }

  type DeleteMealResponse {
    dietId: String!
    mealId: String!
  }

  """
  =====================
  QUERIES
  =====================
  """
  type Query {
    getClients(input: FetchClientsInput): PaginatedClientsResponse
    getDiets(input: FetchDietsInput): PaginatedDietsResponse!
    getMacros(name: String!): MacroResponse!
    getWorkouts(input: FetchWorkoutsInput): PaginatedWorkoutsResponse!
  }

  """
  =====================
  MUTATIONS
  =====================
  """
  type Mutation {
    createDiet(input: CreateDietInput!): Diet!
    editDiet(dietId: String!, input: EditDietInput!): Diet!
    deleteDiet(dietId: String!): ID!

    createMeal(input: MealInput!, dietId: String!): Meal!
    editMeal(dietId: String!, mealId: String!, input: MealInput!): Meal!
    deleteMeal(dietId: String!, mealId: String!): DeleteMealResponse!

    createWorkout(input: CreateWorkoutInput!): Workout!
    updateWorkout(workoutId: String!, input: CreateWorkoutInput!): Workout!
    deleteWorkout(workoutId: String!): String!

    addExercise(workoutId: String!, input: ExerciseInput!): Workout!
    updateExercise(
      workoutId: String!
      exerciseId: String!
      input: ExerciseInput!
    ): Workout!
    deleteExercise(workoutId: String!, exerciseId: String!): Workout!

    assignDiet(dietId: String!, clientId: String!): Diet!
    unassignDiet(clientId: String!): User!
  }
`;
