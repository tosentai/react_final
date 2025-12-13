import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, useParams } from "react-router-dom";
import {
    useCreateProduct,
    useUpdateProduct,
    useProduct,
} from "../hooks/useProducts";
import { useEffect } from "react";

const productSchema = z.object({
    name: z.string().min(3, "Min 3 chars"),
    price: z.number().min(0.01, "Positive price required"),
    category: z.string().min(1, "Required"),
    bought: z.boolean(),
});

type ProductFormData = z.infer<typeof productSchema>;

export const ProductForm = () => {
    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate();

    const createMutation = useCreateProduct();
    const updateMutation = useUpdateProduct();
    const { data: product, isLoading } = useProduct(id || "");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: { bought: false },
    });

    useEffect(() => {
        if (isEdit && product) {
            reset(product as unknown as ProductFormData);
        }
    }, [product, isEdit, reset]);

    const onSubmit = async (data: ProductFormData) => {
        try {
            if (isEdit) {
                await updateMutation.mutateAsync({ id: id!, data });
            } else {
                await createMutation.mutateAsync(data);
            }
            navigate("/products");
        } catch (error) {
            console.error(error);
        }
    };

    if (isEdit && isLoading) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">
                {isEdit ? "Edit Product" : "Create Product"}
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 bg-card p-6 rounded-lg border shadow-sm"
            >
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Name
                    </label>
                    <input
                        {...register("name")}
                        className="w-full p-2 border rounded-md bg-background"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Price
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        {...register("price", { valueAsNumber: true })}
                        className="w-full p-2 border rounded-md bg-background"
                    />
                    {errors.price && (
                        <p className="text-red-500 text-sm">
                            {errors.price.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Category
                    </label>
                    <select
                        {...register("category")}
                        className="w-full p-2 border rounded-md bg-background"
                    >
                        <option value="">Select...</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Household">Household</option>
                    </select>
                    {errors.category && (
                        <p className="text-red-500 text-sm">
                            {errors.category.message}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        {...register("bought")}
                        id="bought"
                        className="h-4 w-4"
                    />
                    <label htmlFor="bought" className="text-sm font-medium">
                        Bought
                    </label>
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        {isEdit ? "Update" : "Create"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/products")}
                        className="px-4 py-2 border rounded-md hover:bg-accent"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};
