import UpdateRatingForm from "@/components/forms/update-rating-form";
import { prisma } from "@/lib/prisma-client";
import { notFound } from "next/navigation";

export default async function Page({ params }: {
    params: { id: string };
}) {
    const id = params.id;
    if (!id) return notFound();
    const ratingInfo = await prisma.platformRating.findFirst({ where: { id } });
    if (!ratingInfo) return notFound();
    return <UpdateRatingForm ratingInfo={ratingInfo} />
}