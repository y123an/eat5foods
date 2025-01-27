import bcrypt from "bcryptjs";
import { userSchema } from "@/schema/user";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma-client";
import { getCurrentUser } from "@/lib/current-user";
import { sendMail } from "@/lib/mail-functions/plain-email";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { password } = body;
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exist!", type: "email" },
        { status: 400 }
      );
    }
    const result = await prisma.user.create({
      data: {
        name: validation.data.name,
        email: validation.data.email,
        phone: validation.data.phone,
        hashedPassword: hashedPassword,
        image: validation.data.image,
      },
    });
    const emailSubject = "Welcome to Our Platform!";
    const emailMessage = `
      Hi ${result.name},

      Welcome to our platform! We're excited to have you join us.
\n
      Best regards \n,
      Eat5foods
    `;
    revalidatePath("/admin/accounts", "page");
    await sendMail(result.email, emailSubject, emailMessage);
    return NextResponse.json({ message: "OK", result }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    return NextResponse.json({ message: "OK", user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

const schema = z.object({
  phone: z
    .string({ required_error: "Phone number is required" })
    .regex(
      /^(09|07|\+2519)\d{8}$|^(\+91|91)?[7-9]\d{9}$/,
      "Invalid phone number format. Please enter a valid Ethiopian phone number starting with '09' '07' or '+2519'."
    ),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "The password must be at least 8 characters long")
    .max(32, "The password must be a maximum 32 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/,
      "password must contain Uppercase, lowercase, symbol and number  "
    ),
});

export async function PUT(request: NextRequest, { params }: any) {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return NextResponse.json({ message: "forbidden" }, { status: 401 });
  const body = await request.json();
  try {
    const validation = schema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    // Update user details
    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        phone: validation.data.phone,
        hashedPassword: await bcrypt.hash(validation.data.password, 12),
      },
    });

    // Send email notification
    const emailMessage = `
    <p>Hi ${updatedUser.name},</p>
    <p>Your account has been updated.</p>
    <p>Best regards,</p>
    <p>Eat5foods Admin</p>
  `;

    const emailResponse = await sendMail(
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
