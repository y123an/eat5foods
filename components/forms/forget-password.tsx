"use client";
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

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormError } from "../shared/form-error";
import { SuccessMessage } from "../shared/form-success";
import BackButton from "../shared/back-button";
const Schema = z.object({
  email: z.string().email("invalid email address"),
});
export default function ForgetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      email: "",
    },
  });
  const submitHandler = async (data: z.infer<typeof Schema>) => {
    try {
      setError(undefined);
      setLoading(true);
      setMessage(undefined);
      const result = await axios.post("/api/public", data);
      if (result.status === 202) {
        setLoading(false);
        setComplete(true);
        setMessage(result.data.message);
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      } else {
        setError("Oh no! something wants wrong.");
      }
    }
  };
  return (
    <Card className="mx-auto p-10 my-8 max-w-sm">
      <div className="my-2 p-2  flex items-center space-x-2 ">
        <BackButton />
        <p>Back to home</p>
      </div>
      <FormError message={error} />
      <SuccessMessage message={message} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Reset password</CardTitle>
            <CardDescription>
              Enter your email below to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={loading || complete}
                className="w-full"
                type="submit"
              >
                {loading
                  ? "Checking email..."
                  : complete
                    ? "Email Sent"
                    : "Reset Password"}
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Link className="hover:underline" href="/sign-in">
              {" "}
              back to login{" "}
            </Link>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
