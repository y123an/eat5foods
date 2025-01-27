import { prisma } from "@/lib/prisma-client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: any) {
  const id = params.id;
  const { isPopular } = await request.json();
  try {
    const result = await prisma.product.update({
      where: {
        id,
      },
      data: {
        isPopular,
      },
    });
    revalidatePath("/admin/products", "page");
    return NextResponse.json({ message: "OK", result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
