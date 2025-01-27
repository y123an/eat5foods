"use client"

import { useEffect, useState } from "react"
import { CarouselApi } from "../ui/carousel"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { reviews } from "@/constants/reviews"
import { ChevronLeft, ChevronRight } from "lucide-react"
import IconButton from "../shared/icon-button"
import TestimonialCard from "../cards/testimonial-card"

export default function FlipCardSection() {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    const nextSlide = () => {
        if (api) {
            api.scrollNext()
        }
    }

    const prevSlide = () => {
        if (api) {
            api.scrollPrev()
        }
    }

    return (
        <div className="mx-auto max-w-full px-4 py-12">
            <Carousel setApi={setApi} className="w-full max-w-screen-xl">
                <CarouselContent>
                    {reviews.map((review) => (
                        <CarouselItem key={review.id}>
                            <TestimonialCard
                                quote={review.quote}
                                name={review.name}
                                title={review.title}
                                imageUrl={review.imageUrl}
                                details={review.details}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious>
                    <IconButton
                        icon={<ChevronLeft />}
                        onClick={prevSlide}
                        disabled={current === 1}
                        aria-label="Previous review"
                    />
                </CarouselPrevious>
                <CarouselNext>
                    <IconButton
                        icon={<ChevronRight />}
                        onClick={nextSlide}
                        disabled={current === count}
                        aria-label="Next review"
                    />
                </CarouselNext>
            </Carousel>
        </div>
    )
}
