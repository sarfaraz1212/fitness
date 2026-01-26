import { GraphQLError } from 'graphql';

export function requireTrainer<T extends (...args: any[]) => any>(resolver: T): T {
  return (async function(parent, args, context, info) {
    if (!context.currentUser) {
      throw new GraphQLError('Authentication required', {
        extensions: { code: 'UNAUTHENTICATED' }
      });
    }
    if (context.currentUser.role !== 'TRAINER') {
      throw new GraphQLError('Forbidden: Trainer role required', {
        extensions: { code: 'FORBIDDEN' }
      });
    }
    return resolver(parent, args, context, info);
  }) as T;
}
