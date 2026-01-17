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
  mutation CreateMeal($dietId: String!, $input: MealInput!) {
    createMeal(dietId: $dietId, input: $input) {
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