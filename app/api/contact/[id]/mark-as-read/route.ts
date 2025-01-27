import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma-client";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updatedMessage = await prisma.contact.update({
      where: { id: params.id },
      data: { seen: true },
    });

    return NextResponse.json({ success: true, message: updatedMessage });
  } catch (error) {
    console.error("Error marking message as read:", error);
    return NextResponse.json(
      { success: false, error: "Error marking message as read" },
      { status: 500 }
    );
  }
}
