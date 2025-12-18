import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import type { ProductsFiltersProps } from "../../lib/productsTypes";

const customSelectStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L2 4h8z'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
};

export const ProductsFilters = ({
    searchTerm,
    onSearchChange,
}: ProductsFiltersProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get("category") || "all";
    const statusFilter = searchParams.get("status") || "all";

    const handleCategoryChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("category", value);
        setSearchParams(params);
    };

    const handleStatusChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("status", value);
        setSearchParams(params);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-3 bg-card p-2 rounded-2xl border shadow-sm">
            <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-secondary border-0 rounded-xl text-sm focus:bg-secondary/70 focus:ring-2 focus:ring-primary/20 transition-all outline-none placeholder:text-muted-foreground"
                />
            </div>
            <div className="w-px bg-border hidden sm:block my-2" />

            <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="px-4 py-2.5 bg-secondary border-0 rounded-xl text-sm outline-none cursor-pointer hover:bg-secondary/70 transition-all appearance-none min-w-[140px] font-medium"
                style={customSelectStyle}
            >
                <option value="all">All Categories</option>
                <option value="Groceries">Groceries</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Household">Household</option>
            </select>

            <select
                value={statusFilter}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="px-4 py-2.5 bg-secondary border-0 rounded-xl text-sm outline-none cursor-pointer hover:bg-secondary/70 transition-all appearance-none min-w-[120px] font-medium"
                style={customSelectStyle}
            >
                <option value="all">All Status</option>
                <option value="to_buy">To Buy</option>
                <option value="bought">Bought</option>
            </select>
        </div>
    );
};
