import UpdateCategoryForm from "@/components/forms/update-category-form";
import { prisma } from "@/lib/prisma-client";
import { notFound } from "next/navigation";

export default async function Page({ params }: {
    params: { id: string };
}) {
    const id = params.id;
    if (!id) return notFound();
    const categoryInfo = await prisma.category.findFirst({ where: { id } });
    if (!categoryInfo) return notFound();
    return <UpdateCategoryForm categoryInfo={categoryInfo} />
}