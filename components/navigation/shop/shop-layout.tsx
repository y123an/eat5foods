'use client'

import { CartSidebar } from "@/components/navigation/shop/cart-sidebar"
import MobileMenu from '@/components/navigation/shop/mobile-menu'
import { SearchOverlay } from "@/components/navigation/shop/search-bar"
import ShopHeader from "@/components/navigation/shop/shop-header"
import FooterSection from '@/components/section/footer-section'
import { PlaceholderImage, WhiteLogo } from "@/constants/images"
import useCartStore from "@/hooks/use-cart"
import { Category, Product } from '@prisma/client'
import { Grid, Info, Menu, Phone, ShoppingCart, Star, User } from 'lucide-react'
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
interface ShopLayoutProps {
    children: React.ReactNode
    products: Product[],
    categories: Category[]
}

export default function ShopLayout({ children, products, categories }: ShopLayoutProps) {
    const { data: session } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { items: cartItems, toggleCart } = useCartStore();
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    return (
        <div className="bg-white flex flex-col min-h-screen">
            {/* Desktop Header */}
            <div className="hidden md:block">
                <ShopHeader categories={categories} bannerShown={true} />
            </div>

            {/* Mobile Header */}
            <header className="flex md:hidden justify-between items-center p-4 border-b fixed top-0 left-0 right-0 bg-white z-40">
                <button onClick={() => setIsMobileMenuOpen(true)}>
                    <Menu className="w-6 h-6" />
                </button>
                <Link href="/shop/" className="flex space-x-3 items-center">
                    <Image src={WhiteLogo} alt="Eat5Foods" width={60} height={60} />
                    <h1 className="text-xl font-bold">Eat5Foods</h1>
                </Link>
                <div
                    onClick={toggleCart}
                    className="relative cursor-pointer">
                    <ShoppingCart className="w-6 h-6" />
                    {cartItems.length > 0 && (
                        <p className="absolute -top-2 -right-2 bg-pink-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{cartItems.length}</p>
                    )}
                </div>
            </header>

            {/* Mobile Menu */}
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} categories={categories} />

            {/* Sidebars and Overlays */}
            <CartSidebar />
            <SearchOverlay products={products} categories={categories} />

            {/* Main Content */}
            <main className="flex-grow pt-16 md:pt-32 pb-20 md:pb-0">
                {children}
            </main>

            {/* Footer */}
            <FooterSection />

            {/* Tab View (always shown on mobile, hidden on desktop) */}
            <nav className="flex justify-between fixed bottom-0 w-full z-50 items-center p-4 border-t bg-white md:hidden">
                <Link href="/shop/" className={`flex flex-col items-center ${isActive('/shop') ? 'text-pink-600' : 'text-gray-600'}`}>
                    <ShoppingCart className="w-6 h-6" />
                    <p className="text-xs mt-1">Shop</p>
                </Link>
                <Link href="/shop/categories" className={`flex flex-col items-center ${isActive('/shop/categories') ? 'text-pink-600' : 'text-gray-600'}`}>
                    <Grid className="w-6 h-6" />
                    <p className="text-xs mt-1">Categories</p>
                </Link>
                <Link href="/shop/popular" className={`flex flex-col items-center ${isActive('/shop/about-us') ? 'text-pink-600' : 'text-gray-600'}`}>
                    <Star className="w-6 h-6" />
                    <p className="text-xs mt-1">Popular </p>
                </Link>
                <Link href="/my-account" className={`flex flex-col items-center ${isActive('/shop/contact-us') ? 'text-pink-600' : 'text-gray-600'}`}>
                    {session ? <Image
                        alt="avatar"
                        className="w-6 h-6 rounded-full"
                        src={session.user.image || PlaceholderImage} width={50} height={50}
                    /> : <User className="w-6 h-6" />}
                    <p className="text-xs mt-1">Account</p>
                </Link>
            </nav>
        </div>
    )
}