"use server";

import { prisma } from "@/lib/prisma-client";
import { revalidatePath } from "next/cache";

export async function submitContact(formData: FormData) {
  try {
    const contact = await prisma.contact.create({
      data: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        subject: formData.get("subject") as string,
        message: formData.get("message") as string,
      },
    });

    revalidatePath("/shop/contact", "page");
    return { success: true, contact };
  } catch (error) {
    console.error("Failed to submit contact form:", error);
    return { success: false, error: "Failed to submit contact form" };
  }
}

export async function submitTestimonial(formData: FormData) {
  try {
    const testimonial = await prisma.testimonial.create({
      data: {
        title: formData.get("title") as string,
        authorBio: formData.get("authorBio") as string,
        message: formData.get("message") as string,
        videoURL: formData.get("videoURL") as string,
        productId: formData.get("productId") as string,
        userId: formData.get("userId") as string,
      },
    });

    revalidatePath("/shop/testimonials", "page");
    return { success: true, testimonial };
  } catch (error) {
    console.error("Failed to submit testimonial:", error);
    return { success: false, error: "Failed to submit testimonial" };
  }
}
