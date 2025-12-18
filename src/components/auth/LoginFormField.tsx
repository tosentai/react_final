import type { LoginFormFieldProps } from "../../lib/authTypes";

export const LoginFormField = ({
    label,
    name,
    type,
    placeholder,
    icon: Icon,
    register,
    error,
}: LoginFormFieldProps) => {
    return (
        <div>
            <label className="block text-sm font-medium text-foreground mb-2">
                {label}
            </label>
            <div className="relative">
                <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                    {...register(name)}
                    type={type}
                    className="w-full pl-10 pr-4 py-3 bg-secondary border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none placeholder:text-muted-foreground"
                    placeholder={placeholder}
                />
            </div>
            {error && (
                <p className="text-destructive text-xs mt-2 ml-1">
                    {String(error.message)}
                </p>
            )}
        </div>
    );
};
