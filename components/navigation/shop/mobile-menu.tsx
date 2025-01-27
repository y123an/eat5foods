"use client"

import { useState, useEffect } from 'react'
import { X, ChevronDown, Twitter, Facebook, Instagram, Youtube, Search, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { IMG2, WhiteLogo } from '@/constants/images'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Category } from '@prisma/client'
import Link from 'next/link'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
    categories: Category[]
}

export default function MobileMenu({ isOpen, onClose, categories }: MobileMenuProps) {
    const router = useRouter()
    const { data: session } = useSession();

    const [byobOpen, setByobOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredCategories, setFilteredCategories] = useState(categories)

    useEffect(() => {
        const filtered = categories.filter(category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredCategories(filtered)
    }, [searchTerm, categories])

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="left" className="w-[350px] sm:w-[400px] p-0 flex flex-col">
                <SheetHeader className="p-4 border-b">
                    <div className="flex  items-center">
                        <Image src={WhiteLogo} alt="Eat5foods" width={100} height={100} />
                        <SheetTitle className="text-xl font-bold">Eat5foods</SheetTitle>

                    </div>
                </SheetHeader>

                <ScrollArea className="flex-grow">
                    <div className="flex items-center justify-between p-4 space-x-2">
                        <div className="relative flex-grow">
                            <Input
                                placeholder="Search categories"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pr-8"
                            />
                            <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                        {!session && <Button
                            onClick={() => router.push('/sign-in')}
                            variant="outline" className="bg-purple-100 text-[#93385d] border-[#93385d] hover:bg-purple-200">
                            <User className="w-4 h-4 mr-2 text-[#93385d]" />
                            Login
                        </Button>}
                    </div>

                    <div className="p-4">
                        {filteredCategories.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                {filteredCategories.map((category) => (
                                    <Button onClick={() => router.push(`/shop/categories/${category.id}`)} key={category.id} variant="outline" className="flex flex-col items-center justify-center h-24 text-left">
                                        <Image src={category.image || IMG2} alt={category.name} width={40} height={40} className="mb-2" />
                                        <span>{category.name}</span>
                                    </Button>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">No categories found</p>
                        )}


                        <Link href="/shop/popular" passHref>
                            <Button variant="ghost" className="w-full justify-start mb-2">
                                Popular Products
                            </Button>
                        </Link>
                        <Link href="/shop/reviews" passHref>
                            <Button variant="ghost" className="w-full justify-start mb-2">
                                Reviews
                            </Button>
                        </Link>
                        <Link href="/shop/newsletter" passHref>
                            <Button variant="ghost" className="w-full justify-start mb-2">
                                Newsletter
                            </Button>
                        </Link>
                        <Link href="/shop/our-story" passHref>
                            <Button variant="ghost" className="w-full justify-start mb-2">
                                Our Story
                            </Button>
                        </Link>
                    </div>
                </ScrollArea>

                <div className="border-t p-4">
                    <div className="flex justify-between mb-4">
                        <Link href="/shop/contact-us" passHref>
                            <Button variant="link">Contact us</Button>
                        </Link>
                        <Link href="/shop/track-order" passHref>
                            <Button variant="link">Track order</Button>
                        </Link>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <Link href="https://twitter.com/eat5foods" target="_blank" rel="noopener noreferrer">
                            <Twitter className="w-6 h-6" />
                        </Link>
                        <Link href="https://facebook.com/eat5foods" target="_blank" rel="noopener noreferrer">
                            <Facebook className="w-6 h-6" />
                        </Link>
                        <Link href="https://instagram.com/eat5foods" target="_blank" rel="noopener noreferrer">
                            <Instagram className="w-6 h-6" />
                        </Link>
                        <Link href="https://youtube.com/eat5foods" target="_blank" rel="noopener noreferrer">
                            <Youtube className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}