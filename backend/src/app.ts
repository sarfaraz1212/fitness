import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app: app as any, cors: true });

  return app;
};

export default app;