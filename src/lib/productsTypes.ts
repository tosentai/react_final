import type { FieldError, UseFormRegister } from "react-hook-form";
import type { Product } from "../types";

export interface ProductsHeaderProps {
    totalCount: number;
    isAdmin: boolean;
}

export interface ProductsFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

export interface ProductsTableProps {
    products: Product[];
    isLoading: boolean;
    isAdmin: boolean;
    sort: string;
    order: "asc" | "desc";
    onSort: (field: string) => void;
    onDelete: (id: string) => void;
    onToggleStatus: (product: Product) => void;
}

export interface ProductStatusBadgeProps {
    product: Product;
    isAdmin: boolean;
    onToggle: () => void;
}

export interface LoadMoreButtonProps {
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    onLoadMore: () => void;
}

export interface ProductFormActionsProps {
    isEdit: boolean;
}

export interface ProductFormData {
    name: string;
    price: number;
    category: string;
    bought: boolean;
}

export interface ProductFormCheckboxProps {
    label: string;
    name: keyof ProductFormData;
    register: UseFormRegister<ProductFormData>;
}

export interface ProductFormData {
    name: string;
    price: number;
    category: string;
    bought: boolean;
}

export interface ProductFormFieldProps {
    label: string;
    name: keyof ProductFormData;
    type?: string;
    step?: string;
    register: UseFormRegister<ProductFormData>;
    registerOptions?: object;
    error?: FieldError;
}

export interface ProductFormHeaderProps {
    isEdit: boolean;
}

export interface ProductFormData {
    name: string;
    price: number;
    category: string;
    bought: boolean;
}

export interface ProductFormSelectProps {
    label: string;
    name: keyof ProductFormData;
    options: { value: string; label: string }[];
    register: UseFormRegister<ProductFormData>;
    error?: FieldError;
}
