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

