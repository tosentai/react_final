/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams, Link } from "react-router-dom";
import {
    useProducts,
    useDeleteProduct,
    useUpdateProduct,
} from "../hooks/useProducts";
import { useAuth } from "../context/AuthContext";
import { useDebounce } from "../hooks/useDebounce";
import { useState, useEffect } from "react";
import {
    Pencil,
    Trash2,
    Plus,
    ArrowUpDown,
    Search,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    Circle,
} from "lucide-react";
import { cn } from "../lib/utils";
import type { Product } from "../types";

export const ProductList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { user } = useAuth();
    const deleteMutation = useDeleteProduct();
    const updateMutation = useUpdateProduct();

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");
    const sort = searchParams.get("sort") || "createdAt";
    const order = (searchParams.get("order") as "asc" | "desc") || "desc";
    const q = searchParams.get("q") || "";
    const category = searchParams.get("category") || "all";
    const statusFilter = searchParams.get("status") || "all";

    const [searchTerm, setSearchTerm] = useState(q);
    const debouncedSearch = useDebounce(searchTerm, 300);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (debouncedSearch) params.set("q", debouncedSearch);
        else params.delete("q");
        params.set("page", "1");
        setSearchParams(params);
    }, [debouncedSearch]);

    let boughtParam: boolean | undefined = undefined;
    if (statusFilter === "bought") boughtParam = true;
    if (statusFilter === "to_buy") boughtParam = false;

    const { data, isLoading, isError } = useProducts({
        page,
        limit,
        sort,
        order,
        q: debouncedSearch,
        category: category === "all" ? undefined : category,
        bought: boughtParam,
    });

    const handleSort = (field: string) => {
        const params = new URLSearchParams(searchParams);
        if (sort === field) {
            params.set("order", order === "asc" ? "desc" : "asc");
        } else {
            params.set("sort", field);
            params.set("order", "asc");
        }
        setSearchParams(params);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Delete this product?")) {
            await deleteMutation.mutateAsync(id);
        }
    };

    const toggleStatus = async (product: Product) => {
        await updateMutation.mutateAsync({
            id: product.id,
            data: { bought: !product.bought },
        });
    };

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", newPage.toString());
        setSearchParams(params);
    };

    const customSelectStyle = {
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L2 4h8z'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
    };

    if (isError)
        return (
            <div className="p-8 text-center text-red-500 font-medium">
                Error loading products
            </div>
        );

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Shopping List
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Manage your purchases.
                    </p>
                </div>
                {user?.role === "admin" && (
                    <Link
                        to="/products/new"
                        className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 font-medium text-white transition-all duration-200 bg-primary rounded-full hover:bg-blue-600 active:scale-95 shadow-lg shadow-blue-500/30"
                    >
                        <Plus size={18} />
                        <span>Add Item</span>
                    </Link>
                )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 bg-card p-2 rounded-2xl border shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-secondary border-0 rounded-xl text-sm focus:bg-secondary/70 focus:ring-2 focus:ring-primary/20 transition-all outline-none placeholder:text-muted-foreground"
                    />
                </div>
                <div className="w-px bg-border hidden sm:block my-2" />

                <select
                    value={category}
                    onChange={(e) => {
                        const params = new URLSearchParams(searchParams);
                        params.set("category", e.target.value);
                        params.set("page", "1");
                        setSearchParams(params);
                    }}
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
                    onChange={(e) => {
                        const params = new URLSearchParams(searchParams);
                        params.set("status", e.target.value);
                        params.set("page", "1");
                        setSearchParams(params);
                    }}
                    className="px-4 py-2.5 bg-secondary border-0 rounded-xl text-sm outline-none cursor-pointer hover:bg-secondary/70 transition-all appearance-none min-w-[120px] font-medium"
                    style={customSelectStyle}
                >
                    <option value="all">All Status</option>
                    <option value="to_buy">To Buy</option>
                    <option value="bought">Bought</option>
                </select>
            </div>

            <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="p-12 text-center text-muted-foreground animate-pulse">
                        Loading data...
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/30 border-b">
                                <tr>
                                    <th
                                        className="px-6 py-4 font-semibold text-muted-foreground cursor-pointer select-none group"
                                        onClick={() => handleSort("name")}
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
                                        onClick={() => handleSort("price")}
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
                                    {user?.role === "admin" && (
                                        <th className="px-6 py-4 text-right font-semibold text-muted-foreground">
                                            Actions
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {data?.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="text-center py-12 text-muted-foreground"
                                        >
                                            No items found.
                                        </td>
                                    </tr>
                                ) : (
                                    data?.data.map((product) => (
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
                                                <button
                                                    onClick={() =>
                                                        user?.role ===
                                                            "admin" &&
                                                        toggleStatus(product)
                                                    }
                                                    disabled={
                                                        user?.role !== "admin"
                                                    }
                                                    className={cn(
                                                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all",
                                                        product.bought
                                                            ? "bg-green-50/50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/50"
                                                            : "bg-red-50/50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/50",
                                                        user?.role ===
                                                            "admin" &&
                                                            "hover:opacity-80 active:scale-95 cursor-pointer"
                                                    )}
                                                >
                                                    {product.bought ? (
                                                        <CheckCircle2
                                                            size={12}
                                                        />
                                                    ) : (
                                                        <Circle size={12} />
                                                    )}
                                                    {product.bought
                                                        ? "Bought"
                                                        : "To Buy"}
                                                </button>
                                            </td>
                                            {user?.role === "admin" && (
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-1 transition-opacity">
                                                        <Link
                                                            to={`/products/${product.id}/edit`}
                                                            className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                                                        >
                                                            <Pencil size={16} />
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    product.id
                                                                )
                                                            }
                                                            className="p-2 text-muted-foreground cursor-pointer hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                                                        >
                                                            <Trash2 size={16} />
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
                )}
            </div>

            <div className="flex justify-between items-center pt-2">
                <div className="text-xs text-muted-foreground pl-2">
                    Page {page} of{" "}
                    {Math.max(1, Math.ceil((data?.total || 0) / limit))}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        disabled={page === 1}
                        onClick={() => handlePageChange(page - 1)}
                        className="p-2 rounded-full border bg-white dark:bg-card hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-40 transition-all shadow-sm"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        disabled={!data?.total || page * limit >= data.total}
                        onClick={() => handlePageChange(page + 1)}
                        className="p-2 rounded-full border bg-white dark:bg-card hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-40 transition-all shadow-sm"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};
