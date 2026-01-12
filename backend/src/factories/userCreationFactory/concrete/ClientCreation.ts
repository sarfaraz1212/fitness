import { UserCreationHandler } from '../../../interfaces/UserCreationHandler';
import User, { IUserDocument } from '../../../models/User';
import { DispatchOnboardingService } from '../../../services/DispatchOnboardingService';

export class ClientCreation implements UserCreationHandler {
    private onboardingService: DispatchOnboardingService;

    constructor() {
        this.onboardingService = new DispatchOnboardingService();
    }

    async create(data: { name: string; email: string; password?: string | null }): Promise<IUserDocument> {
        try {
            const user = new User({ ...data, role: 'CLIENT' });
            const savedUser = await user.save();

            const onboardingResponse = await this.onboardingService.dispatch(savedUser);
            if (!onboardingResponse.success) {
                console.error('Onboarding dispatch failed:', onboardingResponse.error);
            }

            return savedUser;
        } catch (error) {
            console.error('Error creating client:', error.message);
            throw error;
        }
    }
}
