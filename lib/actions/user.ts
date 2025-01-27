"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma-client";

export const deleteUser = async (form: FormData) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: form.get("id") as string,
      },
    });
    console.log(deletedUser);
    revalidatePath("/admin/customers", "page");
  } catch (error) {
    console.log(error);
  }
};
