"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { ShoppingCart, Trash, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import Image from "next/image";
import useCartStore from "@/hooks/use-cart";
import { ScrollArea } from "@/components/ui/scroll-area";

type CardProps = React.ComponentProps<typeof Card>;

export function CartListCard({ className, ...props }: CardProps) {
  const { items, removeFromCart, clearCart, loadCart } = useCartStore();
  useEffect(() => {
    loadCart();
  }, [loadCart]);
  return (
    <ScrollArea>
      <Card
        className={cn("w-[380px] min-h-full overflow-y-scroll", className)}
        {...props}
      >
        <CardHeader>
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <ShoppingCart />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Total Items in the cart
              </p>
            </div>
          </div>
          <CardDescription>
            {items.length > 0 ? `You have ${items.length}` : "Empty cart"}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            {items.map((item, index) => (
              <div
                key={index}
                className="mb-4 flex justify-between items-start pb-4 last:mb-0 last:pb-0"
              >
                <div className="flex items-center space-x-2">
                  <Image
                    src={item.image}
                    width={50}
                    height={50}
                    alt={item.name.substring(0.1)}
                    className="flex h-10 w-10 rounded items-center"
                  />

                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {item.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.name}</p>
                  </div>
                </div>
                <Button
                  onClick={() => removeFromCart(item.id)}
                  variant="outline"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          {items.length > 0 && (
            <Button
              onClick={clearCart}
              variant="destructive"
              className="w-full"
            >
              <Trash className="mr-2 h-4 w-4" />
              Clear your cart
            </Button>
          )}
          {items.length > 0 && (
            <Button className="w-full">
              <Link className="w-full" href="/shop/checkout">
                Checkout
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </ScrollArea>
  );
}
