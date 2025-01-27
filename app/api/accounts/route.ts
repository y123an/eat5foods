import { getCurrentUser } from "@/lib/current-user";
import { sendMail } from "@/lib/mail-functions/plain-email";
import { prisma } from "@/lib/prisma-client";
import { hashPassword, randomPassword } from "@/lib/utils";
import { accountSchema } from "@/schema/account";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return NextResponse.json({ message: "forbidden" }, { status: 401 });
  try {
    const body = await request.json();

    // Validate the incoming request body
    const validation = accountSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    // Check if user with provided email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists!", type: "email" },
        { status: 400 }
      );
    }

    const password = randomPassword();

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the user
    const createdUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        hashedPassword: hashedPassword,
        role: validation.data.role,
      },
    });

    const emailMessage = `
      <p>Hi ${createdUser.name},</p>
      <b>Your login password is: ${password}</b>
      <p>Your account has been created successfully.</p>
      <p>For security reasons, please consider updating your password.</p>
      <p>Best regards,</p>
      <p>Eat Five Foods Admin</p>
    `;

    await sendMail(createdUser.email, "Account Added ", emailMessage);

    return NextResponse.json(
      { message: "OK", result: createdUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Error creating user", error },
      { status: 500 }
    );
  }
}
