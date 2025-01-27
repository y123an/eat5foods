import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getCurrentUser } from "@/lib/current-user";

const MOCK_MODE = process.env.MOCK_PHONEPE === "true";

export async function POST(request: NextRequest) {
  try {
    const { customerInfo, cartItems } = await request.json();

    const currentUser = await getCurrentUser();
    if (!currentUser)
      return NextResponse.json({ message: "forbidden" }, { status: 401 });

    // Calculate total amount
    const total = cartItems.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    // Generate a unique transaction ID
    const transactionId = `TXN_${Date.now()}`;

    // Prepare the payload for PhonePe API
    const payload = {
      merchantId: process.env.PHONEPAY_MERCHANT_ID,
      merchantTransactionId: transactionId,
      merchantUserId: currentUser.id,
      amount: total * 100, // PhonePe expects amount in paise
      redirectUrl: `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/api/phone-pay-callback?orderInfo=${encodeURIComponent(
        JSON.stringify({ customerInfo, cartItems })
      )}`,
      redirectMode: "POST",
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/phone-pay-callback`,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    let paymentUrl;

    if (MOCK_MODE) {
      // Mock success mode
      paymentUrl = `/api/mock-phone-pay?transactionId=${transactionId}&amount=${payload.amount}`;
    } else {
      // Real PhonePe integration
      const checksum = generateChecksum(payload);

      // Make a request to PhonePe API to create a payment
      const response = await axios.post(
        "https://api.phonepe.com/apis/hermes/pg/v1/pay",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "X-VERIFY": checksum,
          },
        }
      );

      paymentUrl = response.data.data.instrumentResponse.redirectInfo.url;
    }

    // Return the payment URL to the client
    return NextResponse.json({ paymentUrl });
  } catch (error) {
    console.error("Error initiating PhonePe payment:", error);
    return NextResponse.json(
      { error: "Failed to initiate PhonePe payment" },
      { status: 500 }
    );
  }
}

// Implement this function based on PhonePe's documentation
function generateChecksum(payload: any): string {
  // TODO: Implement checksum generation
  return "checksum";
}
