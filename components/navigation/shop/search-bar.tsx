"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import useSearch from '@/hooks/use-search';
import { Category, Product } from '@prisma/client';
import Image from 'next/image';
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from 'next/link';

type Props = {
    categories: Category[];
    products: Product[];
};

export function SearchOverlay({ categories, products }: Props) {
    const { isSearchOpen, toggleSearch } = useSearch();
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Filter categories based on search query
    const filteredProducts = products?.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log(products)
    return (
        <Sheet open={isSearchOpen} onOpenChange={toggleSearch}>
            <SheetContent side="right" className="w-full sm:max-w-md p-0 bg-background">
                <SheetHeader className="p-6 border-b">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="text-xl font-bold">SEARCH</SheetTitle>

                    </div>
                    <div className="mt-4">
                        <Input
                            type="search"
                            placeholder="What are you looking for?"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full"
                        />
                    </div>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-140px)] p-6">
                    <h3 className="text-lg font-semibold mb-4">Top categories</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {filteredProducts?.length > 0 ? (
                            filteredProducts.slice(0, 11).map((product) => (
                                <Link
                                    href={`/shop/categories/${product.id}`}
                                    key={product.id}
                                    className="bg-secondary p-4 rounded-lg hover:bg-secondary/80 transition-colors"
                                >
                                    <div className="aspect-square relative mb-2 overflow-hidden rounded-md">
                                        {/* <Image
                                            src={category.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        /> */}
                                    </div>
                                    <span className="font-semibold text-sm line-clamp-2">{product.name}</span>
                                </Link>
                            ))
                        ) : (
                            <p className="col-span-2 text-center text-muted-foreground">No categories found.</p>
                        )}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}