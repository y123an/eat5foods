'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const NotificationBanner = () => {
    const [content, setContent] = useState('')
    const [isScrollable, setIsScrollable] = useState(false)
    const bannerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const fetchBanner = async () => {
            const response = await fetch('/api/notification-banner')
            const data = await response.json()
            if (data && data.content) {
                setContent(data.content)
            }
        }
        fetchBanner()
    }, [])

    useEffect(() => {
        const checkScrollable = () => {
            if (bannerRef.current) {
                setIsScrollable(bannerRef.current.scrollWidth > bannerRef.current.clientWidth)
            }
        }

        checkScrollable()
        window.addEventListener('resize', checkScrollable)

        return () => {
            window.removeEventListener('resize', checkScrollable)
        }
    }, [content])

    const scroll = (direction: 'left' | 'right') => {
        if (bannerRef.current) {
            const scrollAmount = bannerRef.current.clientWidth
            bannerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    if (!content) return null

    return (
        <div className="relative bg-black text-white">
            <div
                ref={bannerRef}
                className="overflow-x-hidden whitespace-nowrap p-2"
            >
                {content}
            </div>
            {isScrollable && (
                <>
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-0 bottom-0 bg-black bg-opacity-50 px-2 flex items-center"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-0 bottom-0 bg-black bg-opacity-50 px-2 flex items-center"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </>
            )}
        </div>
    )
}

export default NotificationBanner