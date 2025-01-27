import { getCurrentUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma-client";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const { title, authorBio, message, videoURL } = body;

    const testimonial = await prisma.testimonial.create({
      data: {
        title,
        authorBio,
        message,
        videoURL,
        User: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return NextResponse.json({ success: true, testimonial });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { success: false, error: "Error creating testimonial" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      include: {
        User: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { success: false, error: "Error fetching testimonials" },
      { status: 500 }
    );
  }
}
