export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    is_verified: boolean;
    is_onboarded: boolean;
    onboarding?: {
        fitness_goals: string[];
    };
}

export interface LoginData {
    login: {
        token: string;
        user: User;
    };
}

export interface CreateClientData {
    createClient: {
        id: string;
        name: string;
    };
}

export interface CreateOnboardingData {
    createOnboarding: {
        name: string;
    };
}
