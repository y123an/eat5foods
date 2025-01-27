import { getCurrentUser } from "@/lib/current-user";
import { sendMail } from "@/lib/mail-functions/plain-email";
import { prisma } from "@/lib/prisma-client";
import { accountSchema } from "@/schema/account";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(request: NextRequest, { params }: any) {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return NextResponse.json({ message: "forbidden" }, { status: 401 });
  const id = params.id;
  try {
    const result = await prisma.user.delete({
      where: { id },
    });
    revalidatePath("/admin/accounts", "page");
    return NextResponse.json({ message: "OK", result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: any) {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return NextResponse.json({ message: "forbidden" }, { status: 401 });
  const id = params.id;
  const body = await request.json();
  try {
    const validation = accountSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    // Check if the user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });
    if (!existingUser) {
      return NextResponse.json(
        { message: "User not found", type: "not_found" },
        { status: 404 }
      );
    }

    // Check if the provided email already exists for another user
    if (body.email !== existingUser.email) {
      const emailExists = await prisma.user.findFirst({
        where: { email: body.email },
      });
      if (emailExists) {
        return NextResponse.json(
          { message: "Email already exists", type: "email" },
          { status: 400 }
        );
      }
    }

    // Update user details
    const updatedUser = await prisma.user.update({
      where: { id },
      data: body,
    });
    revalidatePath("/admin/accounts", "page");
    // Send email notification
    const emailMessage = `
    <p>Hi ${updatedUser.name},</p>
    <p>Your account has been updated.</p>
    <p>For security reasons, please consider reviewing your account details.</p>
    <p>Best regards,</p>
    <p>Eat Five Foods Admin</p>
  `;

    await sendMail(
      updatedUser.email,
      "Account Updated Successfully",
      emailMessage
    );

    return NextResponse.json(
      { message: "OK", result: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Error updating user", error },
      { status: 500 }
    );
  }
}
