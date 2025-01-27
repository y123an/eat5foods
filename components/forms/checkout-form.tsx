'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useCartStore from '@/hooks/use-cart'
import axios from 'axios'

export default function CheckoutForm() {
    const router = useRouter()
    const { items, clearCart } = useCartStore()
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        phone: '',
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCustomerInfo(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            // Initiate payment
            const initiateResponse = await axios.post('/api/initiate-payment', {
                customerInfo,
                cartItems: items,
            })

            const { paymentUrl, mockPayload } = initiateResponse.data

            if (paymentUrl) {
                // Simulate payment success (in a real scenario, this would be handled by the payment gateway)
                await new Promise(resolve => setTimeout(resolve, 2000)) // 2-second delay to simulate payment process

                // Call the callback endpoint
                const callbackResponse = await axios.post('/api/phone-pay-callback', {
                    ...mockPayload,
                    code: 'PAYMENT_SUCCESS',
                    customerInfo,
                    cartItems: items,
                })

                if (callbackResponse.data.success) {
                    clearCart()
                    router.push('/shop/order-confirmation')
                } else {
                    throw new Error('Payment processing failed')
                }
            } else {
                throw new Error('Invalid payment URL')
            }
        } catch (error) {
            console.error('Error during checkout:', error)
            alert('An error occurred during checkout. Please try again.')
            router.push('/shop/payment-failed')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Pay Now'}
            </Button>
        </form>
    )
}