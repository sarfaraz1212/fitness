import { z } from "zod";

export const createUserSchema = z.object({
  email: z.email(),
  password: z.string().nullable(),
  name: z.string().min(1),
  assigned_trainer: z.string().optional(),
  role: z.enum(["CLIENT", "TRAINER"]).optional(),
});

