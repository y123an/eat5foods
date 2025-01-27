"use client";

import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { PlaceholderImage, WhiteLogo } from "@/constants/images";
import useCartStore from "@/hooks/use-cart";
import useSearch from "@/hooks/use-search";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { ScrollArea } from "../../ui/scroll-area";
import NotificationBanner from "@/components/shared/notification-banner";
import { useSession } from "next-auth/react";

const shopItems = [
    { title: "24g Protein Powder", href: "/shop/24g-protein-powder" },
    { title: "15g Protein Powder", href: "/shop/15g-protein-powder" },
    { title: "Protein Bars Pro", href: "/shop/protein-bars-pro" },
    { title: "Protein Bars", href: "/shop/protein-bars" },
    { title: "Badaaaam Chocolate", href: "/shop/badaaaam-chocolate" },
    { title: "Dark Chocolate", href: "/shop/dark-chocolate" },
    { title: "Milk Chocolate", href: "/shop/milk-chocolate" },
    { title: "Nut Butters", href: "/shop/nut-butters" },
    { title: "Muesli", href: "/shop/muesli" },
];

type Props = {
    bannerShown: boolean;
    bannerContent?: string;
    categories: Category[];
};

export default function ShopHeader({
    bannerShown,
    categories,
    bannerContent,
}: Props) {
    const { data: session } = useSession();
    const { toggleSearch } = useSearch();
    const { toggleCart, items } = useCartStore();

    return (
        <header className="w-full bg-[#f3eaee] fixed z-50 ">
            <div className="bg-[#ffffff]">
                <div className="mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/shop" className="text-2xl hidden md:flex font-bold">
                            <Image
                                src={WhiteLogo}
                                alt="E3F"
                                width={150}
                                height={150}
                                className="h-20"
                            />
                        </Link>
                        <NavigationMenu>
                            <ScrollArea className="w-96 md:w-full whitespace-nowrap rounded-md border md:border-none">
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className="font-semibold">
                                            Shop
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-[70vw] bg-[#fdf3f1] gap-3 p-4 md:grid-cols-3">
                                                {categories.map((item) => (
                                                    <ListItem
                                                        key={item.id}
                                                        title={item.name}
                                                        imageURL={item.image}
                                                        href={`/shop/categories/${item.id}`}
                                                    />
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <Link href="/shop/popular" legacyBehavior passHref>
                                            <NavigationMenuLink
                                                className={cn(navigationMenuTriggerStyle(), "font-semibold")}
                                            >
                                                Popular Products
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <Link href="/shop/reviews" legacyBehavior passHref>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                Reviews
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <Link href="/shop/our-story" legacyBehavior passHref>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                Our Story
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <Link href="/shop/contact-us" legacyBehavior passHref>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                Contact us
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </ScrollArea>
                        </NavigationMenu>
                        <div className="flex items-center space-x-4">

                            <Button
                                onClick={toggleSearch}
                                variant="ghost"
                                size="icon"
                                aria-label="Search"
                            >
                                <Search className="h-6 w-6" />
                            </Button>
                            <Button
                                onClick={toggleCart}
                                variant="ghost"
                                size="icon"
                                aria-label="Shopping cart"
                                className="relative"
                            >
                                <ShoppingCart className="h-6 w-6" />
                                {items.length > 0 && <span className="absolute -top-2 -right-2 bg-[#9C4E7E] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    {items.length}
                                </span>}
                            </Button>
                            <Link href={"/my-account"}>
                                <Button variant="ghost" size="icon" aria-label="User account">
                                    {session ? <Image
                                        alt="avatar"
                                        className="w-6 h-6 rounded-full"
                                        src={session.user.image || PlaceholderImage} width={50} height={50}
                                    /> : <User className="w-6 h-6" />}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* banner  */}
            {bannerShown && (
                <NotificationBanner />
            )}
        </header>
    );
}

type ListItemProps = React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    href: string;
    imageURL?: string;
};

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
    ({ className, title, imageURL, ...props }, ref) => (
        <li className="flex justify-center">
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "w-max md:w-[400px] bg-white shadow-md select-none space-y-1 rounded-md p-5 flex flex-row items-center justify-between leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm  font-medium leading-none">{title}</div>
                    {imageURL && <Image src={imageURL} className="w-[40px] h-[30px] rounded"
                        width={100}
                        height={100}
                        alt={title} />}

                </a>
            </NavigationMenuLink>
        </li>
    )
);

ListItem.displayName = "ListItem";
