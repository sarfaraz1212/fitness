import type { BaseType } from "./BaseType";

export interface ActivityLifestyleProps extends BaseType {
    formData: {
        fitnessLevel: string;
        exerciseFrequency: string;
        sleepHours: string;
        smokingFrequency: string;
        alcoholFrequency: string;
        stressLevel: string;
        trainingTime: string;
        workEnvironment: string;
    };
}

