"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSidebarStore } from "@/hooks/use-sidebar"
import { cn } from "@/lib/utils"
import { BarChart2, Clock, LayoutDashboard, ListOrdered, LogOut, MessageSquare, Package, Settings, Star, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BiCategory } from "react-icons/bi"
import { RiTimelineView } from "react-icons/ri"

type SidebarComponentProps = {
    ordersCount: number,
    customersCount: number,
    contactMessagesCount: number,
}

export default function SidebarComponent({ ordersCount, customersCount, contactMessagesCount }: SidebarComponentProps) {
    console.log(ordersCount, customersCount, contactMessagesCount)
    const pathname = usePathname()
    const { isOpen } = useSidebarStore()


    const links = [
        { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
        { href: "/admin/accounts", icon: Users, label: "Customers", badge: customersCount },
        { href: "/admin/orders", icon: ListOrdered, label: "Orders", badge: ordersCount },
        { href: "/admin/categories", icon: BiCategory, label: "Categories" },
        { href: "/admin/popular-deals", icon: Star, label: "Popular & Deals" },
        { href: "/admin/reviews-ratings", icon: RiTimelineView, label: "Reviews & Ratings" },
        { href: "/admin/products", icon: Package, label: "Products" },
        { href: "/admin/transactions", icon: Clock, label: "Transaction History" },
        { href: "/admin/analytics", icon: BarChart2, label: "Analytics" },
        { href: "/admin/contacts", icon: MessageSquare, label: "Contacts", badge: contactMessagesCount },
        { href: "/admin/our-story", icon: Settings, label: "Our Story" },
        { href: "/admin/settings", icon: Settings, label: "Settings" },
        { href: "/admin/logout", icon: LogOut, label: "Log out" },
    ]

    const isLinkActive = (href: string) => {
        if (href === "/admin") {
            return pathname === href
        }
        return pathname.startsWith(href)
    }

    return (
        <aside className={cn("bg-white w-full hidden md:block", isOpen ? "w-64" : "w-16")}>
            <ScrollArea className="w-full h-screen ">
                <div className="p-2 space-y-2">
                    {links.map(({ href, icon: Icon, label, badge }) => (
                        <Link key={href} href={href} passHref>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full group mb-1 relative h-12 flex items-center justify-start transition-colors duration-200",
                                    isLinkActive(href) ? "bg-[#046A38] text-white hover:bg-[#094528]" : "hover:bg-[#046A38] hover:text-white"
                                )}
                            >
                                <Icon
                                    className={cn(
                                        "h-5 w-5 ",
                                        isLinkActive(href) ? "text-white" : "text-[#046A38] group-hover:text-white"
                                    )}
                                />
                                <span
                                    className={cn(
                                        "text-start transition-all duration-100 ml-2",
                                        isOpen ? "opacity-100 w-full" : "opacity-0 w-0 hidden"
                                    )}
                                >
                                    {label}
                                </span>
                                {typeof badge === "number" && badge > 0 && (
                                    <Badge
                                        variant="destructive"
                                        className={cn(
                                            "ml-auto rounded-full",
                                            // isOpen ? "opacity-100" : "opacity-0"
                                        )}
                                    >
                                        {badge}
                                    </Badge>
                                )}

                            </Button>
                        </Link>
                    ))}
                </div>
            </ScrollArea>
        </aside>
    )
}