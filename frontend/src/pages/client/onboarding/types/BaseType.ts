export interface BaseType {
    handleChange: (field: string, value: string) => void;
    errors: Record<string, string>;
}