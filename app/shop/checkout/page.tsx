import { Suspense } from 'react';

import CheckoutForm from '@/components/forms/checkout-form';
import OrderSummary from '@/components/section/order-summary';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function CheckoutPage() {

    return (
        <div className="container mx-auto py-10">
            <Card className="w-full border-none max-w-5xl mx-auto">
                <CardHeader>
                    <CardTitle>Checkout</CardTitle>
                    <CardDescription>Complete your order</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    <Suspense fallback={<div>Loading order summary...</div>}>
                        <OrderSummary />
                    </Suspense>
                    <CheckoutForm />
                </CardContent>
            </Card>
        </div>
    )
}