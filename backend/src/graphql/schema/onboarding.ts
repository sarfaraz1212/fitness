import { gql } from 'graphql-tag';

export const onboardingTypeDefs = gql`
  enum Role {
    TRAINER
    CLIENT
  }

  type Onboarding {
    id: ID!
    user_id: ID!
    token: String!
    expires_at: String!
    status: String!
    dob: String
    age: Int
    gender: String
    blood_group: String
    weight: Float
    height: Float
    target_weight: Float
    body_fat: Float
    bmi: Float
    fitness_level: String
    exercise_frequency: Int
    sleep_hours: Int
    smoking_frequency: String
    alcohol_frequency: String
    stress_level: String
    training_time: String
    work_environment: String
    medical_conditions: String
    notes: String
    diet_preferences: String
    fitness_goals: [String]
    address: String
    phone_number: String
    date_of_birth: String
    profile_image: String
    createdAt: String!
    updatedAt: String!
  }

  input CreateOnboardingInput {
    token: String!
    dob: String!
    age: Int!
    gender: String!
    bloodGroup: String!
    dietPreference: String!
    fitnessGoals: [String!]!
    weight: Float!
    height: Float!
    bodyFat: Float
    bmi: Float
    fitnessLevel: String!
    stressLevel: String!
    exerciseFrequency: String
    sleepHours: String
    smokingFrequency: String
    alcoholFrequency: String
    trainingTime: String!
    workEnvironment: String!
    medicalConditions: String
    notes: String
    profileImage: String
  }

  type Query {
    getOnboarding(id: ID!): Onboarding
  }

  type dummyOnboarding {
    name: String!
  }

  type Mutation {
    createOnboarding(input: CreateOnboardingInput!): dummyOnboarding!
  }

 
`;