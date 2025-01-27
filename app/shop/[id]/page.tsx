
import { ProductCard } from "@/components/cards/product-card";
import { ReviewSubmissionForm } from "@/components/forms/review-form";
import FAQSection from "@/components/section/faq-section";
import NutritionalInfo from "@/components/section/nutritional-info";
import ProductShowcase from "@/components/section/product-showcase";
import RecipeShowCase from "@/components/section/recipe-showcase";
import CustomerReviews from "@/components/section/scrollable-review";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CardBgColors } from "@/constants/colors";
import { IMG1, Wavvy, YogaBar } from "@/constants/images";
import { prisma } from "@/lib/prisma-client";
import { getRandomColor } from "@/lib/utils";
import { FormattedProduct } from "@/types/product";
import { Category, Product, Rate, Image as TypeImage } from "@prisma/client";
import Image from "next/image";
import { notFound } from "next/navigation";


// Define the Category type with nested products
type CategoryWithProducts = Category & {
    products: (Product & {
        image: TypeImage[];
        rate: Rate[];
    })[];
};

export default async function Page({
    params,

}: {
    params: { id: string };

}) {
    const id = params.id;

    if (!id) return notFound();

    const ProductInfo = await prisma.product.findFirst({
        where: { id },
        include: {
            Category: true,
            image: true,
            ingredients: true,
            nonIngredient: true,
            nutritionalFacts: true,
            productVariation: true,
            rate: true
        }
    });
    const similarProducts = await prisma.product.findMany({
        where: {
            categoryId: ProductInfo?.categoryId as string,
            NOT: {
                id: id,
            },

        },

        include: {
            Category: true,
            image: true,
            ingredients: true,
            nonIngredient: true,
            nutritionalFacts: true,
            productVariation: true,
            rate: true
        }
    });


    const rates = await prisma.rate.findMany({
        where: {
            productId: id
        },
        include: {
            User: {
                select: {
                    image: true,
                    name: true
                }
            }
        }
    })

    if (!ProductInfo || !ProductInfo.categoryId) return notFound();
    const categoryWithProduct: CategoryWithProducts | null = await prisma.category.findFirst({
        where: { id: ProductInfo?.categoryId },
        include: {
            products: {
                include: {
                    image: true,
                    rate: true,
                    Category: true,
                    productVariation: true
                },
            },
        },
    });


    const formattedProducts: FormattedProduct[] = similarProducts.map((product, index) => ({
        id: product.id,
        name: product.name,
        imageUrl: product.image[0]?.url || '/placeholder.svg',
        altText: product.name,
        price: product.price,
        discount: product.discount || undefined,
        description: product.description,
        badge: "New",
        rating: product.rate.length,
        backgroundColor: CardBgColors[index % CardBgColors.length],
        variation: product.productVariation[0] ? {
            price: product.productVariation[0].price,
            stock: product.productVariation[0].stock,
            sku: product.productVariation[0].sku as string
        } : undefined,
        variationId: product.productVariation[0]?.id
    }));



    if (!ProductInfo || !ProductInfo.Category) return notFound();

    return (
        <main>
            <ProductShowcase
                category={ProductInfo.Category}
                product={ProductInfo}
                similarProducts={similarProducts.slice(0, 2)}
            />
            <Image
                src={Wavvy}
                alt="Yoga bar"
                className=" w-full h-full"
            />

            <NutritionalInfo
                ingredients={ProductInfo?.ingredients}
                nonIngredients={ProductInfo?.nonIngredient}
                nutritionalFacts={ProductInfo?.nutritionalFacts}

            />
            <FAQSection />
            {/* @ts-ignore  */}
            {rates.length > 0 && <CustomerReviews reviews={rates} />}
            {!categoryWithProduct ? <div>
                <p>Not Product   with this  category</p>
            </div> :
                <section key={categoryWithProduct.id} className={`p-6 rounded-lg ${getRandomColor()}`}>
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-2xl mx-auto self-center font-semibold mb-4">
                            Recommended Products you  may like?
                        </h2>
                    </div>
                    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                        <div className="flex w-max space-x-4 p-4">
                            {categoryWithProduct.products.filter((p) => p.id !== id).map((product) => {
                                const formattedProduct: FormattedProduct = {
                                    id: product.id,
                                    name: product.name,
                                    imageUrl: product.image[0]?.url ?? IMG1,
                                    altText: product.name,
                                    price: product.price,
                                    discount: product.discount,
                                    description: product.description,
                                    badge: "New",
                                    rating: product.rate.length,
                                };
                                return <ProductCard key={product.id} product={formattedProduct} />;
                            })}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </section>
            }
            <RecipeShowCase
                products={formattedProducts}
            />
            <Image
                src={YogaBar}
                alt="Yoga bar"
                className=" w-full h-full"
            />
            <ReviewSubmissionForm productId={ProductInfo.id} />
        </main>
    );
}