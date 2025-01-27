"use client";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import localFont from 'next/font/local';
import { useEffect, useState } from "react";

// Font files can be colocated inside of `app`
const gooddognew = localFont({
    src: '../../assets/fonts/gooddognew.ttf',
    display: 'swap',
});

type Slide = {
    content: JSX.Element;
    backgroundColor?: string;
};

type ReusableCarouselProps = {
    slides: Slide[];
    autoplayDelay?: number;
};

export default function CarouselWrapper({ slides, autoplayDelay = 10000 }: ReusableCarouselProps) {
    const [api, setApi] = useState<CarouselApi | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!api) return;

        const onSelect = () => {
            setActiveIndex(api.selectedScrollSnap());
        };

        api.on("select", onSelect);

        return () => {
            api.off("select", onSelect);
        };
    }, [api]);

    return (
        <Carousel
            setApi={setApi}
            plugins={[
                Autoplay({
                    delay: autoplayDelay,
                    // @ts-ignore 
                    on: (embla) => {
                        setActiveIndex(embla.selectedScrollSnap());
                    },
                }),
            ]}
        >
            <CarouselContent className="min-h-[400px]">
                {slides.map((slide, index) => (
                    <CarouselItem key={index}>
                        {/* <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${slide.backgroundColor || ''}`}> */}
                        {slide.content}
                        {/* </div> */}
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => api?.scrollTo(index)}
                        className={`h-2 rounded-full bg-muted transition-all duration-300 cursor-pointer ${activeIndex === index ? 'w-[30px] border-[0.5px] bg-white border-black' : 'w-2'}`}
                    />
                ))}
            </div>
        </Carousel>
    );
}
