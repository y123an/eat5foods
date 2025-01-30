import { prisma } from "@/lib/prisma-client";
import { supabaseClient } from "@/lib/supabase";
import { SUPABASE_FOLDER_URL } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const name = formData.get("author") as string;
  const description = formData.get("comment") as string;
  const image = formData.get("image") as File | null;

  let imageUrl: string | null = null;

  if (image) {
    const filename = `reviews-ratings-${uuidv4()}`;
    const { data, error } = await supabaseClient.storage
    .from("Eat5Foods/categories")
    .upload(filename, image);

    if (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Failed to upload image", error: error.message },
        { status: 500 }
      );
    }

    imageUrl = `${SUPABASE_FOLDER_URL}/categories/${data.path}`;
  }

  try {
    const newRating = await prisma.platformRating.create({
      data: {
        author: name,
        rating:5,
        authorImage: imageUrl || "",
        comment: description,
      },
    });

    return NextResponse.json(
      { message: "Rating created successfully", rating: newRating },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error creating Rating", error: error },
      { status: 500 }
    );
  }
}
