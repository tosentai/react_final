import type { ProductFormFieldProps } from "../../../lib/productsTypes";

export const ProductFormField = ({
    label,
    name,
    type = "text",
    step,
    register,
    registerOptions,
    error,
}: ProductFormFieldProps) => {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
                type={type}
                step={step}
                {...register(name, registerOptions)}
                className="w-full p-2 border rounded-md bg-background"
            />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
    );
};
