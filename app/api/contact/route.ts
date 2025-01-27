import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, name, email, message, contactNumber, type } = body;

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        subject: `${type} - Order ID: ${orderId}`,
        message: `${message}\n\nContact Number: ${contactNumber}`,
      },
    });

    return NextResponse.json({ success: true, contact });
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      { success: false, error: "Error creating contact" },
      { status: 500 }
    );
  }
}
