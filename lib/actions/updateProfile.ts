"use server";
import { getCurrentUser } from "../current-user";
import { revalidatePath } from "next/cache";
import { prisma } from "../prisma-client";

export const updateProfile = async (form: FormData) => {
  const user = await getCurrentUser();
  if (!user) return;
  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        phone: form.get("phone") as string,
        name: form.get("name") as string,
        email: form.get("email") as string,
      },
    });
    revalidatePath("/admin/setting", "page");
  } catch (error) {
    console.log(error);
  }
};
