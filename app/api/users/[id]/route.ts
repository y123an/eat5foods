import { sendMail } from "@/lib/mail-functions/plain-email";
import { prisma } from "@/lib/prisma-client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: any) {
  const id = params.id;
  try {
    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {},
    });
    const emailSubject = "Account Disabled Notification";
    const emailMessage = `
  Hi ${result.name},

  We want to confirm that your account has been successfully deleted from our platform.

  If you didn't request this action, please contact our support team immediately.

  Best regards,
Eat Five Foods
`;
    await sendMail(result.email, emailSubject, emailMessage);
    revalidatePath("/admin/accounts", "page");
    return NextResponse.json({ message: "OK", result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
