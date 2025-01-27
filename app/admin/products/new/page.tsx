import ProductForm from "@/components/forms/product-form";
import { prisma } from "@/lib/prisma-client";

export default async function Page() {
    const categories = await prisma.category.findMany({
        select: {
            name: true,
            id: true,
            image: true
        }
    })
    return <main className="">
        <ProductForm categories={categories} />
    </main>
}