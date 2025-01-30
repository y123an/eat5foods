import bcrypt from "bcryptjs";
import { userSchema } from "@/schema/user";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma-client";
import { getCurrentUser } from "@/lib/current-user";
import { sendMail } from "@/lib/mail-functions/plain-email";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export async function GET() {
    try {
      const users = await prisma.user.findMany();
      return NextResponse.json({ success: true, users });
    } catch (error) {
      console.error("Error fetching products:", error);
      return NextResponse.json(
        { success: false, error: "Error fetching products" },
        { status: 500 }
      );
    }
  }
