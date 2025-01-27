"use client";

import Loader from "@/components/loaders/loader";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleError, handleSuccess } from "@/lib/toast-util";
import { CategorySchema } from "@/schema/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import axios from "axios";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "../ui/textarea";

type UpdateCategoryProps = {
    categoryInfo: Category;
};

export default function UpdateCategoryForm({
    categoryInfo
}: UpdateCategoryProps) {
    const router = useRouter();
    const [isSubmitting, setSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(categoryInfo.image);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof CategorySchema>>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: categoryInfo.name,
            description: categoryInfo.description,
        },
    });

    useEffect(() => {
        // Set initial values from props
        form.reset({
            name: categoryInfo.name,
            description: categoryInfo.description,
        });
    }, [categoryInfo.name, categoryInfo.description, form]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setSelectedImage(file);
            setImagePreview(url);
            // Cleanup object URL
            return () => URL.revokeObjectURL(url);
        }
    };

    const handlePencilClick = () => {
        fileInputRef.current?.click();
    };

    const onSubmit = async (values: z.infer<typeof CategorySchema>) => {
        setSubmitting(true);
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);

        if (selectedImage) {
            formData.append("image", selectedImage);
        }

        try {
            await axios.put(`/api/categories/${categoryInfo.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            handleSuccess("Category updated successfully", "update");
            router.back();
        } catch (error) {
            handleError(error, "update");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-6">Update Category</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full max-w-3xl">
                    {/* Image Upload Field */}
                    <FormItem>
                        <FormControl>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                />
                                <div
                                    onClick={handlePencilClick}
                                    className="w-full md:w-1/2 mx-auto h-40 border-2 border-dashed border-gray-500 rounded-md flex items-center justify-center overflow-hidden relative"
                                >
                                    {imagePreview ? (
                                        <Image
                                            src={imagePreview}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center space-y-3">
                                            <Upload className="w-5 h-5" />
                                            <p className="text-gray-500">Click to select an image</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>

                    {/* Name Field */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Category Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Description Field */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea className="min-h-[100px]" placeholder="Category Description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={isSubmitting} className="min-w-56" type="submit">
                        {isSubmitting && <Loader />} {isSubmitting ? "Updating..." : "Update Category"}
                    </Button>
                </form>
            </Form>
        </main>
    );
}
