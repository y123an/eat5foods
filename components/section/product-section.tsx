"use client";
import { products } from "@/constants/products";
import { useState, useRef } from "react";
import IconButton from "../shared/icon-button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { FormattedProduct } from "@/types/product";
import Link from "next/link";

type Props = {
    Products: FormattedProduct[]
};

export default function ProductSection({ Products }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const nextSlide = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 200, // Adjust to match the card width
                behavior: "smooth",
            });
        }
        if (currentIndex < products.length - 4) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const prevSlide = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -200, // Adjust to match the card width
                behavior: "smooth",
            });
        }
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    return (
        <div className="bg-[#FFF5F5]  px-4 py-10">
            <div className="container mx-auto relative">
                {/* Previous Button */}
                <div
                    onClick={prevSlide}
                    className={`absolute w-12 cursor-pointer -left-4 top-1/2 transform -translate-y-1/2 z-10 ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    aria-label="Previous product"
                >
                    <IconButton icon={<ChevronLeft />} disabled={currentIndex === 0} />
                </div>

                {/* Carousel with Scrollable and Snap */}
                <div className="overflow-x-auto hide-scrollbar scroll-smooth" ref={scrollContainerRef}>
                    <div
                        className="flex space-x-4 transition-transform duration-300 ease-in-out"
                        style={{
                            scrollSnapType: "x mandatory",
                        }}
                    >


                        {Products.map((product, index) => (
                            <Link
                                href={`/shop/${product.id}`}
                                key={product.id}
                                style={{ backgroundColor: index % 2 === 0 ? "#DF3FAF" : "#491c2e" }}
                                className="w-[200px] shadow-2xl rounded-xl flex-shrink-0 scroll-snap-align-start"
                            >
                                <div className="flex flex-col z-0 relative">
                                    <Image
                                        src={product.imageUrl}
                                        alt={product.altText}
                                        className="w-full h-2/3 rounded-t-xl"
                                        width="300"
                                        height="200"
                                        style={{
                                            aspectRatio: "300/200",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <Badge
                                        className="absolute z-10 top-2 right-2"
                                        style={{ backgroundColor: product.backgroundColor }}
                                    >
                                        New
                                    </Badge>
                                    <div className="flex justify-between p-2">
                                        <Link href={`/shop/${product.id}`}
                                            className="text-sm text-white">
                                            {product.name}
                                        </Link>
                                        <div className="bg-[#be88a7] w-5 h-5 flex items-center justify-center rounded-full">
                                            <ArrowRight color="#fff" className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Next Button */}
                <div
                    onClick={nextSlide}
                    className={`absolute w-12 cursor-pointer -right-4 top-1/2 transform -translate-y-1/2 z-10 ${currentIndex >= products.length - 4 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    aria-label="Next product"
                >
                    <IconButton
                        icon={<ChevronRight />}
                        disabled={currentIndex >= products.length - 4}
                    />
                </div>
            </div>
        </div>
    );
}
