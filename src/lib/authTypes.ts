import type { LucideIcon } from "lucide-react";
import type { UseFormRegister, FieldError } from "react-hook-form";

export interface LoginFormData {
    email: string;
    password: string;
}

export interface LoginFormFieldProps {
    label: string;
    name: keyof LoginFormData;
    type: string;
    placeholder: string;
    icon: LucideIcon;
    register: UseFormRegister<LoginFormData>;
    error?: FieldError;
}

export interface LoginSubmitButtonProps {
    isSubmitting: boolean;
}
