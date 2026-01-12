import { userResolvers } from './resolvers/user';
import { onboardingResolvers } from './resolvers/onboarding';
import { mergeResolvers } from '@graphql-tools/merge';
import { trainerResolvers } from './resolvers/trainer';

export const resolvers = mergeResolvers([
  userResolvers,
  onboardingResolvers,
  trainerResolvers,
]);