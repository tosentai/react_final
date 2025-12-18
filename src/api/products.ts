/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    collection,
    getDocs,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    QueryConstraint,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Product, ProductParams } from "../lib";

const COLLECTION_NAME = "products";

export const getProducts = async (params: ProductParams) => {
    const { sort = "createdAt", order = "desc", category, q, bought } = params;

    const productsRef = collection(db, COLLECTION_NAME);
    const constraints: QueryConstraint[] = [];

    if (category && category !== "all") {
        constraints.push(where("category", "==", category));
    }

    if (bought !== undefined) {
        constraints.push(where("bought", "==", bought));
    }

    const qRef = query(productsRef, ...constraints);
    const snapshot = await getDocs(qRef);

    let products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as unknown as Product[];

    if (q) {
        const searchLower = q.toLowerCase();
        products = products.filter((p) =>
            p.name.toLowerCase().includes(searchLower)
        );
    }

    products.sort((a: any, b: any) => {
        const aValue = a[sort];
        const bValue = b[sort];

        if (aValue === bValue) return 0;

        if (typeof aValue === "string" && typeof bValue === "string") {
            const comparison = aValue.localeCompare(bValue);
            return order === "asc" ? comparison : -comparison;
        }

        if (aValue < bValue) return order === "asc" ? -1 : 1;
        if (aValue > bValue) return order === "asc" ? 1 : -1;

        return 0;
    });

    const page = params.page || 1;
    const limitNum = params.limit || 8;
    const startIndex = (page - 1) * limitNum;
    const endIndex = startIndex + limitNum;

    return {
        data: products.slice(startIndex, endIndex),
        total: products.length,
    };
};

export const getProduct = async (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as unknown as Product;
    }
    throw new Error("Product not found");
};

export const createProduct = async (
    data: Omit<Product, "id" | "createdAt">
) => {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...data,
        createdAt: new Date().toISOString(),
    });
    return { id: docRef.id, ...data };
};

export const updateProduct = async (
    id: string | number,
    data: Partial<Product>
) => {
    const docRef = doc(db, COLLECTION_NAME, String(id));
    await updateDoc(docRef, data);
    return { id, ...data };
};

export const deleteProduct = async (id: string | number) => {
    const docRef = doc(db, COLLECTION_NAME, String(id));
    await deleteDoc(docRef);
};
