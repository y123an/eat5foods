"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

export default function RateUsForm() {
    const { data: session } = useSession();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (session) {
            fetchExistingRating();
        }
    }, [session]);

    const fetchExistingRating = async () => {
        try {
            const response = await fetch("/api/testimonials/platform");
            if (response.ok) {
                const data = await response.json();
                setRating(data.rating);
                setComment(data.comment);
            }
        } catch (error) {
            console.error("Error fetching existing rating:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!session) {
            toast({
                title: "Error",
                description: "You must be logged in to submit a rating.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/testimonials/platform", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    rating,
                    comment,
                }),
            });

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Your rating has been submitted.",
                });
            } else {
                throw new Error("Failed to submit rating");
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit rating. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 w-full max-w-3xl mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-md rounded-lg"
        >
            <div className="flex items-center space-x-2 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`cursor-pointer w-5 h-5  ${star <= rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                            }`}
                        onClick={() => setRating(star)}
                    />
                ))}
            </div>
            <Textarea
                placeholder="Share your thoughts about the platform..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 sm:p-4 text-sm sm:text-base border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[120px] sm:min-h-[150px]"
            />
            <div className="flex justify-center">
                <Button
                    type="submit"
                    disabled={!rating || loading}
                    className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
                >
                    {loading ? "Submitting..." : "Submit Rating"}
                </Button>
            </div>
        </form>
    );
}
