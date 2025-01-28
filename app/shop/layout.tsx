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
    const product = await prisma.product.findMany()
    const category = await prisma.category.findMany()

    // console.log('ths',product);
    return (

        <ShopLayout products={product} categories={category}>
            {children}
        </ShopLayout>

    )
}