import { prisma } from "@/lib/prisma-client"
import type { Metadata } from 'next'

import ShopLayout from '@/components/navigation/shop/shop-layout'

export const metadata: Metadata = {
    title: 'Eat5Foods online foods',
    description: 'Discover the eat5foods about our products',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const categories = await prisma.category.findMany()

    return (

        <ShopLayout categories={categories}>
            {children}
        </ShopLayout>

    )
}