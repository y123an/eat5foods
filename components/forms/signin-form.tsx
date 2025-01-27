"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FormError } from "../shared/form-error";
import Spinner from "../shared/spinner";
import { Label } from "../ui/label";
import { ToastAction } from "../ui/toast";
const formSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(2, {
      message: "Email must be at least 2 characters.",
    }),
  password: z.string({
    required_error: "password is required",
  }),
});

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get("callbackUrl") || "/";
  const router = useRouter();
  const [error, setError] = useState<string | undefined>(undefined);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const submitHandler = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const loggingStatus = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (!loggingStatus?.ok) {
        setLoading(false);
        setError(loggingStatus?.error || " Invalid Email and password");
      } else router.push(callBackUrl);
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };
  return (
    <main>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className=" w-full p-5 dark:bg-slate-950 dark:text-white  space-y-8"
        >
          <FormError message={error} />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="dark:bg-slate-800 dark:text-slate-200 "
                    placeholder="Email address"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="dark:bg-slate-800 dark:text-slate-200"
                    type="password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" disabled={loading} type="submit">
            {loading && <Spinner />} {loading ? "Authenticating..." : "sign in"}{" "}
          </Button>

          <Link
            className="flex hover:underline justify-end  text-sm "
            href="/forget-password"
          >
            forget your password?{" "}
          </Link>
          <Label>
            Don&apos;t have account
            <Link href="/sign-up">
              <Button className="dark:text-indigo-400" variant="link">
                Sign up
              </Button>
            </Link>
          </Label>
        </form>
      </Form>
    </main>
  );
};

export default SignInForm;
