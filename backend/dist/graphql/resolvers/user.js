"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
const CreateUserAction_1 = __importDefault(require("../../actions/user/CreateUserAction"));
const LoginAction_1 = __importDefault(require("../../actions/user/LoginAction"));
const User_1 = __importDefault(require("../../models/User"));
exports.userResolvers = {
    Query: {
        users: async () => {
            return await User_1.default.find();
        },
        user: async (_, { id }) => {
            return await User_1.default.findById(id);
        },
    },
    Mutation: {
        createUser: async (_, { input }) => {
            const action = new CreateUserAction_1.default();
            return await action.execute(input);
        },
        updateUser: async (_, { id, input }) => {
            const { name, email, role } = input;
            if (role === 'ADMIN') {
                throw new Error('Cannot set role to ADMIN');
            }
            return await User_1.default.findByIdAndUpdate(id, { name, email, role }, { new: true });
        },
        deleteUser: async (_, { id }) => {
            const result = await User_1.default.findByIdAndDelete(id);
            return !!result;
        },
        login: async (_, { input }) => {
            const action = new LoginAction_1.default();
            return await action.execute(input);
        },
    },
};
