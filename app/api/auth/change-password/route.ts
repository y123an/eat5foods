import { getCurrentUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma-client";
import { PasswordSchema } from "@/schema/password";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const currentUser = await getCurrentUser();
  const body = await request.json();

  try {
    // Get the user from the database
    const validation = await PasswordSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: currentUser?.email,
      },
    });

    // If user or password doesn't exist, create password
    if (!user || !user.hashedPassword) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(
        validation.data.currentPassword,
        12
      );

      // Create the user's password
      await prisma.user.update({
        where: { email: currentUser?.email },
        data: { hashedPassword: hashedPassword },
      });

      return NextResponse.json(
        { message: "Password created and updated successfully" },
        { status: 200 }
      );
    }

    const passwordMatch = await bcrypt.compare(
      validation.data.currentPassword,
      user.hashedPassword
    );
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(validation.data.password, 12);

    // Update the user's password
    await prisma.user.update({
      where: { email: currentUser?.email },
      data: { hashedPassword: hashedPassword },
    });

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
