export type Role = "admin" | "user";

export interface User {
    id: string;
    email: string;
    name: string;
    role: Role;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    bought: boolean;
    createdAt: string;
}

export interface ProductParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: "asc" | "desc";
    q?: string;
    category?: string;
    bought?: boolean;
}
