import { mergeTypeDefs } from '@graphql-tools/merge';
import { onboardingTypeDefs } from './schema/client/onboarding';
import { userTypeDefs } from './schema/admin/admin';
import { dietTypeDefs } from './schema/trainer/diet';
import { workoutTypeDefs } from './schema/trainer/workout';
import { clientTypeDefs } from './schema/trainer/client';

export const typeDefs = mergeTypeDefs([
	userTypeDefs,
	onboardingTypeDefs,
	dietTypeDefs,
	workoutTypeDefs,
	clientTypeDefs
]);