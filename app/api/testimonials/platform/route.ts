import { getCurrentUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { rating, comment } = await req.json();

  try {
    const existingRating = await prisma.platformRating.findFirst({
      where: { userId: user.id },
    });

    let newRating;

    if (existingRating) {
      // Update existing rating
      newRating = await prisma.platformRating.update({
        where: { id: existingRating.id },
        data: {
          rating,
          comment,
        },
      });
    } else {
      // Create new rating
      newRating = await prisma.platformRating.create({
        data: {
          rating,
          comment,
          author: user.name,
          authorImage: user.image || "",
          userId: user.id,
        },
      });
    }

    return NextResponse.json(newRating, { status: 201 });
  } catch (error) {
    console.error("Error creating/updating rating:", error);
    return NextResponse.json(
      { message: "Error creating/updating rating" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const userRating = await prisma.platformRating.findFirst({
      where: { userId: user.id },
    });

    if (userRating) {
      return NextResponse.json(userRating);
    } else {
      return NextResponse.json({ message: "No rating found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching rating:", error);
    return NextResponse.json(
      { message: "Error fetching rating" },
      { status: 500 }
    );
  }
}
