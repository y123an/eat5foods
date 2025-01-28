import { ProductCard } from "@/components/cards/product-card";
import HeroSection from "@/components/section/hero-section";
import LogoGrid from "@/components/section/logo-grids";
import NeverHaveSection from "@/components/section/never-have-section";
import ProductSection from "@/components/section/product-section";
import ProfileSection from "@/components/section/profile-section";
import ReviewSection from "@/components/section/review-section";
import TestimonialSection from "@/components/section/testimonial-section";
import TruthGptSection from "@/components/section/truth-gpt";
import PaymentMethod from "@/components/shared/payment-method";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CardBgColors } from "@/constants/colors";
import { gooddogFont } from "@/lib/local-font";
import { generateMetadata } from "@/lib/meta-data";
import { prisma } from "@/lib/prisma-client";
import { cn } from "@/lib/utils";
import { FormattedProduct } from "@/types/product";
import { SlideData } from "@/types/slider";




export const metadata = generateMetadata({
    title: " Explore Eat5Food Products"
})




interface ShopRangeProps {
    title?: string;
    subtitle?: string;
}

const ShopRange: React.FC<ShopRangeProps> = ({
    title = "Shop Our Range",
    subtitle = "you'll want them all!"
}) => {
    return (
        <div className="bg-[#fff5f5] p-6 text-center">
            <h2 className="text-4xl font-bold mb-2">{title}</h2>
            <div className="relative inline-block">
                <p className={cn(gooddogFont.className, "text-[#ff69b4] text-lg italic")}>{subtitle}</p>
                <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 172 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4.5C43.3333 2.16667 128.4 -1.6 171 4" stroke="#ff69b4" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </div>
        </div>
    );
};

export default async function HomePage() {
    const products = await prisma.product.findMany({
        include: {
            image: true,
            rate: true,
            Category: true
        },
        where: {
            quantity: {
                gt: 0
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 10
    });

    const formattedProducts: FormattedProduct[] = products.map((product, index) => ({
        id: product.id,
        name: product.name,
        imageUrl: product.image[0]?.url || '/placeholder.svg',
        altText: product.name,
        price: product.price,
        discount: product.discount || undefined,
        description: product.description,
        badge: product.isPopular ? "Popular" : "New",
        rating: product.rate.length,
        backgroundColor: CardBgColors[index % CardBgColors.length],
        quantity: product.quantity
    }));

    const popularProducts = formattedProducts.slice(0, 4);

    const slidesData: SlideData[] = popularProducts.slice(0, 5).map((product, index) => ({
        title: product.name,
        subtitle: product.description,
        badgeText: "Popular!",
        buttonText: "SHOP NOW",
        imageUrl: product.imageUrl,
        imageAlt: product.altText,
        bgColor: `bg-[${product.backgroundColor}]`,
        badgeColor: "bg-purple-800",
        textColor: "#808080",
        features: [`${product.rating} Reviews`, `$${product.price.toFixed(2)}`],
        buttonLink: `/shop/${product.id}`,
    }));


    const PlatformReviews = await prisma.platformRating.findMany({
        include: {
            User: true
        }
    })
    return (
        <main>
            <section className="">
                {slidesData.length > 0 && <HeroSection slidesData={slidesData} />}
                <div>
                    <ShopRange />
                    {formattedProducts.length > 0 && <ProductSection Products={formattedProducts} />}
                </div>
                <div className="my-7">
                    <TruthGptSection />
                </div>
                {formattedProducts.length > 0 && (
                    <div className="px-6">
                        <h2 className="text-2xl font-bold text-center my-7">Featured Products </h2>
                        <ScrollArea className="w-full flex justify-center whitespace-nowrap">
                            <div className="flex w-max justify-center items-center space-x-4 p-4">
                                {formattedProducts.map((product, index) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                            <ScrollBar className="text-[#491c2e]" orientation="horizontal" />
                        </ScrollArea>
                    </div>
                )}
                <ProfileSection users={PlatformReviews.slice(0, 10)} />
                <ReviewSection />
                {formattedProducts.length > 0 && (
                    <div className="px-6">
                        <h2 className="text-2xl font-bold text-center my-7">Special Offers</h2>
                        <ScrollArea className="w-full whitespace-nowrap">
                            <div className="flex w-max space-x-4 p-4">
                                {formattedProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                            <ScrollBar className="text-[#491c2e]" orientation="horizontal" />
                        </ScrollArea>
                    </div>
                )}
                <NeverHaveSection />
                <div className="p-4 bg-gray-100">
                    <TestimonialSection reviews={PlatformReviews} />
                </div>
                <LogoGrid />
                <PaymentMethod />
            </section>
        </main>
    );
}