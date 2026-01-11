"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationService_1 = require("../../services/ValidationService");
const userValidation_1 = require("../../validations/userValidation");
const DispatchOnboardingService_1 = require("../../services/DispatchOnboardingService");
const UserCreationFactory_1 = require("../../factories/userCreationFactory/UserCreationFactory");
class CreateClientAction {
    schema;
    onboardingService;
    constructor() {
        this.schema = userValidation_1.createUserSchema;
        this.onboardingService = new DispatchOnboardingService_1.DispatchOnboardingService();
    }
    async execute(payload) {
        const validatedData = ValidationService_1.ValidationService.validate(this.schema, payload);
        const savedUser = await UserCreationFactory_1.UserCreationFactory.createUser(validatedData);
        const onboardingResponse = await this.onboardingService.dispatch(savedUser);
        if (!onboardingResponse.success) {
            console.error('Onboarding dispatch failed:', onboardingResponse.error);
        }
        return savedUser;
    }
}
exports.default = CreateClientAction;
