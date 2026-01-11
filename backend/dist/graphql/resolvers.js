"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const user_1 = require("./resolvers/user");
exports.resolvers = {
    ...user_1.userResolvers,
};
