import { z } from 'zod';

// Helper function to calculate age from DOB
const calculateAge = (dob: string): number => {
  if (!dob) return 0;
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Step 1: Personal Information
export const personalInformationSchema = z.object({
  dob: z.string()
    .min(1, 'Date of birth is required')
    .refine((dob) => {
      const age = calculateAge(dob);
      return age >= 13;
    }, {
      message: 'You must be at least 13 years old'
    })
    .refine((dob) => {
      const age = calculateAge(dob);
      return age <= 120;
    }, {
      message: 'Please enter a valid date of birth'
    }),
  gender: z.string().min(1, 'Gender is required'),
  bloodGroup: z.string().min(1, 'Blood group is required'),
});

// Step 2: Body Metrics
export const bodyMetricsSchema = z.object({
  weight: z.string()
    .min(1, 'Weight is required')
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 20 && num <= 300;
    }, {
      message: 'Weight must be between 20 and 300 kg'
    }),
  height: z.string()
    .min(1, 'Height is required')
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 100 && num <= 250;
    }, {
      message: 'Height must be between 100 and 250 cm'
    }),
  bodyFat: z.string().refine((val) => {
    if (!val || val === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 3 && num <= 60;
  }, {
    message: 'Body fat must be between 3% and 60%'
  }),
  bmi: z.string().refine((val) => {
    if (!val || val === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 10 && num <= 50;
  }, {
    message: 'BMI must be between 10 and 50'
  }),
});

// Step 3: Diet & Goals
export const dietGoalsSchema = z.object({
  dietPreference: z.string().min(1, 'Diet preference is required'),
  fitnessGoals: z.array(z.string())
    .min(1, 'Please select at least one fitness goal'),
});

// Step 4: Activity & Lifestyle
export const activityLifestyleSchema = z.object({
  fitnessLevel: z.string().min(1, 'Fitness level is required'),
  exerciseFrequency: z.string().refine((val) => {
    if (!val || val === '') return true;
    const num = parseInt(val);
    return !isNaN(num) && num >= 0 && num <= 14;
  }, {
    message: 'Exercise frequency must be between 0 and 14 times per week'
  }),
  sleepHours: z.string().refine((val) => {
    if (!val || val === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 1 && num <= 16;
  }, {
    message: 'Sleep hours must be between 1 and 16'
  }),
  stressLevel: z.string().min(1, 'Stress level is required'),
  trainingTime: z.string().min(1, 'Preferred training time is required'),
  smokingFrequency: z.string(),
  alcoholFrequency: z.string(),
  workEnvironment: z.string(),
});

// Step 5: Additional Information (profile image validation is handled separately)
export const additionalInformationSchema = z.object({
  medicalConditions: z.string().optional(),
  notes: z.string().optional(),
});

// Combined schema for the entire form
export const onboardingFormSchema = personalInformationSchema
  .merge(bodyMetricsSchema)
  .merge(dietGoalsSchema)
  .merge(activityLifestyleSchema)
  .merge(additionalInformationSchema);

// Type exports
export type PersonalInformationInput = z.infer<typeof personalInformationSchema>;
export type BodyMetricsInput = z.infer<typeof bodyMetricsSchema>;
export type DietGoalsInput = z.infer<typeof dietGoalsSchema>;
export type ActivityLifestyleInput = z.infer<typeof activityLifestyleSchema>;
export type AdditionalInformationInput = z.infer<typeof additionalInformationSchema>;
export type OnboardingFormInput = z.infer<typeof onboardingFormSchema>;

