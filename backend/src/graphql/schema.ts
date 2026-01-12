import { mergeTypeDefs } from '@graphql-tools/merge';
import { userTypeDefs } from './schema/user';
import { onboardingTypeDefs } from './schema/onboarding';
import { trainerTypeDefs } from './schema/trainer';

export const typeDefs = mergeTypeDefs([userTypeDefs, onboardingTypeDefs, trainerTypeDefs]); 