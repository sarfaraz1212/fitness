import { startApolloServer } from './app';
import { connectDB } from './config/database';
import { env } from './config/env';

const startServer = async () => {
  await connectDB();

  const app = await startApolloServer();

  app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}/graphql`);
  });
};

startServer().catch((error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});