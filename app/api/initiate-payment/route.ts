import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/current-user";

export async function POST(request: NextRequest) {
  try {
    const { customerInfo, cartItems } = await request.json();

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ message: "forbidden" }, { status: 401 });
    }

    // Calculate total amount
    const total = cartItems.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    // Generate a unique transaction ID
    const transactionId = `TXN_${Date.now()}`;

    // Create mock payload
    const mockPayload = {
      merchantId: "MOCK_MERCHANT_ID",
      merchantTransactionId: transactionId,
      merchantUserId: currentUser.id,
      amount: total * 100,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const paymentUrl = `/api/phone-pay-callback?transactionId=${transactionId}&amount=${mockPayload.amount}`;

    // Return the mock payment URL and payload to the client
    return NextResponse.json({
      paymentUrl: paymentUrl,
      mockPayload,
    });
  } catch (error) {
    console.error("Error creating mock PhonePe payment:", error);
    return NextResponse.json(
      { error: "Failed to create mock PhonePe payment" },
      { status: 500 }
    );
  }
}
