import type { ProductFormCheckboxProps } from "../../../lib/productsTypes";

export const ProductFormCheckbox = ({
    label,
    name,
    register,
}: ProductFormCheckboxProps) => {
    return (
        <div className="flex items-center gap-2">
            <input
                type="checkbox"
                {...register(name)}
                id={name}
                className="h-4 w-4"
            />
            <label htmlFor={name} className="text-sm font-medium">
                {label}
            </label>
        </div>
    );
};
