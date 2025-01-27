'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ProductSchema, ProductType } from '@/schema/product';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { handleSuccess } from '@/lib/toast-util';
import { Ingredient, NonIngredient, NutritionalFact, Product, ProductVariation } from "@prisma/client";
import axios from 'axios';
import { Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Loader from '../loaders/loader';

type Props = {
    categories: {
        id: string;
        name: string;
        image: string;
    }[],
    productDetail: Product & {
        image: { id: string; url: string; }[],
        ingredients: Ingredient[],
        nonIngredient: NonIngredient[],
        nutritionalFacts: NutritionalFact[],
        productVariation: ProductVariation[],
    }
}

export default function UpdateProductForm({ categories, productDetail }: Props) {
    const [imagePreviews, setImagePreviews] = useState<{ id?: string; url: string }[]>(productDetail.image);
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [isLoading, setLoading] = useState<boolean>(false)
console.log("Image",imagePreviews)
    const router = useRouter();

    const form = useForm<ProductType>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: productDetail.name,
            price: productDetail.price,
            quantity: productDetail.quantity,
            categoryId: productDetail.categoryId || "",
            description: productDetail.description,
            discount: productDetail.discount || 0,
            images: [],
            nutritionalFacts: productDetail.nutritionalFacts,
            ingredients: productDetail.ingredients,
            nonIngredients: productDetail.nonIngredient,
            hasVariations: productDetail.hasVariations,
            // @ts-ignore 
            productVariation: productDetail.productVariation,
        },
    });

    const { fields: nutritionalFactsFields, append: appendNutritionalFact, remove: removeNutritionalFact } = useFieldArray({
        name: "nutritionalFacts",
        control: form.control,
    });

    const { fields: ingredientsFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
        name: "ingredients",
        control: form.control,
    });

    const { fields: nonIngredientsFields, append: appendNonIngredient, remove: removeNonIngredient } = useFieldArray({
        name: "nonIngredients",
        control: form.control,
    });

    const { fields: variationFields, append: appendVariation, remove: removeVariation } = useFieldArray({
        name: "productVariation",
        control: form.control,
    });

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            Array.from(files).forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreviews(prev => [...prev, { url: reader.result as string }]);
                    const currentImages = form.getValues('images');
                    form.setValue('images', currentImages ? [...currentImages, file] : [file]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImageAndPreview = (index: number) => {
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
        const currentImages = form.getValues('images') || [];
        form.setValue('images', currentImages.filter((_, i) => i !== index));
    };

    const submitHandler = async (data: ProductType) => {
        try {
            setLoading(true);
            setErrorMessage("");

            const formData = new FormData();

            // Append basic fields
            formData.append("name", data.name);
            formData.append("price", data.price.toString());
            formData.append("quantity", data.quantity.toString());
            formData.append("categoryId", data.categoryId);
            formData.append("description", data.description);
            formData.append("discount", data.discount.toString());
            formData.append("hasVariations", data.hasVariations.toString());

            // Append existing image IDs
            const existingImageUrls = productDetail.image.map(img => img.url);
            formData.append("existingImageURLs", JSON.stringify(existingImageUrls));

            // Append new images
            data.images?.forEach((image, index) => {
                if (image) formData.append(`images`, image);
            });

            formData.append("nutritionalFacts", JSON.stringify(data.nutritionalFacts));
            formData.append("ingredients", JSON.stringify(data.ingredients));
            formData.append("nonIngredients", JSON.stringify(data.nonIngredients));
            formData.append("productVariation", JSON.stringify(data.productVariation));

            const result = await axios.put(`/api/products/${productDetail.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setLoading(false);
            handleSuccess("Product updated successfully", "update");
            router.push('/admin/products');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(error.response?.data.message || "Failed to update product");
                console.error("AxiosError:", error.response?.data);
            } else {
                setErrorMessage("Something went wrong with updating the product");
                console.error("Error updating product:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    if (!productDetail) return <div>Loading...</div>;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
                {/* Product Images Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Product Images</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative">
                                    <Image src={preview.url} alt={`Preview ${index}`} width={100} height={100} className="w-full h-32 object-cover rounded" />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 bg-white"
                                        onClick={() => removeImageAndPreview(index)}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            ))}
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded cursor-pointer hover:border-gray-500">
                                <Plus className="h-6 w-6 text-gray-500" />
                                <span className="text-sm text-gray-500">Add Image</span>
                                <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                            </label>
                        </div>
                    </CardContent>
                </Card>

                {/* Product Information Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Product Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="discount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Discount (%)</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* Nutritional Facts Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Nutritional Facts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {nutritionalFactsFields.map((field, index) => (
                            <div key={field.id} className="flex items-end gap-2 mb-4">
                                <FormField
                                    control={form.control}
                                    name={`nutritionalFacts.${index}.name`}
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`nutritionalFacts.${index}.value`}
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Value</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`nutritionalFacts.${index}.unit`}
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Unit</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeNutritionalFact(index)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={() => appendNutritionalFact({ name: '', value: '', unit: '' })}>
                            <Plus className="mr-2 h-4 w-4" /> Add Nutritional Fact
                        </Button>
                    </CardContent>
                </Card>

                {/* Ingredients Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Ingredients</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {ingredientsFields.map((field, index) => (
                            <div key={field.id} className="flex items-end gap-2 mb-4">
                                <FormField
                                    control={form.control}
                                    name={`ingredients.${index}.name`}
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField

                                    control={form.control}
                                    name={`ingredients.${index}.imageUrl`}
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Image URL</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeIngredient(index)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={() => appendIngredient({ name: '', imageUrl: '' })}>
                            <Plus className="mr-2 h-4 w-4" /> Add Ingredient
                        </Button>
                    </CardContent>
                </Card>

                {/* Non-Ingredients Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Non-Ingredients</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {nonIngredientsFields.map((field, index) => (
                            <div key={field.id} className="flex items-end gap-2 mb-4">
                                <FormField
                                    control={form.control}
                                    name={`nonIngredients.${index}.name`}
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`nonIngredients.${index}.imageUrl`}
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Image URL</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeNonIngredient(index)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={() => appendNonIngredient({ name: '', imageUrl: '' })}>
                            <Plus className="mr-2 h-4 w-4" /> Add Non-Ingredient
                        </Button>
                    </CardContent>
                </Card>

                {/* Product Variations Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Product Variations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="hasVariations"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Enable Variations</FormLabel>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {form.watch("hasVariations") && (
                            <>
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold mb-2">Product Variations</h3>
                                    {variationFields.map((field, index) => (
                                        <div key={field.id} className="space-y-2 p-4 border rounded-md mb-4">
                                            <FormField
                                                control={form.control}
                                                name={`productVariation.${index}.price`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Price</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`productVariation.${index}.stock`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Stock</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`productVariation.${index}.sku`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>SKU</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeVariation(index)}
                                            >
                                                <Trash2 className="h-4 w-4 mr-2" /> Remove Variation
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => appendVariation({ price: 0, stock: 0, sku: '' })}
                                    >
                                        <Plus className="h-4 w-4 mr-2" /> Add Variation
                                    </Button>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                <div className="flex justify-between">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? <Loader /> : null}
                        {isLoading ? "Updating..." : "Update Product"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}