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
import { useState } from "react";

import { Label } from "@/components/ui/label";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { Textarea } from "../ui/textarea";
import { ToastAction } from "../ui/toast";
import { toast } from "../ui/use-toast";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormError } from "../shared/form-error";
import { SuccessMessage } from "../shared/form-success";
import { StarFilledIcon } from "@radix-ui/react-icons";

export function RateProductForm({ productId }: { productId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMassage] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const { data: session } = useSession();

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    const data = {
      rating,
      comment,
    };
    try {
      setLoading(true);
      const result = await axios.put(`/api/products/${productId}`, data);
      if (result.status === 202) {
        toast({
          variant: "default",
          title: "Rating Completed!",
          description: (
            <div className="flex items-center p-3 space-x-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <p>Your Rating has been Submitted.</p>
            </div>
          ),
        });
      }
      setLoading(false);
      router.refresh();
    } catch (error) {
      setLoading(false);
      setError("unable to rate the product");
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: (
          <ToastAction onClick={handleSubmit} altText="Try again">
            Try again
          </ToastAction>
        ),
      });
    }
  };

  return (
    <Card className="px-5 mx-auto mt-10">
      <CardHeader className="sm:max-w-[425px]">
        <CardTitle>Rate Product</CardTitle>
        <CardDescription>
          Please rate the product and provide any feedback.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4 py-4">
        <Label>Rate this product:</Label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <StarFilledIcon
              key={value}
              className={`w-6 h-6 cursor-pointer ${value <= rating ? "text-yellow-500" : "text-gray-400"
                }`}
              onClick={() => handleRatingChange(value)}
            />
          ))}
        </div>
        <Textarea
          onChange={(e) => setComment(e.target.value)}
          placeholder="write feedback"
          className="text-left"
        />
      </CardContent>
      <SuccessMessage message={message} />
      <FormError message={error} />
      <CardFooter>
        {session ? (
          <Button disabled={loading} type="submit" onClick={handleSubmit}>
            {loading ? "Submitting..." : "Submit changes"}
          </Button>
        ) : (
          <Button type="button">
            <Link href={"/signin"}>sign in to rate </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
