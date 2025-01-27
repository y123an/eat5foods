"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import BackButton from "@/components/shared/back-button";
import { FormError } from "@/components/shared/form-error";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { accountSchema } from "@/schema/account";
import { Role } from "@prisma/client";
import { handleSuccess } from "@/lib/toast-util";

type Props = {
    name: string;
    id: string;
    email: string;
    role: Role;
    phone: string,

};

export type accountSchemaType = z.infer<typeof accountSchema>;

export default function UpdateAccountForm({
    id,
    name,
    email,
    role,
    phone,

}: Props) {
    const router = useRouter();
    const [error, setError] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);
    const form = useForm<accountSchemaType>({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            name: name,
            email: email,
            role: role,
            phone: phone
        },
    });

    const submitHandler = async (data: accountSchemaType) => {
        try {
            setLoading(true);
            await axios.put(`/api/accounts/${id}`, data);
            setLoading(false);
            router.refresh();
            router.push("/admin/accounts");
            handleSuccess("Account Updated successfully", "update")
        } catch (error) {
            setLoading(false);
            if (axios.isAxiosError(error)) {
                if (
                    error.response?.status === 400 &&
                    error.response?.data.type === "email"
                ) {
                    setError("The email address is already exist.");
                } else {
                    setError("Uh oh! Something went wrong");
                }
            }
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)}>
                <Card>
                    <div className="p-3">
                        <FormError message={error} />
                    </div>
                    <CardHeader>
                        <BackButton />
                        <CardTitle>Update Account</CardTitle>
                        <CardDescription>Enter all the fields properly.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-7">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col space-y-1.5">
                                        <FormLabel>Full name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="Full Name "
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col space-y-1.5">
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="email address"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col space-y-1.5">
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="phone number +91"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col space-y-1.5">
                                        <FormLabel>Account Role </FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Account Role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="ADMIN">Admin</SelectItem>
                                                    <SelectItem value="USER">User</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                        </div>
                    </CardContent>
                    <CardFooter className="justify-start">
                        <Button disabled={loading} size="lg">
                            {loading && <Spinner />} Update account
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}
