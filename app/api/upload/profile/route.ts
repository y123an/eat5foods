import { getCurrentUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma-client";
import { uploadFile } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ message: "forbidden" }, { status: 401 });
  const body = await request.formData();
  const file = body.get("file") as File;

  try {
    const fileUrl = await uploadFile(file);

    if (!fileUrl) {
      return NextResponse.json(
        { message: "Unable to upload file" },
        { status: 500 }
      );
    }

    // Update the user's image URL in the database
    const updatedUser = await prisma.user.update({
      where: { id: user?.id },
      data: {
        image: fileUrl.url,
      },
    });

    revalidatePath("/my-account", "page");
    revalidatePath("/admin/settings", "page");

    return NextResponse.json(
      { message: "OK", url: updatedUser.image },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
