import type { ProductFormHeaderProps } from "../../lib/productsTypes";

export const ProductFormHeader = ({ isEdit }: ProductFormHeaderProps) => {
    return (
        <h1 className="text-2xl font-bold mb-6">
            {isEdit ? "Edit Product" : "Create Product"}
        </h1>
    );
};
