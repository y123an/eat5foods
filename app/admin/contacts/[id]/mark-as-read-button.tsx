'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { toast } from '@/hooks/use-toast'

export default function MarkAsReadButton({ id, initialSeen }: { id: string, initialSeen: boolean }) {
    const [seen, setSeen] = useState(initialSeen)
    const [loading, setLoading] = useState(false)

    const handleMarkAsRead = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/contact/${id}/mark-as-read`, {
                method: 'POST',
            })
            if (response.ok) {
                setSeen(true)
                toast({
                    title: "Message marked as read",
                    description: `Message with ID ${id} has been marked as read.`,
                })
            } else {
                console.error('Failed to mark message as read')
                toast({
                    title: "Error",
                    description: `Failed to mark message with ID ${id} as read.`,
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.error('Error marking message as read:', error)
            toast({
                title: "Error",
                description: "An error occurred while marking the message as read.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    if (seen) {
        return null
    }

    return (
        <Button onClick={handleMarkAsRead} disabled={loading}>
            {loading ? 'Marking as Read...' : 'Mark as Read'}
        </Button>
    )
}
