import { getCurrentUser } from "@/lib/current-user";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const { amount } = await req.json();
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  try {
    const txRef = uuidv4();
    const result = await axios({
      method: "POST",
      url: "https://api.chapa.co/v1/transaction/initialize",
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      data: {
        amount: amount,
        currency: "ETB",
        email: user.email,
        first_name: user.name.split(" ")[0],
        last_name: user.name.split(" ")[1],
        tx_ref: txRef,
        callback_url:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://eat5foods.app/",
        return_url:
          process.env.NODE_ENV === "development"
            ? `http://localhost:3000/shop/payment/complete/${txRef}`
            : `https://eat5foods.app/shop/payment/complete/${txRef}`,
        "customization[title]": "Pay with Eat Five Foods shop using CHAPA",
        "customization[description]": "I love online payments",
      },
    });

    await cookies().set("paymentId", txRef, { secure: true });
    return NextResponse.json(
      {
        message: "OK",
        checkout_url: result.data.data.checkout_url,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
