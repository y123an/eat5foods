import OffersSection from "@/components/section/offer-section";
import { prisma } from "@/lib/prisma-client";
import { FormattedProduct } from "@/types/product";

export default async function Page() {
    const products = await prisma.product.findMany({
        orderBy: {
            discount: 'desc'
        },
        include: {
            image: true,
            rate: true,
            Category: true
        },
        take: 3
    });

    const formattedProducts: FormattedProduct[] = products.map(product => ({
        id: product.id,
        name: product.name,
        imageUrl: product.image[0].url,
        altText: product.name,
        price: product.price,
        discount: product.discount,
        description: product.description,
        badge: "New",
        rating: product.rate.length
    }));

    return (
        <main>
            <OffersSection product={formattedProducts} />
        </main>
    );
}