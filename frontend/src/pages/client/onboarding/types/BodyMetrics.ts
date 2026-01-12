import type { BaseType } from "./BaseType";

export interface BodyMetricsProps extends BaseType {
    formData: {
        weight: string;
        height: string;
        bodyFat: string;
        bmi: string;
    };
}

