export type FieldType =
    | "text"
    | "email"
    | "tel"
    | "url"
    | "textarea"
    | "select"
    | "multiselect"
    | "checkbox"
    | "color"
    | "file"
    | "radio";

export interface FieldOption {
    value: string;
    label: string;
}

export interface FieldConfig {
    id: string;
    label: string;
    type: FieldType;
    placeholder?: string;
    required?: boolean;
    options?: FieldOption[];
    helperText?: string;
    maxFree?: number;
    paidBadge?: string;
    validation?: {
        min?: number;
        max?: number;
        pattern?: string;
        message?: string;
    };
    dataGroup: "contact" | "content" | "design" | "extra";
}

export interface StepConfig {
    id: string;
    title: string;
    description: string;
    icon: string;
    fields: FieldConfig[];
}

export interface BriefingTypeConfig {
    id: string;
    type: BriefingType;
    label: string;
    description: string;
    icon: string;
    steps: StepConfig[];
    enabled: boolean;
}

export type BriefingType = "LANDING" | "WEB_CORPORATIVA" | "ECOMMERCE";

export type BriefingStatus = "nuevo" | "revisado" | "en_progreso" | "completado";

export interface BriefingRecord {
    id: string;
    createdAt: string;
    updatedAt: string;
    status: BriefingStatus;
    type: BriefingType;
    clientName: string;
    clientEmail: string;
    summary: string | null;
    contactData: Record<string, unknown>;
    contentData: Record<string, unknown>;
    designData: Record<string, unknown>;
    extraData: Record<string, unknown>;
}

export interface FormData {
    [key: string]: string | string[] | boolean | undefined;
}
