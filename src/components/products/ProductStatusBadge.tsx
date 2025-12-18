import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "../../lib/utils";
import type { ProductStatusBadgeProps } from "../../lib/productsTypes";

export const ProductStatusBadge = ({
    product,
    isAdmin,
    onToggle,
}: ProductStatusBadgeProps) => {
    return (
        <button
            onClick={() => isAdmin && onToggle()}
            disabled={!isAdmin}
            className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all",
                product.bought
                    ? "bg-green-50/50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/50"
                    : "bg-red-50/50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/50",
                isAdmin && "hover:opacity-80 active:scale-95 cursor-pointer"
            )}
        >
            {product.bought ? <CheckCircle2 size={12} /> : <Circle size={12} />}
            {product.bought ? "Bought" : "To Buy"}
        </button>
    );
};
