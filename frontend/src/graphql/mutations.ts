import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginUserInput!) {
    login(input: $input) {
      token
      user {
        id
        name
        email
        role
        is_verified
        is_onboarded
      }
    }
  }
`;

export const CREATE_CLIENT_MUTATION = gql`
  mutation Mutation($input: CreateClientInput!) {
    createClient(input: $input) {
      name
    }
  }
`;

export const CREATE_ONBOARDING_MUTATION = gql`
  mutation CreateOnboarding($input: CreateOnboardingInput!) {
    createOnboarding(input: $input) {
      name
    }
  }
`;

export const CREATE_DIET_MUTATION = gql`
  mutation Mutation($input: CreateDietInput!) {
    createDiet(input: $input) {
      _id
      name
    }
  }
`;

export const CREATE_MEAL_MUTATION = gql`
  mutation CreateMeal($input: MealInput!, $dietId: String!) {
    createMeal(input: $input, dietId: $dietId) {
      _id
      name
      description
      time
      calories
      protein
      carbs
      fats
    }
  }
`;

export const DELETE_MEAL = gql`
  mutation DeleteMeal($dietId: String!, $mealId: String!) {
    deleteMeal(dietId: $dietId, mealId: $mealId) {
      dietId
      mealId
    }
  }
`;

export const EDIT_MEAL_MUTATION = gql`
  mutation EditMeal($dietId: String!, $mealId: String!, $input: MealInput!) {
    editMeal(dietId: $dietId, mealId: $mealId, input: $input) {
      _id
      name
      description
      time
      calories
      protein
      carbs
      fats
    }
  }
`;

export const EDIT_DIET_MUTATION = gql`
  mutation EditDiet($dietId: String!, $input: EditDietInput!) {
    editDiet(dietId: $dietId, input: $input) {
      _id
      name
      description
    }
  }
`;

export const DELETE_DIET = gql`
  mutation Mutation($dietId: String!) {
    deleteDiet(dietId: $dietId)
  }
`;

export const CREATE_WORKOUT_MUTATION = gql`
  mutation CreateWorkout($input: CreateWorkoutInput!) {
    createWorkout(input: $input) {
      _id
      name
      description
      createdAt
    }
  }
`;

export const UPDATE_WORKOUT_MUTATION = gql`
  mutation UpdateWorkout($workoutId: String!, $input: CreateWorkoutInput!) {
    updateWorkout(workoutId: $workoutId, input: $input) {
      _id
      name
      description
    }
  }
`;

export const DELETE_WORKOUT_MUTATION = gql`
  mutation DeleteWorkout($workoutId: String!) {
    deleteWorkout(workoutId: $workoutId)
  }
`;

export const ADD_EXERCISE_MUTATION = gql`
  mutation AddExercise($workoutId: String!, $input: ExerciseInput!) {
    addExercise(workoutId: $workoutId, input: $input) {
      _id
      exercises {
        _id
        name
        sets
        reps
        weight
        duration
        restTime
        notes
      }
    }
  }
`;

export const UPDATE_EXERCISE_MUTATION = gql`
  mutation UpdateExercise($workoutId: String!, $exerciseId: String!, $input: ExerciseInput!) {
    updateExercise(workoutId: $workoutId, exerciseId: $exerciseId, input: $input) {
      _id
      exercises {
        _id
        name
        sets
        reps
        weight
        duration
        restTime
        notes
      }
    }
  }
`;

export const DELETE_EXERCISE_MUTATION = gql`
  mutation DeleteExercise($workoutId: String!, $exerciseId: String!) {
    deleteExercise(workoutId: $workoutId, exerciseId: $exerciseId) {
      _id
      exercises {
        _id
      }
    }
  }
`;

export const ASSIGN_DIET_MUTATION = gql`
  mutation AssignDiet($dietId: String!, $clientId: String!) {
    assignDiet(dietId: $dietId, clientId: $clientId) {
      _id
      name
      description
      meals {
        _id
        name
        calories
      }
    }
  }
`;

export const UNASSIGN_DIET_MUTATION = gql`
  mutation UnassignDiet($clientId: String!) {
    unassignDiet(clientId: $clientId) {
      id
      name
    }
  }
`;


export const CREATE_DIET_PLAN_MUTATION = gql`
  mutation CreateDietPlan($input: CreateDietInput!) {
    createDiet(input: $input) {  
      _id
    }
  }
`; 