import { ProductCard } from "@/components/cards/product-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CardBgColors } from "@/constants/colors";
import { IMG2 } from "@/constants/images";
import { generateMetadata } from "@/lib/meta-data";
import { prisma } from "@/lib/prisma-client";
import { FormattedProduct } from "@/types/product";
import { Image, Product, Rate, Category as PrismaCategory } from "@prisma/client";

// Define the Category type with nested products
type CategoryWithProducts = PrismaCategory & {
    products: (Product & {
        image: Image[];
        rate: Rate[];
    })[];
};



export const metadata = generateMetadata({
    title: " Explore Eat5Food Categories"
})




export default async function Page() {

    const categories: CategoryWithProducts[] = await prisma.category.findMany({

        include: {
            products: {
                include: {
                    image: true,
                    rate: true,
                    Category: true,
                },
            },

        },
    });

    const getRandomColor = () => {
        const colors = [
            "bg-pink-100",
            "bg-blue-100",
            "bg-green-100",
            "bg-yellow-100",
            "bg-purple-100",
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
            {categories.filter(category => category.products.length > 0).map((category) => (
                <section
                    key={category.id}
                    className={`mb-12 p-6 rounded-lg ${getRandomColor()}`}
                >
                    <div className="flex flex-col items-center justify-center">

                        <h2 className="text-2xl mx-auto  self-center font-semibold mb-4">{category.name}</h2>
                        <p>{category.description}</p>
                    </div>


                    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                        <div className="flex w-max space-x-4 p-4">
                            {category.products.slice(0, 12).map((product, index) => {
                                // Formatting each product to match the FormattedProduct structure
                                const formattedProduct: FormattedProduct = {
                                    id: product.id,
                                    name: product.name,
                                    imageUrl: product.image[0]?.url ?? IMG2,
                                    altText: product.name,
                                    price: product.price,
                                    discount: product.discount,
                                    description: product.description,
                                    badge: "New",
                                    rating: product.rate.length,
                                    backgroundColor: CardBgColors[index % CardBgColors.length],

                                };
                                return <ProductCard key={product.id} product={formattedProduct} />;
                            })}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </section>
            ))}
        </main>
    );
}
