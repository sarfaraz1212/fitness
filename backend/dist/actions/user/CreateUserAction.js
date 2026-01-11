"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationService_1 = require("../../services/ValidationService");
const userValidation_1 = require("../../validations/userValidation");
const UserCreationFactory_1 = require("../../factories/userCreationFactory/UserCreationFactory");
class CreateUserAction {
    schema;
    constructor() {
        this.schema = userValidation_1.createUserSchema;
    }
    async execute(payload) {
        const validatedData = ValidationService_1.ValidationService.validate(this.schema, payload);
        const savedUser = await UserCreationFactory_1.UserCreationFactory.createUser(validatedData);
        return savedUser;
    }
}
exports.default = CreateUserAction;
