"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientCreation = void 0;
const User_1 = __importDefault(require("../../../models/User"));
const DispatchOnboardingService_1 = require("../../../services/DispatchOnboardingService");
class ClientCreation {
    onboardingService;
    constructor() {
        this.onboardingService = new DispatchOnboardingService_1.DispatchOnboardingService();
    }
    async create(data) {
        const user = new User_1.default({ ...data, role: 'CLIENT' });
        const savedUser = await user.save();
        const onboardingResponse = await this.onboardingService.dispatch(savedUser);
        if (!onboardingResponse.success) {
            console.error('Onboarding dispatch failed:', onboardingResponse.error);
        }
        return savedUser;
    }
}
exports.ClientCreation = ClientCreation;
