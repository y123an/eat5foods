import OrdersList from "@/components/pages/order-list";
import { prisma } from "@/lib/prisma-client";

export default async function OrdersPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const page = Number(searchParams.page) || 1;
    const limit = 10;
    const status = searchParams.status as string | undefined;

    let where = {};
    if (status && status !== "ALL") {
        where = { status: status as any };
    }

    const orders = await prisma.order.findMany({
        where,
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                },
            },
            product: {
                select: {
                    name: true,
                },
            },
            TransactionLog: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
    });

    const totalOrders = await prisma.order.count({ where });
    const totalPages = Math.ceil(totalOrders / limit);

    return (
        <OrdersList
            initialOrders={orders}
            totalPages={totalPages}
            currentPage={page}
        />
    );
}