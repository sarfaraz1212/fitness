import { gql } from '@apollo/client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  is_verified: boolean;
  is_onboarded: boolean;
}

export interface LoginData {
  login: {
    token: string;
    user: User;
  };
}

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