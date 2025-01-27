
import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import UserSettingOption from "./_components";
import { prisma } from "@/lib/prisma-client";

export default async function AdminSettingPage() {
    const user = await getCurrentUser();
    if (!user) return redirect("/sign-in");
    const orders = await prisma.order.findMany({
        where: {
            userId: user.id,
        },
        include: {
            product: true,
            TransactionLog: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return <UserSettingOption orders={orders} user={user} />

}
