"use client"
import { gooddogFont } from '@/lib/local-font'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'

const images = [
    "https://github.com/octocat.png",
    "https://github.com/octocat.png",
    "https://github.com/onesamket.png",
    "https://github.com/yyx990803.png",
    "https://github.com/kentcdodds.png",
    "https://github.com/sindresorhus.png",
    "https://github.com/wesbos.png",
    "https://github.com/addyosmani.png",
    "https://github.com/paulirish.png",
    "https://github.com/tj.png",
    "https://github.com/defunkt.png",
    "https://github.com/mdo.png",
    "https://github.com/fat.png"
]

export default function PromotionalBanner() {
    const [scrollPosition, setScrollPosition] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setScrollPosition((prevPosition) => (prevPosition + 1) % (images.length * 200))
        }, 50)

        return () => clearInterval(intervalId)
    }, [])

    return (
        <div className="bg-[#f5f0e1]   overflow-hidden">
            <div className="relative mb-5 mt-12 flex justify-center ">
                <h1 className="text-[#1E3932] text-6xl sm:text-7xl md:text-9xl font-extrabold tracking-tighter">
                    MILLIONS
                </h1>
                <span className={cn(gooddogFont.className, "absolute top-6 left-60  -rotate-45  text-[#E91E63] text-4xl sm:text-5xl md:text-6xl ")}>
                    Loved By
                </span>
            </div>
            <p className="text-center text-2xl mb-8 font-extrabold text-green-800">
                India’s Largest, new-age, health-food brand
            </p>
            <Marquee
                className='space-x-4'
            >
                {[...images, ...images].map((src, index) => (
                    <div key={index} className="w-[200px] mx-5 h-[200px] flex-shrink-0 rounded-2xl overflow-hidden">
                        <img src={src} alt={`User ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                ))}

            </Marquee>
            <div className='mt-10 ml-10'>
                <Marquee>
                    {[...images, ...images].map((src, index) => (
                        <div key={index} className="w-[200px] mx-4 h-[200px] flex-shrink-0 rounded-2xl overflow-hidden">
                            <img src={src} alt={`User ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                    ))}

                </Marquee>
            </div>

        </div>

    )
}