import { prisma } from "@/lib/prisma-client";
import { notFound } from "next/navigation";
import UserDetailPage from "./_components";

export default async function Page({ params }: {
    params: { id: string };
}) {
    const id = params.id;
    if (!id) return notFound();
    const userInfo = await prisma.user.findFirst({
        where: { id },
        include: {
            addresses: true,

        }
    });
    const userOrders = await prisma.order.findMany({
        where: {
            userId: id
        }
    })
    if (!userInfo) return notFound();
    return (
        <main>
            <UserDetailPage
                userOrders={userOrders}
                userInfo={userInfo}
            />
        </main>
    );
}