import { gql } from 'graphql-tag';

export const clientTypeDefs = gql`
  enum WeightMetric {
    KG
    LBS
  }

  type DailyWeightRecord {
    _id: ID
    user_id: String
    weight: Float
    unit: WeightMetric
    date: String
    updatedAt: String
  }

  type Query {
    getDailyWeight: DailyWeightRecord
    getAssignedDietPlan: Boolean
  }

  input logDailyWeightInMutationInput {
    weight: Float!
    unit: WeightMetric!
  }

  input updateDailyWeightInMutationInput {
    date: String!
    weight: Float!
    unit: WeightMetric!
  }

  type Mutation {
    logDailyWeightIn(input: logDailyWeightInMutationInput!): DailyWeightRecord!
    updateDailyWeightIn(input: updateDailyWeightInMutationInput!): DailyWeightRecord!
  }
`;
