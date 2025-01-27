"use client"

import { gooddogFont } from '@/lib/local-font'
import { cn } from '@/lib/utils'
import { PlatformRating } from '@prisma/client'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import IconButton from '../shared/icon-button'


type Props = {
    reviews: PlatformRating[]
}
export default function TestimonialSection({ reviews }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = () => {
        if (currentIndex < reviews.length - 2) {
            setCurrentIndex((prevIndex) => prevIndex + 1)
        }
    }

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1)
        }
    }

    return (
        <div className="bg-[#FFF5F5] py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-2">Real ingredients.</h2>
                <h2 className="text-3xl font-bold text-center mb-8">Real people. Real reviews.</h2>

                <div className="relative ">
                    {/* Previous Button */}
                    <div
                        onClick={prevSlide}
                        className={`absolute w-12   cursor-pointer  -left-5 top-1/2 transform -translate-y-1/2 z-10 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        aria-label="Previous review"
                    >
                        <IconButton icon={<ChevronLeft />} disabled={currentIndex === 0} />
                    </div>

                    {/* Carousel */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 50}%)` }}
                        >
                            {reviews.map((review) => (
                                <div key={review.id} className="w-full sm:w-1/2 mx-auto flex-shrink-0 px-4 sm:px-6">
                                    <div className="bg-[#9C4E7E] w-full min-h-[250px] text-white p-6 rounded-3xl mb-4 relative">
                                        <Quote className="w-6 h-6 text-white mb-2" />
                                        <p className={cn(gooddogFont.className, "text-xl")}>{`${review.comment}`}</p>
                                        <div className="absolute bottom-0 left-8 w-4 h-4 bg-[#9C4E7E] transform rotate-45 translate-y-2"></div>
                                    </div>
                                    <div className="flex items-center">
                                        <Image
                                            src={review.authorImage}
                                            alt={review.author}
                                            width={60}
                                            height={60}
                                            className="rounded-full mr-4"
                                        />
                                        <div>
                                            <div className="flex mb-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                                    />
                                                ))}
                                            </div>
                                            <h3 className={cn(gooddogFont.className, " font-semibold")}>{review.author}</h3>
                                            {/* <p className={cn(gooddogFont.className, "opacity-90")}>user</p> */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={nextSlide}
                        className={`absolute cursor-pointer w-12 -right-5 top-1/2 transform -translate-y-1/2 z-10 ${currentIndex >= reviews.length - 2 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        aria-label="Next review"
                    >
                        <IconButton icon={<ChevronRight />} disabled={currentIndex >= reviews.length - 2} />
                    </button>
                </div>
            </div>
        </div>
    )
}
