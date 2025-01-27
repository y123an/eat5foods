'use client'

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import IconButton from "../shared/icon-button"
import TestimonialCard from "../cards/testimonial-card"

interface Testimonial {
    id: string
    title: string
    authorBio: string
    message: string
    videoURL: string
    User: {
        name: string
        email: string,
        image: string
    }
}

export default function ReviewSection() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [loading, setLoading] = useState(true) // Loading state

    useEffect(() => {
        const fetchTestimonials = async () => {
            setLoading(true) // Set loading to true when starting to fetch
            try {
                const response = await fetch('/api/testimonials')
                if (response.ok) {
                    const data = await response.json()
                    setTestimonials(data.testimonials)
                } else {
                    console.error('Error fetching testimonials')
                }
            } catch (error) {
                console.error('Error fetching testimonials:', error)
            } finally {
                setLoading(false) // Set loading to false when finished
            }
        }

        fetchTestimonials()
    }, [])

    const nextSlide = () => {
        if (currentIndex < testimonials.length - 4) {
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
            <div>
                <h2 className="text-2xl font-bold text-center mb-6">
                    Real people. Real Reviews ❤️
                </h2>
            </div>
            <div className="container mx-auto relative">
                {/* Previous Slide Button */}
                <div
                    onClick={prevSlide}
                    className={`absolute w-12 cursor-pointer left-2 top-1/2 transform -translate-y-1/2 z-10 ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                    aria-label="Previous testimonial"
                >
                    <IconButton
                        fill="#000"
                        textColor="#000"
                        icon={<ChevronLeft />}
                        disabled={currentIndex === 0}
                    />
                </div>

                {/* Testimonial List with Snap Scrolling */}
                <div className="overflow-x-auto hide-scrollbar snap-x snap-mandatory">
                    {loading ? ( // Conditional rendering for loading state
                        <div className="flex justify-center items-center h-40">
                            <p className="text-lg font-semibold">Loading testimonials...</p>
                        </div>
                    ) : (
                        <div
                            className="flex space-x-3 transition-transform duration-300 ease-in-out"
                            style={{
                                transform: `translateX(-${currentIndex * 25}%)`,
                            }}
                        >
                            {testimonials.map((testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="w-[200px] sm:w-1/4 mx-2 flex-shrink-0 snap-center"
                                >
                                    <TestimonialCard
                                        quote={testimonial.message}
                                        name={testimonial.User.name}
                                        title={testimonial.title}
                                        imageUrl={testimonial.User.image || "https://avatars.githubusercontent.com/u/1?v=4"}
                                        details={testimonial.authorBio}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Next Slide Button */}
                <div
                    onClick={nextSlide}
                    className={`absolute w-12 cursor-pointer -right-4 top-1/2 transform -translate-y-1/2 z-10 ${currentIndex >= testimonials.length - 4 ? "opacity-50 cursor-not-allowed" : ""}`}
                    aria-label="Next testimonial"
                >
                    <IconButton
                        fill="#000"
                        textColor="#000"
                        icon={<ChevronRight />}
                        disabled={currentIndex >= testimonials.length - 4}
                    />
                </div>
            </div>
        </div>
    )
}
