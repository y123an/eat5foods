'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from 'react';
import { AddAddressDialog } from './address-dialog';
import { handleError, handleSuccess } from "@/lib/toast-util";

interface Address {
    id?: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export default function MyAddresses() {
    const [addresses, setAddresses] = useState<Address[]>([])

    useEffect(() => {
        fetchAddresses()
    }, [])

    const fetchAddresses = async () => {
        try {
            const response = await fetch('/api/addresses')
            if (response.ok) {
                const data = await response.json()
                handleSuccess("Address added successfully", "create")
                setAddresses(data)
            } else {
                handleError('Failed to fetch addresses', 'fetch')
            }
        } catch (error) {
            handleError('Error fetching addresses:', 'fetch')
        }
    }

    const handleAddAddress = async (newAddress: Address) => {
        try {
            const response = await fetch('/api/addresses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAddress),
            })

            if (response.ok) {
                const addedAddress = await response.json()
                setAddresses([...addresses, addedAddress])
            } else {
                console.error('Failed to add address')
            }
        } catch (error) {
            console.error('Error adding address:', error)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>My Addresses</CardTitle>
                <CardDescription>Manage your delivery addresses.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {addresses.map((address) => (
                        <div key={address.id} className="border border-gray-200 rounded-md p-4">
                            <div className="font-medium mb-2">{address.street}</div>
                            <div className="text-sm text-gray-600">
                                {`${address.city}, ${address.state} ${address.zipCode}, ${address.country}`}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <AddAddressDialog onAddAddress={handleAddAddress} />
            </CardFooter>
        </Card>
    )
}