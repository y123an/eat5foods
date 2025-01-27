import { getCurrentUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma-client";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: any) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const id = params.id;
  const { quantity } = await request.json();
  try {
    const result = await prisma.order.update({
      where: { id },
      data: {
        quantity: parseInt(quantity),
      },
    });

    return NextResponse.json({ message: "OK", result }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: any) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = params.id;
  const { status } = await request.json();
  console.log(status);
  try {
    const result = await prisma.order.update({
      where: { id },
      data: {
        status: status as OrderStatus,
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json({ message: "OK", result }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
