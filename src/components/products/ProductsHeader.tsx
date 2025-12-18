import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import type { ProductsHeaderProps } from "../../lib/productsTypes";

export const ProductsHeader = ({
    totalCount,
    isAdmin,
}: ProductsHeaderProps) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Shopping List
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                    {totalCount} {totalCount === 1 ? "item" : "items"} total
                </p>
            </div>
            {isAdmin && (
                <Link
                    to="/products/new"
                    className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 font-medium text-white transition-all duration-200 bg-primary rounded-full hover:bg-blue-600 active:scale-95 shadow-lg shadow-blue-500/30"
                >
                    <Plus size={18} />
                    <span>Add Item</span>
                </Link>
            )}
        </div>
    );
};
