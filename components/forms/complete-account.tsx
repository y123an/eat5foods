"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormError } from "../shared/form-error";
import Spinner from "../shared/spinner";
import { ToastAction } from "../ui/toast";
import { toast } from "../ui/use-toast";

const schema = z
  .object({
    phone: z
      .string({ required_error: "Phone number is required" })
      .regex(
        /^(09|07|\+2519)\d{8}$/,
        "Invalid phone number format. Please enter a valid Ethiopian phone number starting with '09' '07' or '+2519'."
      ),

    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, "The password must be at least 8 characters long")
      .max(32, "The password must be a maximum 32 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/,
        "password must contain Uppercase, lowercase, symbol and number  "
      ),

    confirmPassword: z.string().min(8),
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

export default function CompleteAccount() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<string | undefined>(undefined);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const submitHandler = async (data: z.infer<typeof schema>) => {
    try {
      setLoading(true);
      const response = await axios.put("/api/users", data);

      if (response.status === 200) {
        toast({
          description: "Your account has been updated successfully.",
        });
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: (
          <ToastAction onClick={() => submitHandler(data)} altText="Try again">
            Try again
          </ToastAction>
        ),
      });
      setError("Error completing account. Please try again.");
    }
  };

  return (
    <div className="mx-auto w-full md:w-2/3  min-h-screen space-y-6">
      <div>
        <Button
          className="p-3 rounded-md"
          onClick={() => router.push("/shop")}
        >
          Skip this Process{" "}
        </Button>
      </div>

      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Complete Your Account</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Fill out the form below to complete account.
        </p>
      </div>
      <FormError message={error} />
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(submitHandler)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input className="" placeholder="phone numbers" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        className=" "
                        placeholder="************"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        className=""
                        placeholder="************"
                        {...field}
                        type="password"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button className="w-1/2 sm:w-2/3 md:w-1/3" type="submit">
            {loading && <Spinner />}
            {loading ? "completing..." : "Complete Account"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
