"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { useSession } from "next-auth/react";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import { toast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { FormError } from "./form-error";
import { SuccessMessage } from "./form-success";

export function RateProduct({
  currentRate,
  productId,
}: {
  currentRate: number;
  productId: string;
}) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
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
    <main className="">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="icon"
            variant="secondary"
            className=" flex items-center justify-center text-center mr-2 group-hover:opacity-100 cursor-pointer transition-opacity"
          >
            <StarFilledIcon className="w-4 h-4 mr-1 mt-1 text-yellow-500" />
            {currentRate}
          </Button>
        </DialogTrigger>
        {session && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Rate Product</DialogTitle>
              <DialogDescription>
                Please rate the product and provide any feedback. Click submit
                when finished.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
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
            </div>
            <SuccessMessage message={message} />
            <FormError message={error} />
            <DialogFooter>
              <Button disabled={loading} type="submit" onClick={handleSubmit}>
                {loading ? "Submitting..." : "Submit changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
        {!session && (
          <>
            <DialogContent className="p-5">
              <DialogHeader>
                <DialogTitle>Rate Product</DialogTitle>
                <DialogDescription>
                  Please <Badge variant="destructive">signin</Badge> to rate the
                  product and provide any feedback?
                </DialogDescription>
              </DialogHeader>
              <Button>
                <Link href="/signin" className="w-full">
                  Signin to rate{" "}
                </Link>
              </Button>
            </DialogContent>
          </>
        )}
      </Dialog>
    </main>
  );
}
