import { ProductCard } from "@/components/cards/product-card";
import ProfileSection from "@/components/section/profile-section";
import ReviewSection from "@/components/section/review-section";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CardBgColors } from "@/constants/colors";
import { generateMetadata } from "@/lib/meta-data";
import { prisma } from "@/lib/prisma-client";
import { FormattedProduct } from "@/types/product";
import { Suspense } from "react";

export const metadata = generateMetadata({
    title: " Explore Eat5Food Popular  Products"
})



export default async function PopularProductsPage() {
    const products = await prisma.product.findMany({
        where: {
            isPopular: true
        },
        include: {
            image: true,
            rate: true,
            Category: true,
            productVariation: true
        },
        orderBy: {
            rate: {
                _count: 'desc'
            }
        },
        take: 10
    });

    const formattedProducts: FormattedProduct[] = products.map((product, index) => ({
        id: product.id,
        name: product.name,
        imageUrl: product.image[0]?.url || '/placeholder.svg',
        altText: product.name,
        price: product.price,
        discount: product.discount || undefined,
        description: product.description,
        badge: "New",
        rating: product.rate.length,
        backgroundColor: CardBgColors[index % CardBgColors.length],
        variation: product.productVariation[0] ? {
            price: product.productVariation[0].price,
            stock: product.productVariation[0].stock,
            sku: product.productVariation[0].sku as string
        } : undefined,
        variationId: product.productVariation[0]?.id
    }));

    const popularProducts = formattedProducts.slice(0, 6);
    const PlatformReviews = await prisma.platformRating.findMany({
        include: {
            User: true
        }
    })

    return (
        <main>
            <section className=" py-12">

                {popularProducts.length > 0 && (
                    <div className="px-6">
                        <h2 className="text-2xl font-bold text-center my-7">Popular  Products </h2>

                        <Suspense fallback={<p>Loading Products...</p>}>


                            <ScrollArea className="w-full whitespace-nowrap">
                                <div className="flex w-max space-x-4 p-4">
                                    {popularProducts.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                                <ScrollBar className="text-[#491c2e]" orientation="horizontal" />
                            </ScrollArea>
                        </Suspense>
                    </div>
                )}
                <ProfileSection users={PlatformReviews.slice(0, 10)} />

                <ReviewSection />
            </section>
        </main>
    );
}