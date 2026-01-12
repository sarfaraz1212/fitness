import type { BaseType } from "./BaseType";

export interface PersonalInformationProps extends BaseType {
    formData: {
        dob: string;
        gender: string;
        bloodGroup: string;
    };
    calculatedAge: number;
}