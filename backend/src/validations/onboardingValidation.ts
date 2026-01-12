import { z } from "zod";

export const createOnboardingSchema = z.object({
  token: z.string().min(1, "Token is required"),
  dob: z.string().min(1, "Date of birth is required"),
  age: z.number().int().min(13, "Age must be at least 13").max(120, "Age must be at most 120"),
  gender: z.string().min(1, "Gender is required"),
  bloodGroup: z.string().min(1, "Blood group is required"),
  dietPreference: z.string().min(1, "Diet preference is required"),
  fitnessGoals: z.array(z.string()).min(1, "At least one fitness goal is required"),
  weight: z.number().min(20, "Weight must be at least 20 kg").max(300, "Weight must be at most 300 kg"),
  height: z.number().min(100, "Height must be at least 100 cm").max(250, "Height must be at most 250 cm"),
  bodyFat: z.number().min(3).max(60).optional().nullable(),
  bmi: z.number().min(10).max(50).optional().nullable(),
  fitnessLevel: z.string().min(1, "Fitness level is required"),
  stressLevel: z.string().min(1, "Stress level is required"),
  exerciseFrequency: z.string().optional().nullable(),
  sleepHours: z.string().optional().nullable(),
  smokingFrequency: z.string().optional().nullable(),
  alcoholFrequency: z.string().optional().nullable(),
  trainingTime: z.string().min(1, "Training time is required"),
  workEnvironment: z.string().min(1, "Work environment is required"),
  medicalConditions: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  profileImage: z.string().optional().nullable(),
});

