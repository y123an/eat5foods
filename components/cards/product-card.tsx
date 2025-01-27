"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CardBgColors } from "@/constants/colors";
import useCartStore from "@/hooks/use-cart";
import { FormattedProduct } from "@/types/product";
import { ArrowRight, Minus, Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const ProductCard: React.FC<{ product: FormattedProduct }> = ({ product }) => {
    const { addToCart, increaseCartItemQuantity, decreaseCartItemQuantity, items } = useCartStore();
    const cartItem = items.find(item => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            image: product.imageUrl,
            price: product.price,
            quantity: 1,
            variation: product.variation ? {
                price: product.variation.price,
                stock: product.variation.stock,
                sku: product.variation.sku,
            } : {
                price: product.price,
                stock: 0,
                sku: '',
            },
            variationId: product.variationId
        });
    };

    const handleIncreaseQuantity = () => {
        increaseCartItemQuantity(product.id, product.variationId);
    };

    const handleDecreaseQuantity = () => {
        decreaseCartItemQuantity(product.id, product.variationId);
    };

    return (
        <Card
            key={product.id}
            style={{ backgroundColor: product.backgroundColor === "#FFFFFF" ? '#046A38' : '#491C2E' }}
            className="w-[260px] flex flex-col justify-between relative">
            {product.badge && (
                <Badge className="absolute bg-[#046A38] top-2 left-2">
                    {product.badge}
                </Badge>
            )}
            <Image
                src={product.imageUrl}
                alt={product.altText}
                className="w-full h-auto rounded-t-md"
                width={300}
                height={200}
                style={{ aspectRatio: "300/200", objectFit: "cover" }}
            />
            <CardContent className="p-4 text-white">
                <Link
                    className="cursor-pointer"
                    href={`/shop/${product.id}`}>
                    <h3>{product.name}</h3>
                </Link>
                <p className="text-sm">
                    {product.discount && (
                        <span className="line-through">{product.discount}</span>
                    )}{" "}
                    {product.price} {product.discount && `(${product.discount})`}
                </p>
                <div className="flex my-3">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-5 h-5 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                    ))}
                </div>
                <p className="text-xs w-full text-wrap mx-2 sm:text-sm md:text-base">{product.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between p-4">
                {quantity > 0 ? (
                    <div className="flex w-full items-center ">
                        <Button onClick={handleDecreaseQuantity} className="w-full rounded-none border-[0.5px] border-slate-500">
                            <Minus size={16} />
                        </Button>
                        <Button variant={'outline'} className="black-white w-full rounded-none border-[0.5px] border-slate-500">{quantity}</Button>
                        <Button onClick={handleIncreaseQuantity} className="w-full rounded-none border-[0.5px] border-slate-500">
                            <Plus size={16} />
                        </Button>
                    </div>
                ) : (
                    <Button onClick={handleAddToCart} className={`w-full rounded-r-lg`} variant="default">
                        ADD TO CART
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export const SmallProductCard: React.FC<{ product: FormattedProduct }> = ({ product }) => {
    const randomBgColor = CardBgColors[Math.floor(Math.random() * CardBgColors.length)];

    return (
        <Card
            key={product.id}
            style={{ backgroundColor: product.backgroundColor }}
            className="h-[220px] w-[144px] relative flex flex-col justify-between">
            <Image
                src={product.imageUrl}
                alt={product.altText}
                className="w-[200px] h-2/3 rounded-t-md"
                width="300"
                height="200"
                style={{ aspectRatio: "300/200", objectFit: "cover" }}
            />
            <Badge className="absolute top-2 right-2" style={{ backgroundColor: randomBgColor || '#046A38' }}>New</Badge>
            <CardFooter className="flex justify-between p-2">
                <Link
                    className="cursor-pointer"
                    href={`/shop/${product.id}`}>
                    <h3 className="text-sm text-white">{product.name.substring(0, 6)}</h3>
                </Link>

                <div className="bg-[#be88a7] w-5 h-5 flex items-center justify-center rounded-full">
                    <Link
                        className="cursor-pointer"

                        href={`/shop/${product.id}`}>
                        <ArrowRight color="#fff" className="w-4 h-4" />
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
};
