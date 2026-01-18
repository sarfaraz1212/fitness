import { mergeTypeDefs } from '@graphql-tools/merge';
import { userTypeDefs } from './schema/user';
import { onboardingTypeDefs } from './schema/onboarding';
import { trainerTypeDefs } from './schema/trainer';
import { clientTypeDefs } from "./schema/client";

export const typeDefs = mergeTypeDefs([userTypeDefs, onboardingTypeDefs, trainerTypeDefs, clientTypeDefs]); 