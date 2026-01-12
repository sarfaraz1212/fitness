import ActionInterface from "../../interfaces/ActionInterface";
import { ValidationService } from "../../services/ValidationService";
import { createOnboardingSchema } from '../../validations/onboardingValidation';
import { z } from 'zod';
import { ImageUtils } from '../../utils/imageUtils';
import { OnboardingRepository } from '../../repositories/OnboardingRepository';
import FormatInterface from "../../interfaces/FormatInterface";

export default class CreateOnboardingAction implements ActionInterface, FormatInterface {
    private schema: z.ZodType<any>;

    constructor() {
        this.schema = createOnboardingSchema;
    }

    async execute(payload: object): Promise<any> {

        try {
            const validatedData = ValidationService.validate(this.schema, payload) as any;
            const onboarding = await OnboardingRepository.find('token', validatedData.token);

            if (!onboarding) {
                throw new Error('Onboarding not found!');
            }

            const formattedData = this.format(validatedData);
            OnboardingRepository.update('token', validatedData.token, formattedData);

            return {
                name: "Onboarding created successfully"
            };
        } catch (error) {
            throw new Error("Something went wrong!");
        }

    }

    format(data: any): any {

        let profileImageFilename: string | undefined;
        if (data.profileImage) {
            try {
                profileImageFilename = ImageUtils.saveBase64Image(data.profileImage);
            } catch (error) {
                console.error('Error saving profile image:', error);
            }
        }

        return {
            dob: data.dob ? new Date(data.dob) : undefined,
            age: data.age,
            gender: data.gender,
            blood_group: data.bloodGroup,
            diet_preferences: data.dietPreference,
            fitness_goals: data.fitnessGoals,
            weight: data.weight,
            height: data.height,
            body_fat: data.bodyFat || undefined,
            bmi: data.bmi || undefined,
            fitness_level: data.fitnessLevel,
            exercise_frequency: data.exerciseFrequency ? parseInt(data.exerciseFrequency) : undefined,
            sleep_hours: data.sleepHours ? parseFloat(data.sleepHours) : undefined,
            smoking_frequency: data.smokingFrequency || undefined,
            alcohol_frequency: data.alcoholFrequency || undefined,
            stress_level: data.stressLevel,
            training_time: data.trainingTime,
            work_environment: data.workEnvironment,
            medical_conditions: data.medicalConditions || undefined,
            notes: data.notes || undefined,
            profile_image: profileImageFilename || undefined,
            status: 'completed',
        };
    }

}