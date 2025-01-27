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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const faqFormSchema = z.object({
    productId: z.string(),
    question: z.string().min(10, {
        message: "Question must be at least 10 characters.",
    }),
    answer: z.string().min(20, {
        message: "Answer must be at least 20 characters.",
    }),
})


type Props = {
    productId: string
}
export function FAQResponseForm({ productId }: Props) {
    const form = useForm<z.infer<typeof faqFormSchema>>({
        resolver: zodResolver(faqFormSchema),
        defaultValues: {
            productId,
            question: "",
            answer: "",
        },
    })

    function onSubmit(values: z.infer<typeof faqFormSchema>) {
        console.log(values)
        toast({
            title: "FAQ Submitted",
            description: "Thank you for your submission. We'll review it shortly.",
        })
        form.reset()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-teal-600 mb-6">Submit a New FAQ</h2>
                <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Question</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your question here" {...field} />
                            </FormControl>
                            <FormDescription>
                                Provide a clear and concise question.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="answer"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Answer</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter the answer here"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Provide a detailed answer to the question.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white">Submit FAQ</Button>
            </form>
        </Form>
    )
}

