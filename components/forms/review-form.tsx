
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Star } from 'lucide-react'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import axios, { AxiosError } from "axios"
import { handleError } from "@/lib/toast-util"
import { FormError } from "../shared/form-error"
import { SuccessMessage } from "../shared/form-success"


const reviewFormSchema = z.object({
    rating: z.number().min(1).max(5),
    productId: z.string(),
    comment: z.string().min(10, {
        message: "Comment must be at least 10 characters.",
    }),
})

type Props = {
    productId: string
}
export function ReviewSubmissionForm({ productId }: Props) {
    const [rating, setRating] = useState(0)
    const [loading, setLoading] = useState(false)
    const [message, setMassage] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);
    const form = useForm<z.infer<typeof reviewFormSchema>>({
        resolver: zodResolver(reviewFormSchema),
        defaultValues: {
            rating: 0,
            productId,
            comment: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof reviewFormSchema>) => {
        setLoading(true);
        setError("")
        const data = {
            rating: values.rating,
            comment: values.comment,
        };
        try {
            const result = await axios.put(`/api/products/edit/${productId}`, data);
            toast({
                title: "Review Submitted",
                description: "Thank you for your review!",
            })

            form.reset()
            setRating(0)
        } catch (error) {
            if (error instanceof AxiosError) {
                setError(error.response?.data.message)
            }
            handleError("Unable to submit your review ", "create")
        } finally {
            setLoading(false);

        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 my-4 max-w-2xl mx-auto p-6 bg-white ">
                <h2 className="text-2xl font-bold text-center text-pink-500 mb-6">Submit Your Review for this Product</h2>
                <FormError message={error} />
                <SuccessMessage message={message} />
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rating</FormLabel>
                            <FormControl>
                                <div className="flex space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`w-8 h-8 cursor-pointer ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                                }`}
                                            onClick={() => {
                                                setRating(star)
                                                field.onChange(star)
                                            }}
                                        />
                                    ))}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Review</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Write your review here"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Share your honest opinion about the product.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white">{loading ? "Submitting..." : 'Submit Review'}</Button>
                <div className="mt-6">
                    <Link className="underline text-blue-700" href={`/shop/faqs/${productId}`}> I have Question?</Link>
                </div>
            </form>

        </Form>
    )
}

