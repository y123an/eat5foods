import { getCurrentUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
  const id = params.id;
  try {
    const result = await prisma.product.findFirst(id);
    return NextResponse.json({ message: "OK", result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

// rate
export async function PUT(request: NextRequest, { params }: any) {
  const id = params.id;
  const user = await getCurrentUser();

  if (!user)
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });

  const { rating, comment } = await request.json();

  try {
    // Check if the user has already rated the product
    const existingRating = await prisma.rate.findFirst({
      where: {
        userId: user.id,
        productId: id,
      },
    });

    if (existingRating) {
      // If the user has already rated the product, update their existing rating
      const updatedRating = await prisma.rate.update({
        where: {
          id: existingRating.id,
        },
        data: {
          value: rating,
          comment,
        },
      });

      return NextResponse.json(
        { message: "Rating updated", result: updatedRating },
        { status: 200 }
      );
    } else {
      // If the user hasn't rated the product yet, add a new rating
      const newRating = await prisma.rate.create({
        data: {
          value: rating,
          comment,
          User: {
            connect: {
              id: user.id,
            },
          },
          Product: {
            connect: {
              id,
            },
          },
        },
      });

      return NextResponse.json(
        { message: "New rating added", result: newRating },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
