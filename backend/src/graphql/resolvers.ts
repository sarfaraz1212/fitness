import { adminResolvers } from './resolvers/admin/admin';
import { trainerClientResolvers } from './resolvers/trainer/client';
import { trainerDietResolvers } from './resolvers/trainer/diet';
import { trainerMealResolvers } from './resolvers/trainer/meal';
import { trainerWorkoutResolvers } from './resolvers/trainer/workout';
import { clientOnboardingResolvers } from './resolvers/client/onboarding';
import { mergeResolvers } from '@graphql-tools/merge';

export const resolvers = mergeResolvers([
  adminResolvers,
  trainerClientResolvers,
  trainerDietResolvers,
  trainerMealResolvers,
  trainerWorkoutResolvers,
  clientOnboardingResolvers,
]);