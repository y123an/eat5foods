import { getCurrentUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma-client";
import { uploadFile } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.formData();
  const file = body.get("file") as File;

  const user = await getCurrentUser();

  if (!user)
    return NextResponse.json({ message: "Un authorized" }, { status: 401 });
  try {
    const url = await uploadFile(file);
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        image: url.url,
      },
    });
    revalidatePath("/shop", "layout");
    console.log(updatedUser);
    return NextResponse.json({ message: "OK", updatedUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
