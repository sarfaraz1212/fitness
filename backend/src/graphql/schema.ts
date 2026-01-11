import { mergeTypeDefs } from '@graphql-tools/merge';
import { userTypeDefs } from './schema/user';

export const typeDefs = mergeTypeDefs([userTypeDefs]);