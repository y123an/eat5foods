"use server";

import { revalidatePath } from "next/cache";

import axios from "axios";
import useCartStore from "@/hooks/use-cart";

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export async function initiatePhonePePayment(customerInfo: CustomerInfo) {
  const cartStore = useCartStore.getState();
  const { items } = cartStore;
  console.log("DAATA", items);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  try {
    // Generate a unique order ID
    const orderId = `ORDER_${Date.now()}`;

    // Prepare the payload for PhonePe API
    const payload = {
      merchantId: process.env.PHONEPAY_MERCHANT_ID,
      merchantTransactionId: orderId,
      merchantUserId: customerInfo.email,
      amount: total * 100, // PhonePe expects amount in paise
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/phone-pay-callback`,
      redirectMode: "POST",
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/phone-pay-callback`,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    // Generate checksum (implement this function based on PhonePe's documentation)
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

    // Clear the cart after successful payment initiation
    cartStore.clearCart();

    // Revalidate the checkout page to reflect the empty cart
    revalidatePath("/checkout");

    // Return the payment URL to the client
    return response.data.data.instrumentResponse.redirectInfo.url;
  } catch (error) {
    // console.error("Error creating PhonePe order:", error);
    throw new Error("Failed to create PhonePe order");
  }
}

// Implement this function based on PhonePe's documentation
function generateChecksum(payload: any): string {
  // TODO: Implement checksum generation
  return "checksum";
}
