import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { prisma } from "@/lib/prisma-client";
import { StarIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { RateProductForm } from "../forms/rating-form";

type Props = {
    productId: string
}

export default async function ProductReview({ productId }: Props) {
    if (!productId) return notFound();
    const rates = await prisma.rate.findMany({
        where: {
            productId
        },
        include: {
            User: true,
            Product: true
        }
    });
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="grid w-full grid-cols-1 items-center justify-center gap-6 sm:grid-cols-2 md:gap-12">
                    {rates.map((rate, index) => (
                        <div key={index} className="space-y-2">
                            <div className="inline-flex items-center space-x-2">
                                <Avatar>
                                    <AvatarImage
                                        src={rate.User?.image || ""}
                                    />
                                    <AvatarFallback>
                                        {rate.User?.name.substring(0, 1)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="space-y-0">
                                    <h3 className="text-lg font-bold">{rate.User?.name}</h3>
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(Math.round(rate.value))].map((_, i) => (
                                            <StarIcon key={i} className="w-4 h-4 fill-primary" />
                                        ))}
                                        {[...Array(5 - Math.round(rate.value))].map((_, i) => (
                                            <StarIcon key={i} className="w-4 h-4 fill-muted stroke-muted-500" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 md:text-base lg:text-xl xl:text-base/relaxed dark:text-gray-400">
                                {rate.comment}
                            </p>
                        </div>
                    ))}
                </div>
                <RateProductForm productId={productId} />
            </section>
        </div>
    );
}
