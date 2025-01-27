"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { FormError } from "@/components/shared/form-error";
import { SuccessMessage } from "@/components/shared/form-success";
import BackButton from "@/components/shared/back-button";

const FormSchema = z
  .object({
    token: z.string().optional(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [massage, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const resetToken = searchParams.get("token");

  // @ts-ignore
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      token: resetToken || "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const response = await axios.put("/api/public", data);
      setMessage(response.data.massage);
      router.push("/sign-in");
    } catch (error) {
      setLoading(false);

      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    }
  }

  return (
    <main className="w-full h-screen mx-auto flex items-center justify-center">
      <Card className="max-w-sm mx-auto border border-gray-200 shadow-sm dark:border-gray-800">
        <div className="my-2 p-2  flex items-center space-x-2 ">
          <BackButton />
          <p>Back </p>
        </div>
        <CardHeader className="p-6">
          <div className="space-y-2 text-center">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Reset Password
            </CardTitle>
            <FormError message={error} />
            <SuccessMessage message={massage} />
            <CardDescription>
              Enter your new password below to reset your password
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter new password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={loading} type="submit">
                {loading ? "Setting..." : "Set Password"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
