import crypto from 'crypto';
import Onboarding from '../models/Onboarding';
import { IUser } from '../models/User';
import { ActionResponse } from '../interfaces/ActionResponse';

export class DispatchOnboardingService {
    async dispatch(user: IUser): Promise<ActionResponse> {
        try {
            const token = crypto.randomBytes(20).toString('hex');
            const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

            const existingOnboarding = await Onboarding.findOne({ user_id: user._id });

            if (existingOnboarding && existingOnboarding.status === 'completed') {
                return { success: true, data: null, error: null };
            }

            if (!existingOnboarding) {
                await Onboarding.create({
                    user_id: user._id,
                    token,
                    expires_at: expiresAt,
                });
            } else {
                await Onboarding.updateOne(
                    { user_id: user._id },
                    { token, expires_at: expiresAt }
                );
            }

            const encryptedToken = token;
            const onboardingLink = `http://localhost:3000/onboarding?token=${encryptedToken}`;

            console.log(`Sending onboarding email to ${user.email} with link: ${onboardingLink}`);

            return { success: true, data: null, error: null };
        } catch (error) {
            console.error('Error dispatching onboarding:', error);
            return { success: false, data: null, error: error instanceof Error ? error.message : 'Unknown error' };
        }
    }
}