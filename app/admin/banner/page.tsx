'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const NotificationBannerAdmin = () => {
    const [content, setContent] = useState('')
    const [isLoading, setIsLoading] = useState(false)

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

    const updateBanner = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/notification-banner', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            })
            if (response.ok) {
                console.log('Notification banner updated successfully')
            } else {
                console.error('Error updating notification banner')
            }
        } catch (error) {
            console.error('Error updating notification banner:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex gap-4">
                <Input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter notification banner content"
                    className="flex-grow"
                />
                <Button onClick={updateBanner} disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update'}
                </Button>
            </div>
        </div>
    )
}

export default NotificationBannerAdmin