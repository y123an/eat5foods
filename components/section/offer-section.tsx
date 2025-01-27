"use client";
import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { FormattedProduct } from '@/types/product'
import { CheckCircleIcon } from 'lucide-react'


const OfferCard = ({
    backgroundColor,
    imageSrc,
    couponCode,
    discount,
    description
}: {
    backgroundColor: string,
    imageSrc: string,
    couponCode: string,
    discount: string,
    description: string
}) => {
    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(couponCode)
        setIsCopied(true)

        // Set a 2-second delay before resetting the "Copied!" state
        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    }

    return (
        <div className={`w-full md:w-1/2 p-4`}>
            <div className={`rounded-lg overflow-hidden ${backgroundColor}`}>
                <div className="relative h-64">
                    <Image
                        src={imageSrc}
                        alt="Product Image"
                        layout="fill"
                        objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-10">
                        {/* Decorative lines */}
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute bg-white opacity-50"
                                style={{
                                    width: '1px',
                                    height: '10px',
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    transform: `rotate(${Math.random() * 360}deg)`
                                }}
                            />
                        ))}
                    </div>
                </div>
                <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-600">COUPON CODE</span>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-xs border border-dashed"
                            onClick={handleCopy}
                        >
                            {isCopied ? (
                                <span className="flex items-center gap-1">
                                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                                    COPIED!
                                </span>
                            ) : (
                                'COPY CODE'
                            )}
                        </Button>
                    </div>
                    <div className="text-2xl font-bold mb-2">{couponCode}</div>
                    <div className="text-lg font-semibold mb-1">{discount}</div>
                    <div className="text-sm text-gray-600">{description}</div>
                </div>
            </div>
        </div>
    )
}

type Props = {
    product: FormattedProduct[]
}
export default function OffersSection({ product }: Props) {
    return (
        <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <div className="text-sm text-gray-500 mb-2">
                        <Link href={'/shop'}>Home</Link>

                        <Link href={'/shop/offers'}>/ Offers</Link>
                    </div>
                    <h1 className="text-4xl font-bold mb-2">Offers</h1>
                    <div className="text-lg text-gray-600">#eat5foods</div>
                </div>
                <div className="flex flex-wrap -mx-4">
                    {product.map((product) => (
                        <OfferCard
                            key={product.id}
                            backgroundColor="bg-pink-100"
                            imageSrc={product.imageUrl}
                            couponCode={product.name.toUpperCase().trim()}
                            discount={`Get flat ${product.discount}% Off!`}
                            description={product.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
