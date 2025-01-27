import { prisma } from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  try {
    const [transactions, total] = await Promise.all([
      prisma.transactionLog.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          payments: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
          orders: {
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
            },
          },
        },
      }),
      prisma.transactionLog.count(),
    ]);

    const formattedTransactions = transactions.map((transaction) => ({
      id: transaction.id,
      transactionId: transaction.transactionId,
      status: transaction.status,
      amount: transaction.amount,
      orderId: transaction.orderId,
      createdAt: transaction.createdAt.toISOString(),
      updatedAt: transaction.updatedAt.toISOString(),
      payment: transaction.payments[0]
        ? {
            id: transaction.payments[0].id,
            userId: transaction.payments[0].userId,
            amount: transaction.payments[0].amount,
            paymentDate: transaction.payments[0].paymentDate.toISOString(),
            paymentMethod: transaction.payments[0].paymentMethod,
            user: transaction.payments[0].user,
          }
        : null,
      order: transaction.orders[0]
        ? {
            id: transaction.orders[0].id,
            productId: transaction.orders[0].productId,
            userId: transaction.orders[0].userId,
            quantity: transaction.orders[0].quantity,
            status: transaction.orders[0].status,
            totalPrice: transaction.orders[0].totalPrice,
            product: transaction.orders[0].product,
            user: transaction.orders[0].user,
          }
        : null,
    }));

    return NextResponse.json({
      transactions: formattedTransactions,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { message: "Error fetching transactions" },
      { status: 500 }
    );
  }
}
