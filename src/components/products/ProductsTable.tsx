import { Link } from "react-router-dom";
import { Pencil, Trash2, ArrowUpDown } from "lucide-react";
import { ProductStatusBadge } from "./ProductStatusBadge";
import { cn } from "../../lib/utils";
import type { ProductsTableProps } from "../../lib/productsTypes";

export const ProductsTable = ({
    products,
    isLoading,
    isAdmin,
    onSort,
    onDelete,
    onToggleStatus,
}: ProductsTableProps) => {
    if (isLoading) {
        return (
            <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
                <div className="p-12 text-center text-muted-foreground animate-pulse">
                    Loading data...
                </div>
            </div>
        );
    }

    return (
        <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/30 border-b">
                        <tr>
                            <th
                                className="px-6 py-4 font-semibold text-muted-foreground cursor-pointer select-none group"
                                onClick={() => onSort("name")}
                            >
                                <div className="flex items-center gap-1 group-hover:text-foreground transition-colors">
                                    Name{" "}
                                    <ArrowUpDown
                                        size={13}
                                        className="opacity-50"
                                    />
                                </div>
                            </th>
                            <th
                                className="px-6 py-4 font-semibold text-muted-foreground cursor-pointer select-none group"
                                onClick={() => onSort("price")}
                            >
                                <div className="flex items-center gap-1 group-hover:text-foreground transition-colors">
                                    Price{" "}
                                    <ArrowUpDown
                                        size={13}
                                        className="opacity-50"
                                    />
                                </div>
                            </th>
                            <th className="px-6 py-4 font-semibold text-muted-foreground">
                                Category
                            </th>
                            <th className="px-6 py-4 font-semibold text-muted-foreground">
                                Status
                            </th>
                            {isAdmin && (
                                <th className="px-6 py-4 text-right font-semibold text-muted-foreground">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {products.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="text-center py-12 text-muted-foreground"
                                >
                                    No items found.
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="group hover:bg-muted/40 transition-colors duration-200"
                                >
                                    <td className="px-6 py-4 font-medium text-foreground">
                                        <span
                                            className={cn(
                                                product.bought &&
                                                    "text-muted-foreground line-through decoration-muted-foreground/50"
                                            )}
                                        >
                                            {product.name}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium tabular-nums text-foreground/80">
                                        ${product.price.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border/50">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <ProductStatusBadge
                                            product={product}
                                            isAdmin={isAdmin}
                                            onToggle={() =>
                                                onToggleStatus(product)
                                            }
                                        />
                                    </td>
                                    {isAdmin && (
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-1">
                                                <Link
                                                    to={`/products/${product.id}/edit`}
                                                    className="p-2 text-muted-foreground/70 hover:text-primary hover:bg-primary/10 rounded-full transition-all"
                                                >
                                                    <Pencil size={18} />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        onDelete(product.id)
                                                    }
                                                    className="p-2 text-muted-foreground/70 hover:text-destructive hover:bg-destructive/10 rounded-full transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
