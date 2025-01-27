import { getCurrentUser } from "@/lib/current-user";
import { sendMail } from "@/lib/mail-functions/plain-email";
import { prisma } from "@/lib/prisma-client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface Item {
  id: string;
  name: string;
  count: number;
  price: number;
  variationId?: string;
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const { items, location }: { items: Item[]; location: string } =
      await request.json();
    if (!Array.isArray(items)) {
      throw new Error("Invalid request body: 'items' must be an array");
    }
    console.log("Items", items);
    const orders = await Promise.all(
      items.map(async (item) => {
        let productPrice = item.price;
        let productQuantity = item.count;

        // If a variationId is provided, use the variation's price and update its stock
        if (item.variationId) {
          const variation = await prisma.productVariation.findUnique({
            where: { id: item.variationId },
          });
          if (variation) {
            productPrice = variation.price;
            await prisma.productVariation.update({
              where: { id: item.variationId },
              data: {
                stock: {
                  decrement: item.count,
                },
              },
            });
          }
        }

        const order = await prisma.order.create({
          data: {
            productId: item.id,
            quantity: productQuantity,
            totalPrice: productPrice * productQuantity,
            userId: user.id,
            payments: {
              create: [
                {
                  userId: user.id,
                  amount: productPrice * productQuantity,
                  paymentMethod: "PhonePe Payment",
                },
              ],
            },
          },
          include: {
            payments: true,
          },
        });

        // Only if there's no variation (variations handle their own stock)
        if (!item.variationId) {
          await prisma.product.update({
            where: { id: item.id },
            data: {
              quantity: {
                decrement: item.count,
              },
            },
          });
        }

        return order;
      })
    );

    const totalAmount = items.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
    const paymentEmailSubject = "Payment Confirmation";
    const paymentEmailMessage = `
      Hi ${user.name},

      Your payment has been successfully processed for the following orders:
      ${items
        .map((item) => `${item.name} (${item.count} x ${item.price} Birr)`)
        .join("\n")}

      Total amount: ${totalAmount} Birr

      Thank you for your purchase!

      Best regards,
      Eat Five Foods
    `;

    await sendMail(user.email, paymentEmailSubject, paymentEmailMessage);

    await cookies().delete("paymentId");
    return NextResponse.json({ message: "OK", orders }, { status: 201 });
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
