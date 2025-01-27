"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma-client";

export const deleteOrder = async (form: FormData) => {
  try {
    await prisma.order.delete({
      where: {
        id: form.get("id") as string,
      },
    });
    revalidatePath("/shop/orders", "page");
  } catch (error) {
    throw new Error("Something goes wrong");
  }
};
