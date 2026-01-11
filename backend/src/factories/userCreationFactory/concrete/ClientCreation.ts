import { UserCreationHandler } from '../../../interfaces/UserCreationHandler';
import User from '../../../models/User';
import { IUser } from '../../../models/User';
import { DispatchOnboardingService } from '../../../services/DispatchOnboardingService';

export class ClientCreation implements UserCreationHandler {
    private onboardingService: DispatchOnboardingService;

    constructor() {
        this.onboardingService = new DispatchOnboardingService();
    }

    async create(data: { name: string; email: string; password: string }): Promise<IUser> {
        const user = new User({ ...data, role: 'CLIENT' });
        const savedUser = await user.save();

        const onboardingResponse = await this.onboardingService.dispatch(savedUser);
        if (!onboardingResponse.success) {
            console.error('Onboarding dispatch failed:', onboardingResponse.error);
        }

        return savedUser;
    }
}