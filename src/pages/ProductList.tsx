import { useSearchParams } from "react-router-dom";
import {
    useInfiniteProducts,
    useDeleteProduct,
    useUpdateProduct,
} from "../hooks/useProducts";
import { useAuth } from "../context/AuthContext";
import { useDebounce } from "../hooks/useDebounce";
import { useState, useEffect } from "react";
import { ProductsHeader } from "../components/products/ProductsHeader";
import { ProductsFilters } from "../components/products/ProductsFilters";
import { ProductsTable } from "../components/products/ProductsTable";
import { LoadMoreButton } from "../components/products/LoadMoreButton";
import type { Product } from "../lib";

export const ProductList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { user } = useAuth();
    const deleteMutation = useDeleteProduct();
    const updateMutation = useUpdateProduct();

    const limit = parseInt(searchParams.get("limit") || "7");
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
        setSearchParams(params);
    }, [debouncedSearch]);

    let boughtParam: boolean | undefined = undefined;
    if (statusFilter === "bought") boughtParam = true;
    if (statusFilter === "to_buy") boughtParam = false;

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteProducts({
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

    const allProducts = data?.pages.flatMap((page) => page.data) ?? [];
    const totalCount = data?.pages[0]?.total ?? 0;

    if (isError) {
        return (
            <div className="p-8 text-center text-red-500 font-medium">
                Error loading products
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <ProductsHeader
                totalCount={totalCount}
                isAdmin={user?.role === "admin"}
            />

            <ProductsFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            <ProductsTable
                products={allProducts}
                isLoading={isLoading}
                isAdmin={user?.role === "admin"}
                sort={sort}
                order={order}
                onSort={handleSort}
                onDelete={handleDelete}
                onToggleStatus={toggleStatus}
            />

            <LoadMoreButton
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                onLoadMore={fetchNextPage}
            />
        </div>
    );
};
