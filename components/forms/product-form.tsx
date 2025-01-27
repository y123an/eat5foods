'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from "@/components/ui/switch"
import { handleSuccess } from '@/lib/toast-util'
import axios from 'axios'
import Image from 'next/image'
import Loader from "../loaders/loader"
import { FormError } from "../shared/form-error"

const ProductSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    price: z.coerce.number().min(0, "Price must be a positive number"),
    quantity: z.coerce.number().min(1, "Quantity must be at least 1").int(),
    categoryId: z.string().min(1, "Category is required"),
    description: z.string().min(1, "Description is required"),
    discount: z.coerce.number().min(0, "Discount cannot be negative").int(),
    images: z.array(z.any()).optional(),
    nutritionalFacts: z.array(z.object({
        name: z.string().min(1, "Nutritional fact name is required"),
        value: z.string().min(1, "Value is required"),
        unit: z.string().min(1, "Unit is required"),
    })),
    ingredients: z.array(z.object({
        name: z.string().min(1, "Ingredient name is required"),
        imageUrl: z.string().url("Must be a valid URL"),
    })),
    nonIngredients: z.array(z.object({
        name: z.string().min(1, "Non-ingredient name is required"),
        imageUrl: z.string().url("Must be a valid URL"),
    })),
    hasVariations: z.boolean().default(false),
    productVariation: z.array(z.object({
        price: z.number().min(0, "Price must be a positive number"),
        stock: z.number().min(0, "Stock must be a non-negative number"),
        sku: z.string().optional(),
    })).optional(),
})

type ProductFormValues = z.infer<typeof ProductSchema>

const defaultValues: Partial<ProductFormValues> = {
    name: '',
    price: 0,
    quantity: 1,
    categoryId: '',
    description: '',
    discount: 0,
    images: [],
    nutritionalFacts: [
        { name: 'Energy', value: '222', unit: 'Kcal' },
        { name: 'Protein', value: '8.2', unit: 'g' },
        { name: 'Total Carbs', value: '30.5', unit: 'g' },
    ],
    ingredients: [
        { name: 'Almonds', imageUrl: 'https://example.com/almonds.jpg' },
        { name: 'Oats', imageUrl: 'https://example.com/oats.jpg' },
    ],
    nonIngredients: [
        { name: 'Milk', imageUrl: 'https://example.com/milk.jpg' },
    ],
    hasVariations: false,
    productVariation: [],
}

type Props = {
    categories: {
        id: string;
        name: string;
        image: string;
    }[]
}

export default function ProductForm({ categories }: Props) {
    const [imagePreviews, setImagePreviews] = useState<string[]>([])
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [isLoading, setLoading] = useState<boolean>(false)

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(ProductSchema),
        defaultValues,
    })

    const { fields: nutritionalFactsFields, append: appendNutritionalFact, remove: removeNutritionalFact } = useFieldArray({
        name: "nutritionalFacts",
        control: form.control,
    })

    const { fields: ingredientsFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
        name: "ingredients",
        control: form.control,
    })

    const { fields: nonIngredientsFields, append: appendNonIngredient, remove: removeNonIngredient } = useFieldArray({
        name: "nonIngredients",
        control: form.control,
    })

    const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
        //    @ts-ignore 
        name: "images",
        control: form.control,
    })

    const { fields: variationFields, append: appendVariation, remove: removeVariation } = useFieldArray({
        name: "productVariation",
        control: form.control,
    })

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            Array.from(files).forEach((file) => {
                // @ts-ignore 
                appendImage(file)
                const reader = new FileReader()
                reader.onloadend = () => {
                    setImagePreviews(prev => [...prev, reader.result as string])
                }
                reader.readAsDataURL(file)
            })
        }
    }

    const removeImageAndPreview = (index: number) => {
        removeImage(index)
        setImagePreviews(prev => prev.filter((_, i) => i !== index))
    }

    const submitHandler = async (data: ProductFormValues) => {
        try {
            setLoading(true)
            setErrorMessage("")

            const formData = new FormData()

            // Append basic fields
            formData.append("name", data.name)
            formData.append("price", data.price.toString())
            formData.append("quantity", data.quantity.toString())
            formData.append("categoryId", data.categoryId)
            formData.append("description", data.description)
            formData.append("discount", data.discount.toString())
            formData.append("hasVariations", data.hasVariations.toString())

            // Append images
            data.images?.forEach((image, index) => {
                if (image) formData.append(`images`, image)
            })

            // Append other fields as JSON strings
            formData.append("nutritionalFacts", JSON.stringify(data.nutritionalFacts))
            formData.append("ingredients", JSON.stringify(data.ingredients))
            formData.append("nonIngredients", JSON.stringify(data.nonIngredients))
            formData.append("productVariation", JSON.stringify(data.productVariation))

            const result = await axios.post("/api/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })

            setLoading(false)
            handleSuccess("Product created successfully", "create")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(error.response?.data.message || "Failed to create product")
                console.error("AxiosError:", error.response?.data)
            } else {
                setErrorMessage("Something went wrong with creating the product")
                console.error("Error creating product:", error)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className="p-4 space-y-6">
                <h1 className="text-2xl font-bold">Product Information</h1>
                <FormError message={errorMessage} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Images Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload Product Images</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} className="relative">
                                        <Image width={100} height={100} src={preview} alt={`Preview ${index}`} className="w-full h-32 object-cover rounded" />
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
                                            <Input {...field} placeholder="Enter product name" />
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
                                            <Textarea {...field} placeholder="Enter product description" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-4">
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} placeholder="Enter price" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="quantity"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Quantity</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} placeholder="Enter quantity" />
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
                                                        <div className="flex flex-row space-x-2 items-center">
                                                            <Image className='w-8 h-8 rounded-full' src={category.image} alt={category.name} width={50} height={50} />
                                                            <p>{category.name}</p>
                                                        </div>
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
                                        <FormLabel>Discount</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} placeholder="Enter discount (optional)" />
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
                        <CardContent className="space-y-4">
                            {nutritionalFactsFields.map((field, index) => (
                                <div key={field.id} className="flex items-end gap-2">
                                    <FormField
                                        control={form.control}
                                        name={`nutritionalFacts.${index}.name`}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="e.g., Energy, Protein" />
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
                                                    <Input {...field} placeholder="e.g., 222, 8.2" />
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
                                                    <Input {...field} placeholder="e.g., Kcal, g" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeNutritionalFact(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => appendNutritionalFact({ name: '', value: '', unit: '' })}
                            >
                                <Plus className="mr-2 h-4 w-4" /> Add Nutritional Fact
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Ingredients Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Ingredients</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {ingredientsFields.map((field, index) => (
                                <div key={field.id} className="flex items-end gap-2">
                                    <FormField
                                        control={form.control}
                                        name={`ingredients.${index}.name`}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>Ingredient</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="e.g., Almonds" />
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
                                                    <Input {...field} placeholder="e.g., https://example.com/almonds.jpg" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeIngredient(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => appendIngredient({ name: '', imageUrl: '' })}
                            >
                                <Plus className="mr-2 h-4 w-4" /> Add Ingredient
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Non-Ingredients Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Non-Ingredients</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {nonIngredientsFields.map((field, index) => (
                                <div key={field.id} className="flex items-end gap-2">
                                    <FormField
                                        control={form.control}
                                        name={`nonIngredients.${index}.name`}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>Non-Ingredient</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="e.g., Milk" />
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
                                                    <Input {...field} placeholder="e.g., https://example.com/milk.jpg" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeNonIngredient(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => appendNonIngredient({ name: '', imageUrl: '' })}
                            >
                                <Plus className="mr-2 h-4 w-4" /> Add Non-Ingredient
                            </Button>
                        </CardContent>
                    </Card>
                </div>

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

                <Button disabled={isLoading} className="min-w-56" type="submit">
                    {isLoading && <Loader />}{" "}
                    {isLoading ? "Creating..." : "Create Product"}
                </Button>
            </form>
        </Form>
    )
}