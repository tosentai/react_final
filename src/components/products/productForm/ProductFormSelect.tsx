import type { ProductFormSelectProps } from "../../../lib/productsTypes";

export const ProductFormSelect = ({
    label,
    name,
    options,
    register,
    error,
}: ProductFormSelectProps) => {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <select
                {...register(name)}
                className="w-full p-2 border rounded-md bg-background"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
    );
};
