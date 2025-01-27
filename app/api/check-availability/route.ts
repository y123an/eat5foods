import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma-client";

interface Item {
  id: string;
  name: string;
  count: number;
}

interface ProductInfo {
  name: string;
  availableQuantity: number;
}

async function checkProductAvailability(items: Item[]): Promise<ProductInfo[]> {
  const unavailableProducts: ProductInfo[] = [];

  for (const item of items) {
    const product = await prisma.product.findUnique({
      where: { id: item.id },
    });

    if (!product || product.quantity < item.count) {
      const availableQuantity = product ? product.quantity : 0;
      unavailableProducts.push({ name: item.name, availableQuantity });
    }
  }

  return unavailableProducts;
}

export async function POST(request: NextRequest) {
  try {
    const { items }: { items: Item[] } = await request.json();
    if (!Array.isArray(items)) {
      throw new Error("Invalid request body: 'items' must be an array");
    }

    const unavailableProducts = await checkProductAvailability(items);
    console.log(unavailableProducts);
    return NextResponse.json({ unavailableProducts }, { status: 200 });
  } catch (error) {
    console.error("Error checking product availability:", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
