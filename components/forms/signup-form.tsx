"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from '@supabase/supabase-js';
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from 'react-dropzone';
import { z } from "zod";
import { Edit, Camera } from 'lucide-react';

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
import { Progress } from "@/components/ui/progress";
import { userSchema } from "@/schema/user";
import BackButton from "../shared/back-button";
import { FormError } from "../shared/form-error";
import Spinner from "../shared/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { ToastAction } from "../ui/toast";
import { toast } from "../ui/use-toast";
import Image from "next/image";

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

type Props = {
  googleMapsApiKey: string;
};

const AvatarUpload = ({ onUploadComplete }: { onUploadComplete: (url: string) => void }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    try {
      setUploading(true);
      setUploadProgress(0);

      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Delete existing file if there's a preview
      if (previewUrl) {
        const existingFilePath = new URL(previewUrl).pathname.split('/').pop();
        if (existingFilePath) {
          await supabase.storage.from('Eat5Foods').remove([`users/${existingFilePath}`]);
        }
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `users/${fileName}`;

      // Custom upload function with progress
      const uploadWithProgress = async (file: File, path: string) => {
        return new Promise<string>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('POST', `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/Eat5Foods/${path}`);
          xhr.setRequestHeader('Authorization', `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`);

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const percentComplete = (event.loaded / event.total) * 100;
              setUploadProgress(Math.round(percentComplete));
            }
          };

          xhr.onload = () => {
            if (xhr.status === 200) {
              resolve(path);
            } else {
              reject(new Error('Upload failed'));
            }
          };

          xhr.onerror = () => reject(new Error('Upload failed'));

          const formData = new FormData();
          formData.append('file', file);
          xhr.send(formData);
        });
      };

      const uploadedPath = await uploadWithProgress(file, filePath);

      const { data: { publicUrl } } = supabase.storage
        .from('Eat5Foods')
        .getPublicUrl(uploadedPath);

      onUploadComplete(publicUrl);
      toast({
        title: "Image uploaded successfully",
        description: "Your profile image has been uploaded.",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was a problem uploading your image.",
      });
    } finally {
      setUploading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    handleFileUpload(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const handleEdit = () => {
    fileInputRef.current?.click();
  };

  if (previewUrl) {
    return (
      <div className="relative w-32 h-32 mx-auto">
        <Image
          src={previewUrl}
          alt="Profile Preview"
          width={128}
          height={128}
          className="rounded-full object-cover"
        />
        <button
          onClick={handleEdit}
          className="absolute bottom-0 right-0 p-1 bg-primary text-primary-foreground rounded-full shadow-md"
        >
          <Edit size={16} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div {...getRootProps()} className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Camera className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
            <p className="text-xs text-gray-500 dark:text-gray-400">Upload Avatar</p>
          </div>
          <input {...getInputProps()} id="dropzone-file" type="file" className="hidden" />
        </label>
      </div>
      {uploadProgress > 0 && uploadProgress < 100 && (
        <Progress value={uploadProgress} className="w-full" />
      )}
    </div>
  );
};

const SignupForm = ({ googleMapsApiKey }: Props) => {
  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get("callbackUrl") || "/";
  const [error, setError] = useState<string | undefined>();
  const [buttonText, setButtonText] = useState("Sign up");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
  });

  const onUploadComplete = (url: string) => {
    setImageUrl(url);
    form.setValue('image', url)
  };

  const submitHandler = async (data: z.infer<typeof userSchema>) => {
    if (!imageUrl) {
      setError("Please upload a profile image before signing up.");
      return;
    }

    try {
      setLoading(true);
      setButtonText("Signing up ...");
      const result = await axios.post("/api/users", data);
      if (result.status === 201) {
        try {
          setButtonText("Authenticating...");
          const loggingStatus = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
          });
          if (loggingStatus?.ok) {
            router.push(callBackUrl);
          }
        } catch (error) {
          router.push("/sign-in");
        }
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        if (
          error.response?.status === 400 &&
          error.response?.data.type === "email"
        ) {
          setError("The email address already exists.");
          toast({
            variant: "destructive",
            title: "Email Already Taken!",
            description: "The email address already exists.",
          });
        } else {
          setError("Uh oh! Something went wrong");
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      }
    }
  };

  return (
    <Card className="mb-12">
      <div className="my-2 p-2 mx-auto ">
        <BackButton />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="p-5 md:p-20 gap-6 md:gap-10 dark:bg-slate-950 dark:text-white space-y-8"
        >
          <CardHeader>
            <CardTitle>Sign up for Eat FIVE Foods</CardTitle>
            <CardDescription>Fill the form and join us!</CardDescription>
          </CardHeader>
          <div className="mx-auto md:w-1/2">
            <FormError message={error} />
          </div>
          <CardContent className="space-y-8">
            <AvatarUpload onUploadComplete={onUploadComplete} />
            {!imageUrl && (
              <p className="text-red-500 text-center">Please upload a profile image before signing up.</p>
            )}
            <div className="grid md:grid-cols-2 gap-10">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        className="dark:bg-slate-800 dark:text-slate-200"
                        placeholder="Full Name"
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
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        className="dark:bg-slate-800 dark:text-slate-200"
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
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        className="dark:bg-slate-800 dark:text-slate-200"
                        placeholder="+91---"
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
                        placeholder="**************"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>

          <CardFooter className="w-full sm:w-2/3 md:h-1/2 mx-auto flex flex-col gap-3">
            <Button
              className="w-full sm:w-2/3 md:h-1/2"
              disabled={loading || !imageUrl}
              type="submit"
            >
              {loading && <Spinner />} {buttonText}
            </Button>
            <Label>
              Already have an account?
              <Link href="/sign-in">
                <Button variant="link"> Sign in </Button>
              </Link>
            </Label>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default SignupForm;