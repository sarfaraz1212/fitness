import Onboarding, { IOnboarding } from '../models/Onboarding';

export class OnboardingRepository {
    static async create(data:any): Promise<IOnboarding> {
        const onboarding = new Onboarding(data);
        return await onboarding.save();
    }   

    static async find(key: string, value: any): Promise<IOnboarding | null> {
        const query: Record<string, any> = { [key]: value };
        const onboarding = await Onboarding.findOne(query);
        return onboarding;
    }

    static async update(
        key: string,
        value: any,
        updateData: Partial<IOnboarding>
      ): Promise<IOnboarding | null> {
        const query: Record<string, any> = { [key]: value };
        const updated = await Onboarding.findOneAndUpdate(query, updateData, { new: true });
        return updated;
      }
    
    
}