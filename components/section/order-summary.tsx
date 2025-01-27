'use client'

import useCartStore from '@/hooks/use-cart'
import { useEffect, useState } from 'react'

export default function OrderSummary() {
    const { items } = useCartStore()
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const newTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        setTotal(newTotal)
    }, [items])

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            {items.map(item => (
                <div key={item.id} className="flex justify-between py-2">
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
            ))}
            <div className="flex justify-between py-2 font-bold mt-4 border-t">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
            </div>
        </div>
    )
}