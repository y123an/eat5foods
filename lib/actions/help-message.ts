"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../prisma-client";

export const saveHelpMassage = async (form: FormData) => {
  try {
    const message = await prisma.contact.create({
      data: {
        name: form.get("name") as string,
        email: form.get("email") as string,
        subject: form.get("topic") as string,
        message: form.get("message") as string,
      },
    });
    revalidatePath("/shop", "page");
  } catch (error) {
    throw new Error(" Unexpected error happen");
  }
};
