"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginFactory = void 0;
const User_1 = __importDefault(require("../../models/User"));
const AdminLogin_1 = require("./concrete/AdminLogin");
const TrainerLogin_1 = require("./concrete/TrainerLogin");
const ClientLogin_1 = require("./concrete/ClientLogin");
class LoginFactory {
    static async login(email, password, role) {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        if (user.role !== role) {
            throw new Error('Role mismatch');
        }
        let handler;
        switch (user.role) {
            case 'ADMIN':
                handler = new AdminLogin_1.AdminLogin();
                break;
            case 'TRAINER':
                handler = new TrainerLogin_1.TrainerLogin();
                break;
            case 'CLIENT':
                handler = new ClientLogin_1.ClientLogin();
                break;
            default:
                throw new Error('Invalid role');
        }
        return await handler.login(user, password);
    }
}
exports.LoginFactory = LoginFactory;
