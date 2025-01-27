"use client"

import { zodResolver } from "@hookform/resolvers/zod"
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
import axios, { AxiosError } from "axios"
import { useState } from "react"
import { handleError } from "@/lib/toast-util"

const faqFormSchema = z.object({
    productId: z.string(),
    content: z.string().min(10, {
        message: "Question must be at least 10 characters.",
    }),
})

type Props = {
    productId: string
}

export function FAQSubmissionForm({ productId }: Props) {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof faqFormSchema>>({
        resolver: zodResolver(faqFormSchema),
        defaultValues: {
            content: "",
            productId,
        },
    })

    // Marking onSubmit as async
    async function onSubmit(values: z.infer<typeof faqFormSchema>) {
        setLoading(true)
        try {
            // Sending both productId and content as request data
            const result = await axios.put(`/api/products/faqs/${values.productId}`, {
                content: values.content,
            })

            toast({
                title: "FAQ Submitted",
                description: "Thank you for your submission. We'll review it shortly.",
            })
        } catch (error) {
            if (error instanceof AxiosError) {
                toast({
                    title: "Submission Error",
                    description: error.response?.data?.message || "Something went wrong.",
                    variant: "destructive",
                })
            } else {
                handleError("Unable to submit your review", "create")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 min-h-[80vh] max-w-2xl mx-auto p-6 bg-white rounded-lg"
            >
                <h2 className="text-2xl font-bold text-center text-dark-green mb-6">
                    Submit a New FAQ
                </h2>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Question</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter your question here"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Provide a clear and concise question.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="w-full bg-dark-green text-white"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit Your Question"}
                </Button>
            </form>
        </Form>
    )
}
