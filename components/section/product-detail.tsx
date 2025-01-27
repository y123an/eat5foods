"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Minus, Plus } from 'lucide-react'
import { SampleIMG } from '@/constants/images'

const carouselImages = [
    SampleIMG,
    SampleIMG,
    SampleIMG,
    SampleIMG,
    SampleIMG
]

export default function ProductDetail() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [quantity, setQuantity] = useState(1)

    return (
        <div className="bg-pink-500 min-h-screen p-4 md:p-8">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2 p-4 bg-purple-700">
                        <h2 className="text-3xl font-bold text-white mb-4">Happy Hearts. Happy Stories.</h2>
                        <div className="relative">
                            <div className="aspect-w-1 aspect-h-1">
                                <Image
                                    src={carouselImages[currentImageIndex]}
                                    alt={`Carousel image ${currentImageIndex + 1}`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                                {carouselImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-colors duration-200 ${index === currentImageIndex ? 'bg-white' : 'bg-gray-400 bg-opacity-50'
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2 p-4 md:p-8">
                        <div className="text-sm breadcrumbs mb-4">
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Breakfast</a></li>
                                <li>Apricot Fig Breakfast Bar (Pack Of 6)</li>
                            </ul>
                        </div>
                        <h1 className="text-3xl font-bold mb-4">Apricot Fig Breakfast Bar (Pack of 6)</h1>
                        <div className="flex items-baseline mb-4">
                            <span className="text-3xl font-bold mr-2">MRP: Rs. 290.00</span>
                            <span className="text-gray-500 line-through">Rs. 359.00</span>
                        </div>
                        <div className="text-sm mb-4">Rs. 0.97 / g</div>
                        <div className="bg-yellow-400 inline-block px-2 py-1 rounded mb-4">Save 19%</div>
                        <p className="text-sm mb-4">Inclusive of All Taxes</p>
                        <div className="flex items-center mb-4">
                            <Image src={SampleIMG} alt="Amazon logo" width={20} height={20} className="mr-2" />
                            <span className="text-sm">10-yr old brand, 1 lakh 5-stars on</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="bg-pink-200 p-4 rounded-lg flex flex-col items-center justify-center">
                                <Image src={SampleIMG} alt="Rich in Protein" width={40} height={40} />
                                <span className="text-sm mt-2">Rich in Protein</span>
                            </div>
                            <div className="bg-purple-200 p-4 rounded-lg flex flex-col items-center justify-center">
                                <Image src={SampleIMG} alt="No Refined Sugar" width={40} height={40} />
                                <span className="text-sm mt-2">No Refined Sugar</span>
                            </div>
                            <div className="bg-green-200 p-4 rounded-lg flex flex-col items-center justify-center">
                                <Image src={SampleIMG} alt="On-the-go Snack" width={40} height={40} />
                                <span className="text-sm mt-2">On-the-go Snack</span>
                            </div>
                        </div>
                        <ul className="list-disc list-inside mb-4">
                            <li>Made with whole grains, dried fruits, nuts, and seeds</li>
                            <li>Sweetened with honey, not refined sugar</li>
                            <li>Easy nutrition for people on the go</li>
                        </ul>
                        <div className="bg-pink-100 p-4 rounded-lg mb-4">
                            <h3 className="font-bold flex items-center">
                                <span className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center mr-2">%</span>
                                Flat ₹100 OFF + FREE Gift
                            </h3>
                            <p className="text-sm">₹100 OFF on orders over ₹499. FREE surprise gift on orders over ₹749. No code needed.</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="bg-gray-200 px-3 py-1 rounded-l"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="bg-gray-100 px-4 py-1">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="bg-gray-200 px-3 py-1 rounded-r"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <button className="w-full bg-yellow-400 text-black py-2 rounded-md hover:bg-yellow-500 transition-colors">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}