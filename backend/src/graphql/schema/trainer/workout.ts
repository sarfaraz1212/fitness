import { gql } from "graphql-tag";

export const workoutTypeDefs = gql`
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

  type PaginatedWorkoutsResponse {
    workouts: [Workout]
    total: Int
    totalPages: Int
    currentPage: Int
  }

  type Query {
    getWorkouts(input: FetchWorkoutsInput): PaginatedWorkoutsResponse!
  }

  type Mutation {
    createWorkout(input: CreateWorkoutInput!): Workout!
    updateWorkout(workoutId: String!, input: CreateWorkoutInput!): Workout!
    deleteWorkout(workoutId: String!): String!
    addExercise(workoutId: String!, input: ExerciseInput!): Workout!
    updateExercise(workoutId: String!, exerciseId: String!, input: ExerciseInput!): Workout!
    deleteExercise(workoutId: String!, exerciseId: String!): Workout!
  }

  input FetchWorkoutsInput {
    page: Int
    limit: Int
    search: String
  }

  input CreateWorkoutInput {
    name: String!
    description: String
    exercises: [ExerciseInput!]
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
`,