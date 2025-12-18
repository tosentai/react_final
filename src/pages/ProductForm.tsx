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
import { ProductFormHeader } from "../components/products/productForm/ProductFormHeader";
import { ProductFormField } from "../components/products/productForm/ProductFormField";
import { ProductFormSelect } from "../components/products/productForm/ProductFormSelect";
import { ProductFormCheckbox } from "../components/products/productForm/ProductFormCheckbox";
import { ProductFormActions } from "../components/products/productForm/ProductFormActions";

const productSchema = z.object({
    name: z.string().min(3, "Min 3 chars"),
    price: z.number().min(0.01, "Positive price required"),
    category: z.string().min(1, "Required"),
    bought: z.boolean(),
});

type ProductFormData = z.infer<typeof productSchema>;

const categoryOptions = [
    { value: "", label: "Select..." },
    { value: "Groceries", label: "Groceries" },
    { value: "Electronics", label: "Electronics" },
    { value: "Clothing", label: "Clothing" },
    { value: "Household", label: "Household" },
];

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
            <ProductFormHeader isEdit={isEdit} />

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 bg-card p-6 rounded-lg border shadow-sm"
            >
                <ProductFormField
                    label="Name"
                    name="name"
                    register={register}
                    error={errors.name}
                />

                <ProductFormField
                    label="Price"
                    name="price"
                    type="number"
                    step="0.01"
                    register={register}
                    registerOptions={{ valueAsNumber: true }}
                    error={errors.price}
                />

                <ProductFormSelect
                    label="Category"
                    name="category"
                    options={categoryOptions}
                    register={register}
                    error={errors.category}
                />

                <ProductFormCheckbox
                    label="Bought"
                    name="bought"
                    register={register}
                />

                <ProductFormActions isEdit={isEdit} />
            </form>
        </div>
    );
};
