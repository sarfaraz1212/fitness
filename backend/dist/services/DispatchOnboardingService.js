"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchOnboardingService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const Onboarding_1 = __importDefault(require("../models/Onboarding"));
class DispatchOnboardingService {
    async dispatch(user) {
        try {
            const token = crypto_1.default.randomBytes(20).toString('hex');
            const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            const existingOnboarding = await Onboarding_1.default.findOne({ user_id: user._id });
            if (existingOnboarding && existingOnboarding.status === 'completed') {
                return { success: true, data: null, error: null };
            }
            if (!existingOnboarding) {
                await Onboarding_1.default.create({
                    user_id: user._id,
                    token,
                    expires_at: expiresAt,
                });
            }
            else {
                await Onboarding_1.default.updateOne({ user_id: user._id }, { token, expires_at: expiresAt });
            }
            const encryptedToken = token;
            const onboardingLink = `http://localhost:3000/onboarding?token=${encryptedToken}`;
            console.log(`Sending onboarding email to ${user.email} with link: ${onboardingLink}`);
            return { success: true, data: null, error: null };
        }
        catch (error) {
            console.error('Error dispatching onboarding:', error);
            return { success: false, data: null, error: error instanceof Error ? error.message : 'Unknown error' };
        }
    }
}
exports.DispatchOnboardingService = DispatchOnboardingService;
