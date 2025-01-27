import UpdateProductForm from "@/components/forms/update-product-form";
import { prisma } from "@/lib/prisma-client";
import { notFound } from "next/navigation";

export default async function Page({ params }: {
    params: { id: string };
}) {
    const id = params.id;
    if (!id) return notFound();
    const categories = await prisma.category.findMany({
        select: {
            name: true,
            id: true,
            image: true
        }
    })



    const ProductDetail = await prisma.product.findFirst({
        where: { id },
        include: {
            image: {
                select: {
                    id: true,
                    url: true,
                }
            },
            ingredients: true,
            nutritionalFacts: true,
            nonIngredient: true,
            testimonials: true,
            productVariation: true

        }
    })
    if (!ProductDetail) return notFound();
     return (
        <UpdateProductForm
            categories={categories}
            productDetail={{
                ...ProductDetail,
            }}
        />
    );
}
