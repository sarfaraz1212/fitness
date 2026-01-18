import { gql } from 'graphql-tag';

export const clientTypeDefs = gql`
  type Query {
    checkDailyWeightIn: Boolean!
  }

  type Mutation {
    remindWeightIn(minutesFromNow: Int! = 10): Boolean!
  }
`;
