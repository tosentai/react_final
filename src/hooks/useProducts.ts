import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/products";
import type { ProductParams, Product } from "../types";

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

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
            api.updateProduct(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({
                queryKey: ["product", variables.id.toString()],
            });
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });
};
