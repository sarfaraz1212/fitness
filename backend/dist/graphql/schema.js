"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const merge_1 = require("@graphql-tools/merge");
const user_1 = require("./schema/user");
exports.typeDefs = (0, merge_1.mergeTypeDefs)([user_1.userTypeDefs]);
