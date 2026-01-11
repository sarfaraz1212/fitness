"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationService_1 = require("../../services/ValidationService");
const loginValidation_1 = require("../../validations/loginValidation");
const LoginFactory_1 = require("../../factories/loginFactory/LoginFactory");
class LoginAction {
    schema;
    constructor() {
        this.schema = loginValidation_1.loginUserSchema;
    }
    async execute(payload) {
        const validatedData = ValidationService_1.ValidationService.validate(this.schema, payload);
        const { email, password, role } = validatedData;
        return await LoginFactory_1.LoginFactory.login(email, password, role);
    }
}
exports.default = LoginAction;
