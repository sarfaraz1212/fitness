"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startApolloServer = void 0;
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("./graphql/schema");
const resolvers_1 = require("./graphql/resolvers");
const app = (0, express_1.default)();
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: resolvers_1.resolvers,
});
const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app: app, cors: true });
    return app;
};
exports.startApolloServer = startApolloServer;
exports.default = app;
