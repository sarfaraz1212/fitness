"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationService = void 0;
const error_1 = require("graphql/error");
class ValidationService {
    static validate(schema, payload) {
        const parsed = schema.safeParse(payload);
        if (!parsed.success) {
            const formattedErrors = parsed.error.flatten();
            throw new error_1.GraphQLError("Validation failed", {
                extensions: {
                    code: "BAD_USER_INPUT",
                    errors: formattedErrors.fieldErrors,
                },
            });
        }
        return parsed.data;
    }
}
exports.ValidationService = ValidationService;
