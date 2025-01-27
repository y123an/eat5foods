import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function OrderConfirmationPage() {
    return (
        <div className="container mx-auto py-10 px-4">
            <Card className="w-full max-w-4xl mx-auto shadow-none">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <CheckCircle className="w-16 h-16 text-green-500" />
                    </div>
                    <CardTitle className="text-center text-2xl">Order Confirmed!</CardTitle>
                    <CardDescription className="text-center">
                        Thank you for your purchase
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-center mb-4">
                        Your order has been successfully placed and is being processed. You will receive an email confirmation shortly.
                    </p>

                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button asChild>
                        <Link href="/my-account">
                            View your orders
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}