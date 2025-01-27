import { prisma } from "@/lib/prisma-client";
import { supabaseClient } from "@/lib/supabase";
import { SUPABASE_FOLDER_URL } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function PUT(request: NextRequest, { params }: any) {
  const id = params.id;
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as File | null;

  let imageUrl: string | null = null;

  try {
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    if (image) {
      // Upload new image to Supabase
      const filename = `category-${uuidv4()}`;
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

      // Delete the old image from Supabase
      if (existingCategory.image) {
        const oldImagePath = existingCategory.image.replace(
          `${SUPABASE_FOLDER_URL}/categories/`,
          ""
        );
        await supabaseClient.storage
          .from("Eat5Foods/categories")
          .remove([oldImagePath]);
      }
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name,
        image: imageUrl || existingCategory.image || "",
        description,
      },
    });

    return NextResponse.json(
      { message: "Category updated successfully", category: updatedCategory },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error updating category", error: error },
      { status: 500 }
    );
  }
}

// Delete Category
export async function DELETE(request: NextRequest, { params }: any) {
  const id = params.id;
  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    // Delete image from Supabase
    if (category.image) {
      const imagePath = category.image.replace(
        `${SUPABASE_FOLDER_URL}/categories/`,
        ""
      );
      await supabaseClient.storage
        .from("Eat5Foods/categories")
        .remove([imagePath]);
    }

    // Delete category from Prisma
    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error deleting category", error: error },
      { status: 500 }
    );
  }
}
