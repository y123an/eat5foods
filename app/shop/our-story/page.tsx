'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'




const WhyWeExistDisplay = () => {
    const [content, setContent] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch('/api/why-we-exist')
                if (!response.ok) {
                    throw new Error('Failed to fetch content')
                }
                const data = await response.json()
                setContent(data?.content || '')
            } catch (error) {
                console.error('Error fetching content:', error)
                setError('Failed to load content. Please try again later.')
            } finally {
                setIsLoading(false)
            }
        }

        fetchContent()
    }, [])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center text-red-500 p-4">
                {error}
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-4 pt-12">
            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    )
}

export default WhyWeExistDisplay