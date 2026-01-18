import { gql } from '@apollo/client';

export const GET_CLIENTS_QUERY = gql`
  query getClients($input: FetchClientsInput) {
    getClients(input: $input) {
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

export const GET_DIETS_QUERY = gql`
  query GetDiets($input: FetchDietsInput) {
    getDiets(input: $input) {
      diets {
        name
        meals {
          time
          protein
          name
          fats
          description
          carbs
          calories
          _id
        }
        description
        _id
      }
      total
      totalPages
      currentPage
    }
  }
`;

export const GET_MACROS_QUERY = gql`
  query GetMacros($name: String!) {
    getMacros(name: $name) {
      name
      calories
      protein
      carbs
      fats
    }
  }
`;

export const GET_WORKOUTS_QUERY = gql`
  query GetWorkouts($input: FetchWorkoutsInput) {
    getWorkouts(input: $input) {
      workouts {
        _id
        name
        description
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
        createdAt
      }
      total
      totalPages
      currentPage
    }
  }
`;


export const GET_USER_QUERY = gql`
  query Query($userId: ID!) {
    user(id: $userId) {
      id
      email
      createdAt
      name
      onboarding {
        id
        age
        alcohol_frequency
        blood_group
        bmi
        body_fat
        createdAt
        diet_preferences
        dob
        exercise_frequency
        expires_at
        fitness_goals
        fitness_level
        gender
        height
        medical_conditions
        notes
        profile_image
        sleep_hours
        smoking_frequency
        status
        stress_level
        training_time
        updatedAt
        weight
        work_environment
        address
        phone_number
        date_of_birth
        target_weight
      }
      assigned_diet {
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
  }
`;
