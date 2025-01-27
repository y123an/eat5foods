"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IMG2 } from '@/constants/images'
import { Minus, Plus, Star } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const flavors = [
    { id: 'almond-millet', name: 'Almond Millet Cocoa', color: 'bg-purple-100' },
    { id: 'double-cocoa', name: 'Double Cocoa', color: 'bg-pink-100' },
    { id: 'cranberry', name: 'Cranberry', color: 'bg-red-100' },
    { id: 'coconut-cocoa', name: 'Coconut Cocoa', color: 'bg-yellow-100' },
    { id: 'peanut-butter', name: 'Peanut Butter', color: 'bg-orange-100' },
    { id: 'orange-cocoa', name: 'Orange Cocoa', color: 'bg-orange-200' },
    { id: 'peanut-cocoa', name: 'Peanut Cocoa', color: 'bg-yellow-200' },
]

const nutritionalFacts = [
    { name: 'Almond Millet Cocoa', values: { calories: 120, protein: 10, carbs: 15, fat: 5 } },
    { name: 'Double Cocoa', values: { calories: 130, protein: 11, carbs: 14, fat: 6 } },
]

const faqs = [
    { question: "I don't go to the gym. Are protein bars for me?", answer: "Yes, protein bars can be beneficial for everyone, not just gym-goers..." },
    { question: "How much protein is there in a bar?", answer: "The amount of protein varies by flavor, but generally ranges from 10-12g per bar..." },

]

export default function ProductDetail() {
    const [selectedFlavors, setSelectedFlavors] = useState<string[]>([])

    const handleFlavorToggle = (flavorId: string) => {
        setSelectedFlavors(prev =>
            prev.includes(flavorId)
                ? prev.filter(id => id !== flavorId)
                : [...prev, flavorId]
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Personalised Box - Pack of 30 Protein Bars</h1>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <Image src={IMG2} alt="Product Image" className="w-full h-auto rounded-lg shadow-lg" />
                    <div className="flex justify-between mt-4">
                        <Image src={IMG2} alt="Thumbnail 1" className="w-16 h-16 rounded" />
                        <Image src={IMG2} alt="Thumbnail 2" className="w-16 h-16 rounded" />
                        <Image src={IMG2} alt="Thumbnail 3" className="w-16 h-16 rounded" />
                        <Image src={IMG2} alt="Thumbnail 4" className="w-16 h-16 rounded" />
                    </div>
                </div>

                <div>
                    <div className="flex items-center mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">(4.8 out of 5)</span>
                    </div>

                    <p className="text-2xl font-bold mb-4">₹1470 - ₹1650</p>

                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">Select Your Flavors</h2>
                        {flavors.map((flavor) => (
                            <div key={flavor.id} className={`flex items-center justify-between p-2 rounded-md mb-2 ${flavor.color}`}>
                                <Label htmlFor={flavor.id} className="flex items-center cursor-pointer">
                                    <Checkbox
                                        id={flavor.id}
                                        checked={selectedFlavors.includes(flavor.id)}
                                        onCheckedChange={() => handleFlavorToggle(flavor.id)}
                                    />
                                    <span className="ml-2">{flavor.name}</span>
                                </Label>
                                <div className="flex items-center">
                                    <Button variant="outline" size="icon"><Minus className="h-4 w-4" /></Button>
                                    <span className="mx-2">0</span>
                                    <Button variant="outline" size="icon"><Plus className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <Input type="text" placeholder="Enter pincode" className="w-1/2" />
                        <Button>Check</Button>
                    </div>

                    <Button className="w-full">Add to Cart</Button>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Nutritional Facts</h2>
                <Accordion type="single" collapsible className="w-full">
                    {nutritionalFacts.map((fact, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>{fact.name}</AccordionTrigger>
                            <AccordionContent>
                                <p>Calories: {fact.values.calories}</p>
                                <p>Protein: {fact.values.protein}g</p>
                                <p>Carbs: {fact.values.carbs}g</p>
                                <p>Fat: {fact.values.fat}g</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Got questions?</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Verified Reviews</h2>
                <Tabs defaultValue="reviews">
                    <TabsList>
                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                        <TabsTrigger value="questions">Questions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="reviews">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="mb-4">
                                    <h3 className="font-semibold">Akshay</h3>
                                    <div className="flex items-center">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                        <span className="ml-2 text-sm text-gray-600">12/07/2023</span>
                                    </div>
                                    <p className="mt-2">Great product! I love the variety of flavors and the convenience of having a personalized box.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="questions">
                        <Card>
                            <CardContent>
                                <p>No questions yet. Be the first to ask!</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}