import { Link } from "react-router-dom";
import { Package } from "lucide-react";

export const Logo = () => {
    return (
        <Link
            to="/products"
            className="font-semibold text-lg tracking-tight flex items-center gap-2.5 hover:opacity-70 transition-opacity"
        >
            <div className="bg-primary text-white p-1.5 rounded-lg shadow-sm">
                <Package className="h-4 w-4" />
            </div>
            <span className="font-semibold">ShopList</span>
        </Link>
    );
};
