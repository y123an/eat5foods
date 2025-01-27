import Link from 'next/link'
import { XCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentFailedPage() {
    return (
        <div className=" mx-auto py-10 px-4">
            <Card className="w-full max-w-md shadow-none mx-auto">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <XCircle className="w-16 h-16 text-red-500" />
                    </div>
                    <CardTitle className="text-center text-2xl">Payment Failed</CardTitle>
                    <CardDescription className="text-center">
                        We&apos;re sorry, but there was an issue with your payment
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-center mb-4">
                        Your payment could not be processed at this time. This could be due to insufficient funds, an expired card, or a temporary issue with the payment gateway.
                    </p>
                    <div className="bg-muted p-4 rounded-md">
                        <h3 className="font-semibold mb-2">What to do next:</h3>
                        <ul className="list-disc list-inside">
                            <li>Check your payment details and try again</li>
                            <li>Use a different payment method</li>
                            <li>Contact your bank if the issue persists</li>
                        </ul>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center gap-4">
                    <Button asChild variant="secondary">
                        <Link href="/shop/checkout">
                            Try Again
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href="/shop">
                            Return to Home
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}