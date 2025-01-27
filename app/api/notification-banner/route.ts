import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const banner = await prisma.notificationBanner.findFirst({
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json(banner);
  } catch (error) {
    console.error("Error fetching notification banner:", error);
    return NextResponse.json(
      { error: "Error fetching notification banner" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { content } = await request.json();
    const updatedBanner = await prisma.notificationBanner.create({
      data: { content },
    });
    return NextResponse.json(updatedBanner);
  } catch (error) {
    console.error("Error updating notification banner:", error);
    return NextResponse.json(
      { error: "Error updating notification banner" },
      { status: 500 }
    );
  }
}
