"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import useCartStore from '@/hooks/use-cart';
import { toRupee } from '@/lib/currency-formater';
import { Trash } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from "react";
export function CartSidebar() {
    const { isCartOpen, toggleCart, removeFromCart, increaseCartItemQuantityBy, items, clearCart } = useCartStore()
    const router = useRouter()
    const itemTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const deliveryFee = 0
    const grandTotal = itemTotal + deliveryFee

    return (
        <Sheet open={isCartOpen} onOpenChange={toggleCart}>
            <SheetContent
                side="right" className="w-full sm:max-w-xl ">
                <SheetHeader className="p-6 border-b">
                    <div className="flex items-center justify-between">
                        <SheetTitle>Your items ({items.length} items)</SheetTitle>
                    </div>
                </SheetHeader>

                {items.length > 0 && <>
                    <ScrollArea className="h-[calc(100vh-200px)] p-6 ">
                        <div className="py-4 space-y-6">

                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-4">
                                        <div className="relative w-16 h-16 overflow-hidden rounded-md">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{item.name}</h3>
                                            <div className='flex items-center space-x-3'>

                                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                                <Select
                                                    onValueChange={(e) => increaseCartItemQuantityBy(item.id, parseInt(e))}
                                                >
                                                    <SelectTrigger className="w-[60px]">
                                                        <SelectValue placeholder={item.quantity} />
                                                    </SelectTrigger>
                                                    <SelectContent className="w-[60px]">
                                                        {Array.from({ length: 100 }).map((_, index) => (
                                                            <SelectItem value={`${index + 1}`} key={index}>{index + 1}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <p className="font-bold">{toRupee(item.price)}</p>
                                        </div>
                                        <Button className="md:hidden" variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                                            <Trash className="w-4 h-4 " />
                                        </Button>
                                        <Button className="hidden md:flex" variant="ghost" size="sm" onClick={() => removeFromCart(item.id)}>
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollArea>

                    <div className="flex w-full items-center  p-6 mb-3">
                        <div className='flex flex-col items-start w-1/2'>
                            <span className='font-bold text-xs sm:text-lg text-dark-green'>{toRupee(grandTotal)}</span>
                            <Link className='underline text-xs text-pink-800' href={'/shop/payment/price-detail'}>View Price details</Link>
                        </div>

                        <Button

                            onClick={() => {
                                toggleCart();
                                router.push('/shop/checkout')
                            }}
                            className="w-1/2 md:w-full " size="sm">
                            Continue
                        </Button>

                    </div>
                </>
                }
                {
                    items.length == 0 && <div className=' p-4 flex items-center justify-center flex-col space-y-10'>
                        <p>Your cart is empty</p>
                        <Button onClick={() => {
                            toggleCart();
                            router.push('/shop')
                        }}>Browse foods</Button>
                    </div>
                }

            </SheetContent>
        </Sheet>
    )
}