import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { authContext } from './middleware/authContext';


const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authContext
});

export const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app: app as any, cors: true });

  return app;
};

export default app;