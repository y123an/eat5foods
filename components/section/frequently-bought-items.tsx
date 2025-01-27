import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import useCartStore from "@/hooks/use-cart";
import { toRupee } from "@/lib/currency-formater";
import { discountedPrice } from "@/lib/utils";
import { Ingredient, NutritionalFact, Product, ProductVariation, Rate, Image as TypeImage } from "@prisma/client";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface FrequentlyBoughtItemsProps {
    similarProducts: (Product & {
        image: TypeImage[];
        rate: Rate[];
        nutritionalFacts: NutritionalFact[],
        ingredients: Ingredient[],
        productVariation: ProductVariation[]
    })[];
}

export default function FrequentlyBoughtItems({ similarProducts }: FrequentlyBoughtItemsProps) {
    const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
    const addToCart = useCartStore((state) => state.addToCart);

    const toggleProduct = (id: string) => {
        setSelectedProducts((prev) => {
            const newSet = new Set(prev);
            newSet.has(id) ? newSet.delete(id) : newSet.add(id);
            return newSet;
        });
    };

    // Calculate total price of selected products
    const totalPrice = similarProducts
        .filter((p) => selectedProducts.has(p.id))
        .reduce((sum, p) => sum + p.price, 0);

    const handleAddToCart = () => {
        // Get the selected products
        const selectedItems = similarProducts.filter((p) => selectedProducts.has(p.id));

        // Add each selected product to the cart
        selectedItems.forEach((item) => {
            addToCart({
                id: item.id,
                name: item.name,
                image: item.image[0].url,
                price: item.price,
                quantity: 1,
                variation: {
                    price: 0,
                    stock: 0,
                    sku: ""
                },
            });
        });
    };

    return (
        <div className="bg-[#e33675] mt-14">
            <Card className="w-full bg-[#e33675] border-none rounded-none mx-auto">
                <CardContent>
                    <div className="flex bg-[#e33675] items-center mb-4">
                        <ShoppingCart className="w-6 h-6 text-white mr-2" />
                        <h2 className="text-xs md:text-sm text-white">FREQUENTLY BOUGHT TOGETHER</h2>
                    </div>
                    <div className="grid grid-cols-1 bg-white md:grid-cols-2 gap-4 p-4">
                        {similarProducts.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => toggleProduct(product.id)}
                                className="flex cursor-pointer flex-col p-3 rounded-lg border border-gray-600 items-start space-x-4"
                            >
                                <Checkbox
                                    checked={selectedProducts.has(product.id)}
                                    onCheckedChange={() => toggleProduct(product.id)}
                                    className="mt-1"
                                />
                                <div className="flex-shrink-0">
                                    <Image src={product.image[0].url}
                                        alt={product.name} className="w-full h-24 object-cover"
                                        width={150}
                                        height={100}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-semibold">{product.name}</h3>
                                    <div className="flex items-baseline space-x-2">
                                        <span className="text-lg font-bold">{toRupee(product.price)}</span>
                                        {product.discount && product.discount > 0 && <span className="text-sm text-gray-500 line-through">{toRupee(discountedPrice(product.price, product.discount || 0))}</span>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex w-full flex-1">
                        <Button
                            className="w-full rounded-t-none rounded-b-md bg-yellow-400 hover:bg-yellow-500 text-lg text-black font-bold py-5"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                            {selectedProducts.size > 0 && (
                                <span className="ml-2">( {toRupee(totalPrice)})</span>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
