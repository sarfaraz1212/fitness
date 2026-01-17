import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 4000,
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:8080",
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/node-graphql",
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
  GEMINI_API_KEY : process.env.GEMINI_API_KEY ,
};
