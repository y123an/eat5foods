import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const content = await prisma.whyWeExistContent.findFirst({
      orderBy: { updatedAt: "desc" },
    });
    console
    return NextResponse.json(content);
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { content } = await request.json();
    const updatedContent = await prisma.whyWeExistContent.create({
      data: { content },
    });
    return NextResponse.json(updatedContent);
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}
