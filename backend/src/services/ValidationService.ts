import { GraphQLError } from "graphql/error";
import { z } from "zod";

export class ValidationService {
    static validate<T>(schema: z.ZodType<T>, payload: unknown): T {
        const parsed = schema.safeParse(payload);

        if (!parsed.success) {
            const formattedErrors = parsed.error.flatten();
            throw new GraphQLError("Validation failed", {
                extensions: {
                    code: "BAD_USER_INPUT",
                    errors: formattedErrors.fieldErrors,
                },
            });
        }

        return parsed.data;
    }
}