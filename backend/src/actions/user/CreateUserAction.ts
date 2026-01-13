import ActionInterface from "../../interfaces/ActionInterface";
import { ValidationService } from "../../services/ValidationService";
import { createUserSchema } from '../../validations/userValidation';
import { z } from 'zod';
import { UserCreationFactory } from '../../factories/userCreationFactory/UserCreationFactory';

export default class CreateUserAction implements ActionInterface {
    private schema: z.ZodType<any>;

    constructor() {
        this.schema = createUserSchema;
    }

    async execute(payload: object): Promise<any> {

        try {
            const validatedData      = ValidationService.validate(this.schema, payload);
            const savedUser          = await UserCreationFactory.createUser(validatedData);

            return savedUser;

        } catch (error) {
            console.log(error.message);
            throw error;
        }
       
    }
}