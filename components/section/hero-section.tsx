"use client";
import Image from "next/image";
import CustomButton from "../shared/custom-button";
import { Ban } from "lucide-react";
import { SlideData } from "@/types/slider";
import CarouselWrapper from "../shared/caroucel-slider";
import { useRouter } from "next/navigation";

type HeroSectionProps = {
    slidesData: SlideData[];
};

export default function HeroSection({ slidesData }: HeroSectionProps) {
    const router = useRouter();
    const slides = slidesData.map((slide) => ({
        content: (
            <div className={`w-full h-[70vh] flex flex-col-reverse md:flex-row justify-between ${slide.bgColor} p-4 md:p-12`}>
                <div className="space-y-4 md:w-1/2">
                    {slide.badgeText && (
                        <div
                            className={`inline-block ${slide.badgeColor} text-white text-xs font-bold py-1 px-3 rounded-sm mb-4 relative`}
                        >
                            {slide.badgeText}
                            <div className="absolute -right-2 top-0 h-full w-3 skew-x-[20deg]"></div>
                        </div>
                    )}
                    <h1
                        className="text-2xl md:text-4xl font-extrabold tracking-tight"
                        style={{ color: slide.textColor }}
                    >
                        {slide.title}
                    </h1>
                    {slide.subtitle && (
                        <p className="text-md md:text-lg font-bold" style={{ color: slide.textColor }}>
                            {slide.subtitle}
                        </p>
                    )}

                    {slide.features && (
                        <div className="flex flex-col md:flex-row md:space-x-5">
                            {slide.features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <Ban className="text-white" />
                                    <p className="text-white font-medium">{feature}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {slide.buttonText && (
                        <CustomButton
                            fill={slide.textColor}
                            title={slide.buttonText}
                            onClick={() => router.push(slide.buttonLink)}
                        />
                    )}
                </div>
                <div className="w-full md:w-1/2 mb-4 md:mb-0 flex justify-center md:justify-end">
                    <Image
                        src={slide.imageUrl}
                        width={600}
                        height={600}
                        alt={slide.imageAlt}
                        className="rounded-lg w-full md:w-auto object-cover mt-8 md:mt-0"
                        style={{ aspectRatio: "600/400", objectFit: "cover" }}
                    />
                </div>
            </div>
        ),
        backgroundColor: slide.bgColor,
    }));

    return <CarouselWrapper slides={slides} autoplayDelay={10000} />;
}
