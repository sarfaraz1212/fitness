"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    email: zod_1.z.email(),
    name: zod_1.z.string().min(1),
    password: zod_1.z.string().min(8),
});
