"use client";
import { toRupee } from "@/lib/currency-formater";
import { discountedPrice } from "@/lib/utils";
import { FormattedProduct } from "@/types/product";
import { Clock, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
    products: FormattedProduct[];
};

export default function RecipeShowCase({ products }: Props) {

    return (
        <div className="bg-pink-500 min-h-screen py-12 ">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-white text-center mb-8">
                    Let&apos;s make something
                    <br />
                    healthier together
                </h1>
                <div className="relative">
                    {/* Scrollable Product List */}
                    <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
                        {products.map((product, index) => (
                            <div key={index} className="min-w-[300px] bg-white flex flex-col justify-between rounded-lg overflow-hidden shadow-lg">
                                <div className="relative">
                                    <Image
                                        src={product.imageUrl}
                                        alt={product.name}
                                        width={150}
                                        height={150}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <Link href={`/shop/${product.id}`} className="text-white font-bold text-lg leading-tight">
                                            {product.name.split(" ").map((word, i) => (
                                                <span
                                                    key={i}
                                                    className={`inline-block ${i % 2 === 0 ? "text-yellow-300" : "text-pink-300"}`}
                                                >
                                                    {word}{" "}
                                                </span>
                                            ))}
                                        </Link>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                                    <div className="flex items-center mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>

                                    <div>
                                        <div className="flex items-center text-gray-600 mb-4">
                                            <Clock className="w-4 h-4 mr-1" />
                                            <span className="text-sm">{toRupee(discountedPrice(product.price, product.discount || 0))}</span>
                                        </div>
                                        <Link href={`/shop/${product.id}`} >
                                            <button className="w-full bg-[#192d1e] text-white py-2 rounded-md hover:bg-green-700 transition-colors">
                                                View Product
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </div>
    );
}
