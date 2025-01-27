"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { CircleDashed, Home, Minus, Plus, Wallet2, ZoomIn } from "lucide-react"
import { Category, Ingredient, NutritionalFact, Product, ProductVariation, Rate, Image as TypeImage } from "@prisma/client"

import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "../ui/button"
import FrequentlyBoughtItems from "./frequently-bought-items"

import useCartStore from "@/hooks/use-cart"
import { toRupee } from "@/lib/currency-formater"
import { gooddogFont } from "@/lib/local-font"
import { cn, discountedPrice } from "@/lib/utils"

type Props = {
    product: (Product & {
        image: TypeImage[];
        rate: Rate[];
        nutritionalFacts: NutritionalFact[],
        ingredients: Ingredient[],
        productVariation: ProductVariation[]
    });
    category: Category;
    similarProducts: (Product & {
        image: TypeImage[];
        rate: Rate[];
        nutritionalFacts: NutritionalFact[],
        ingredients: Ingredient[],
        productVariation: ProductVariation[]
    })[];
}

export default function ProductShowcase({ product, category, similarProducts }: Props) {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [zoomIconShown, setZoomShown] = useState(false);
    const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(
        product.productVariation.length > 0 ? product.productVariation[0] : null
    );

    const { addToCart, increaseCartItemQuantity, decreaseCartItemQuantity, items } = useCartStore();

    useEffect(() => {
        if (product.productVariation.length > 0) {
            setSelectedVariation(product.productVariation[0]);
        }
    }, [product.productVariation]);

    // Find the existing item in the cart
    const cartItem = items.find(item =>
        item.id === product.id &&
        (selectedVariation ? item.variationId === selectedVariation.id : item.variationId === undefined)
    );
    const itemQuantity = cartItem ? cartItem.quantity : 0;

    const handleAddToCart = () => {
        if (selectedVariation) {
            addToCart({
                id: product.id,
                image: product.image[0].url,
                name: product.name,
                price: selectedVariation.price,
                quantity: 1,
                variation: {
                    price: selectedVariation.price,
                    stock: selectedVariation.stock,
                    sku: selectedVariation.sku as string
                },
                variationId: selectedVariation.id
            });
        } else {
            addToCart({
                id: product.id,
                name: product.name,
                image: product.image[0].url,
                price: product.price,
                quantity: 1,
                variation: {
                    price: product.price,
                    stock: 0,
                    sku: ""
                }
            });
        }
    };

    const handleIncreaseQuantity = () => {
        if (selectedVariation) {
            increaseCartItemQuantity(product.id, selectedVariation.id);
        } else {
            increaseCartItemQuantity(product.id);
        }
    };

    const handleDecreaseQuantity = () => {
        if (itemQuantity > 0) {
            if (selectedVariation) {
                decreaseCartItemQuantity(product.id, selectedVariation.id);
            } else {
                decreaseCartItemQuantity(product.id);
            }
        }
    };

    return (
        <div className="bg-[#e33675] min-h-screen p-4 pt-14 ">
            <main className="flex flex-col md:flex-row gap-5 ">
                {/* Left Side: Product Images */}
                <div className="flex flex-col md:flex-row space-x-6 ">
                    <div className="flex  relative flex-col ">
                        {zoomIconShown &&
                            <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
                                <DialogTrigger asChild>
                                    {<Button size={'icon'} className="absolute top-10 left-5 p-2 bg-white rounded-full shadow-md">
                                        <ZoomIn className="w-4 h-4 text-gray-500" />
                                    </Button>}
                                </DialogTrigger>
                                <DialogContent className="max-w-full h-full flex items-center justify-center">
                                    <Image
                                        src={product.image[currentImageIndex].url}
                                        alt="Product"
                                        width={200}
                                        height={200}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </DialogContent>
                            </Dialog>}
                        <Image
                            onMouseOver={() => setZoomShown(true)}
                            src={product.image[currentImageIndex].url}
                            width={200}
                            height={200}
                            alt="Product" className="w-[380px]  rounded-md max-h-[423px] flex-1 h-auto"
                        />
                        <div className=" p-4 flex space-x-3 justify-center items-center">
                            {Array.from({ length: product.image.length }).map((_, index) => (
                                <div onClick={() => {
                                    setCurrentImageIndex(index)
                                    setCurrentSlide(index)

                                }} className={`w-5 h-5  cursor-pointer  rounded-full border-2 ${currentSlide === index ? 'bg-white' : ''}  `} key={index} />
                            ))}
                        </div>
                    </div>
                    {/* Feature Icons */}
                    <div className=" gap-4 flex flex-row md:flex-col ">
                        <div className="w-[140px] md:w-[182px]  h-[131px] flex flex-col  items-center  rounded-md p-[10px]  bg-[#e96293]">
                            <div className=" bg-yellow-500 w-[64px]  h-[64px] rounded-full flex items-center justify-center ">
                                <Home className="text-white" />
                            </div>
                            <p className="text-white text-xs md:text-sm">Rich in Protein  </p>
                        </div>
                        <div className="w-[140px] md:w-[182px]  flex flex-col justify-center items-center  h-[131px] rounded-md p-[10px]  bg-[#e96293]">
                            <div className=" bg-[#9b33e3] w-[64px]  h-[64px] rounded-full flex items-center justify-center ">
                                <Wallet2 className="text-white" />
                            </div>
                            <p className="text-white text-xs md:text-sm">No Refined Sugar</p>
                        </div>
                        <div className="w-[140px] md:w-[182px]  flex flex-col justify-center items-center  h-[131px] rounded-md p-[10px]  bg-[#e96293]">
                            <div className=" bg-[#09744b] w-[64px]  h-[64px] rounded-full flex items-center justify-center ">
                                <CircleDashed className="text-white" />
                            </div>
                            <p className="text-white text-xs md:text-sm">On-the-go Snack</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Product Details */}
                <div className="md:w-1/2 p-4 md:p-8 text-white">
                    <div className="text-sm breadcrumbs mb-4">
                        <ul className=" flex space-x-2">
                            <li className="underline"><Link href="/shop">Home/</Link></li>
                            <li className="underline"><Link href={`/shop/categories/${category.id}`}>{category.name}/</Link></li>
                            <li className="underline">{product.name}</li>
                        </ul>
                    </div>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold mr-2">{toRupee(discountedPrice(product.price, product.discount))}</span>
                        <span className=" font-bold line-through">{toRupee(product.price)}</span>
                    </div>
                    {product.discount > 0 && <div className={cn(gooddogFont.className, "bg-yellow-400 text-black font-bold inline-block px-2 py-1 rounded mb-4")}>Save {product.discount}%</div>}
                    <p className="text-sm mb-4">{product.description}</p>

                    {/* Ingredients */}
                    <ul className="list-disc list-inside mb-4">
                        <h2>Made up of</h2>
                        {product.ingredients.map((ing) => (
                            <li key={ing.id}>{ing.name}</li>
                        ))}
                    </ul>

                    {/* Select Variation */}
                    {product.productVariation.length > 0 && (
                        <div className="mb-4">
                            <h3 className="font-bold mb-2">Select Variation</h3>
                            <Select
                                value={selectedVariation?.id}
                                onValueChange={(value) => setSelectedVariation(product.productVariation.find(v => v.id === value) || null)}
                            >
                                <SelectTrigger className="w-full text-black">
                                    <SelectValue className="text-black" placeholder="Choose a variation" />
                                </SelectTrigger>
                                <SelectContent>
                                    {product.productVariation.map((variation) => (
                                        <SelectItem key={variation.id} value={variation.id}>
                                            {variation.sku}: {toRupee(variation.price)} - {variation.stock} in stock
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {/* Add to Cart / Quantity Controls */}
                    <div className="flex items-center space-x-4 mb-4">
                        {itemQuantity > 0 ? (
                            <div className="flex items-center p-2 px-5 rounded-full border">
                                <button onClick={handleDecreaseQuantity} >
                                    <Minus />
                                </button>
                                <span className="px-4">{itemQuantity}</span>
                                <button onClick={handleIncreaseQuantity} >
                                    <Plus />
                                </button>
                            </div>
                        ) : (
                            <Button onClick={handleAddToCart} size="lg" className=" text-white">
                                Add to Cart
                            </Button>
                        )}
                    </div>

                    {similarProducts.length > 0 && <div className="mt-10">
                        {/* @ts-ignore  */}
                        <FrequentlyBoughtItems similarProducts={similarProducts} />
                    </div>}
                </div>
            </main>
        </div>
    );
}