import CreateOnboardingAction from "../../actions/user/CreateOnboardingAction";
import Onboarding, { IOnboarding } from "../../models/Onboarding";
export const onboardingResolvers = {
  Query: {
    getOnboarding: async (_: any, { id }: { id: string }): Promise<IOnboarding | null> => {
      const onboarding = await Onboarding.findById(id);
      return onboarding;
    },
  },
  Mutation: {
    createOnboarding: async (_: any, { input }: { input: any }) => {

      const onboardingAction = new CreateOnboardingAction();
      await onboardingAction.execute(input);
      return {
        name: "John Doe"
      }
    },
  },
  Onboarding: {
    date_of_birth: (parent: any) => parent.dob ? (typeof parent.dob === 'string' ? parent.dob : parent.dob.toISOString()) : null,
  }
};