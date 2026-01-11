"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerCreation = void 0;
const User_1 = __importDefault(require("../../../models/User"));
class TrainerCreation {
    async create(data) {
        const user = new User_1.default({ ...data, role: 'TRAINER' });
        return await user.save();
    }
}
exports.TrainerCreation = TrainerCreation;
