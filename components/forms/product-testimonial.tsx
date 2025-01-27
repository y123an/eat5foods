'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from 'axios'

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    authorBio: z.string().min(10, {
        message: "Author bio must be at least 10 characters.",
    }),
    message: z.string().min(20, {
        message: "Message must be at least 20 characters.",
    }),
    videoURL: z.string().url().optional().or(z.literal('')),
})

export default function TestimonialForm() {
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

            title: "",
            authorBio: "",
            message: "",
            videoURL: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        try {
            const response = await axios.post('/api/testimonials', values)
            if (response.status === 200) {
                toast({
                    title: "Success",
                    description: 'Testimonial submitted successfully!',
                })
                form.reset()
            } else {
                throw new Error('Submission failed')
            }
        } catch (error) {
            console.error('Error submitting testimonial:', error)
            toast({
                title: "Error",
                description: 'Error submitting testimonial. Please try again.',
                variant: 'destructive',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="max-w-3xl border-none  min-h-screen shadow-none mx-auto my-10">
            <CardHeader>
                <CardTitle>Submit a Testimonial</CardTitle>
                <CardDescription>Share your experience with our products or services.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Testimonial title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="authorBio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Author Bio</FormLabel>
                                    <FormControl>
                                        <Input placeholder="A brief description about yourself" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Your testimonial message" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="videoURL"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Video URL (optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://example.com/your-video" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        If you have a video testimonial, please provide the URL here.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit Testimonial'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}