"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../../config/env");
class TrainerLogin {
    async login(user, password) {
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, env_1.env.JWT_SECRET, { expiresIn: '1h' });
        return { token, user };
    }
}
exports.TrainerLogin = TrainerLogin;
