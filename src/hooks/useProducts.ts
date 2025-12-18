/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from "@tanstack/react-query";
import * as api from "../api/products";
import type { ProductParams, Product } from "../lib";

export const useProducts = (params: ProductParams) => {
    return useQuery({
        queryKey: ["products", params],
        queryFn: () => api.getProducts(params),
        placeholderData: (prev) => prev,
    });
};

export const useProduct = (id: string) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => api.getProduct(id),
        enabled: !!id,
    });
};

export const useInfiniteProducts = (params: Omit<ProductParams, "page">) => {
    return useInfiniteQuery({
        queryKey: ["products-infinite", params],
        queryFn: ({ pageParam = 1 }) =>
            api.getProducts({ ...params, page: pageParam }),
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = allPages.length;
            const totalPages = Math.ceil(lastPage.total / (params.limit || 10));
            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        initialPageParam: 1,
    });
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["products-infinite"] });
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
            api.updateProduct(id, data),

        onMutate: async ({ id, data }) => {
            await queryClient.cancelQueries({
                queryKey: ["products-infinite"],
            });

            const previousData = queryClient.getQueryData([
                "products-infinite",
            ]);

            queryClient.setQueryData(["products-infinite"], (old: any) => {
                if (!old) return old;

                return {
                    ...old,
                    pages: old.pages.map((page: any) => ({
                        ...page,
                        data: page.data.map((product: Product) =>
                            product.id === id
                                ? { ...product, ...data }
                                : product
                        ),
                    })),
                };
            });

            return { previousData };
        },

        onError: (_err, _variables, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(
                    ["products-infinite"],
                    context.previousData
                );
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["products-infinite"] });
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["products-infinite"] });
        },
    });
};
