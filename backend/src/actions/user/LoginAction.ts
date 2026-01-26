import ActionInterface from "../../interfaces/ActionInterface";
import { ValidationService } from "../../services/ValidationService";
import { z } from 'zod';
import { loginUserSchema } from '../../validations/loginValidation';
import { LoginFactory } from '../../factories/loginFactory/LoginFactory';

export default class LoginAction implements ActionInterface {
    private schema: z.ZodType<any>;

    constructor() {
        this.schema = loginUserSchema;
    }

    async execute(payload: object): Promise<any> {
        const validatedData = ValidationService.validate(this.schema, payload);
        const { email, password } = validatedData;
        return await LoginFactory.login(email, password);
    }
}