import { getCurrentUser } from "@/lib/current-user";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Verify the response from PhonePe
    const isVerified = verifyPhonePeResponse(body);
    if (!isVerified) {
      throw new Error("Invalid PhonePe response");
    }

    const currentUser = await getCurrentUser();
    if (!currentUser)
      return NextResponse.json({ message: "forbidden" }, { status: 401 });

    // Extract order details from the request body
    const { merchantTransactionId, amount, code, customerInfo, cartItems } =
      body;
    const amountInRupees = parseFloat(amount) / 100;

    // Create a new transaction log
    const transactionLog = await prisma.transactionLog.create({
      data: {
        transactionId: merchantTransactionId,
        status: code === "PAYMENT_SUCCESS" ? "SUCCESS" : "FAILED",
        amount: amountInRupees,
        orderId: merchantTransactionId,
      },
    });

    // If payment was successful, create new orders and payment records
    if (code === "PAYMENT_SUCCESS") {
      // Create orders for each product in the cart
      const orders = await Promise.all(
        cartItems.map(async (item: any) => {
          return prisma.order.create({
            data: {
              userId: currentUser.id,
              productId: item.id,
              quantity: item.quantity,
              status: "NOT_DELIVERED",
              totalPrice: item.price * item.quantity,
              transactionLogId: transactionLog.id,
            },
          });
        })
      );

      // Create a payment record
      const payment = await prisma.payment.create({
        data: {
          userId: currentUser.id,
          orderId: orders[0].id, // Linking to the first order, you might want to handle this differently for multiple orders
          amount: amountInRupees,
          paymentMethod: "PhonePe",
          transactionLogId: transactionLog.id,
        },
      });

      return NextResponse.json({
        success: true,
        orderIds: orders.map((order) => order.id),
      });
    } else {
      return NextResponse.json({ success: false, error: "Payment failed" });
    }
  } catch (error) {
    console.error("Error processing PhonePe callback:", error);
    return NextResponse.json(
      { error: "Failed to process PhonePe callback" },
      { status: 500 }
    );
  }
}

function verifyPhonePeResponse(body: any): boolean {
  // TODO: Implement proper verification logic
  // This should include checking the signature or any other security measures
  // provided by PhonePe to ensure the response is genuine
  return true;
}
