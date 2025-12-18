import { useNavigate } from "react-router-dom";
import type { ProductFormActionsProps } from "../../lib/productsTypes";

export const ProductFormActions = ({ isEdit }: ProductFormActionsProps) => {
    const navigate = useNavigate();

    return (
        <div className="flex gap-4">
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                {isEdit ? "Update" : "Create"}
            </button>
            <button
                type="button"
                onClick={() => navigate("/products")}
                className="px-4 py-2 border rounded-md hover:bg-accent"
            >
                Cancel
            </button>
        </div>
    );
};
