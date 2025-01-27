import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mail-functions/plain-email";
import { prisma } from "@/lib/prisma-client";

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { message: "This email does not exist!" },
        { status: 400 }
      );
    } else {
      // Generate a unique token for password reset
      const resetToken = uuidv4();

      // Update user record in the database with the reset token
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken,
        },
      });

      const resetLink =
        process.env.NODE_ENV === "production"
          ? `https://eat5foods.vercel.app/reset-password?token=${resetToken}`
          : `http://localhost:3000/reset-password?token=${resetToken}`;
      // Compose the email message
      const emailSubject = "Password Reset Request";
      const emailMessage = `
        Hi ${user.name},

        You have requested to reset your password. Please click on the following link to reset your password:
        ${resetLink}

        If you did not request this, you can ignore this email.

        Best regards,
        Eat Five Foods Team
      `;

      // Send the password reset email
      const result = await sendMail(email, emailSubject, emailMessage);
      console.log(result);
      return NextResponse.json(
        {
          message: "Email sent, check your inbox for the password reset link.",
          result,
        },
        { status: 202 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const { token, password } = await request.json();
  try {
    // Find user by reset token
    const user = await prisma.user.findFirst({ where: { resetToken: token } });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token!" },
        { status: 400 }
      );
    } else {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Update user's password and clear the reset token
      await prisma.user.update({
        where: { id: user.id },
        data: { hashedPassword: hashedPassword, resetToken: null },
      });

      return NextResponse.json(
        { message: "Password updated successfully!" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
