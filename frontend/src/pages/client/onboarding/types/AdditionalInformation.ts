import type { BaseType } from "./BaseType";

export interface AdditionalInformationProps extends BaseType {
    formData: {
        medicalConditions: string;
        notes: string;
    };
    profilePreview: string | null;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeImage: () => void;
}

