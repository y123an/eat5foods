'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useSidebarStore } from "@/hooks/use-sidebar"
import { cn } from "@/lib/utils"
import { BarChart2, Clock, Home, ListOrdered, LogOut, MessageSquare, Package, Settings, Star, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from 'react'
import { BiCategory } from "react-icons/bi"
import { RiMenu2Fill, RiMenu3Fill, RiTimelineView } from "react-icons/ri"

export function MobileDrawer() {
    const { isOpen, toggleSidebar } = useSidebarStore()
    const pathname = usePathname()
    const [newOrders, setNewOrders] = useState(5)
    const [newCustomers, setNewCustomers] = useState(3)

    const links = [
        { href: "/admin", icon: Home, label: "Dashboard" },
        { href: "/admin/accounts", icon: Users, label: "Customers", badge: newCustomers },
        { href: "/admin/orders", icon: ListOrdered, label: "Orders", badge: newOrders },
        { href: "/admin/categories", icon: BiCategory, label: "Categories" },
        { href: "/admin/popular-deals", icon: Star, label: "Popular & Deals" },
        { href: "/admin/reviews-ratings", icon: RiTimelineView, label: "Reviews & Ratings" },
        { href: "/admin/products", icon: Package, label: "Products" },
        { href: "/admin/transactions", icon: Clock, label: "Transaction History" },
        { href: "/admin/analytics", icon: BarChart2, label: "Analytics" },
        { href: "/admin/contacts", icon: MessageSquare, label: "Contacts" },
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
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    {isOpen ? (
                        <RiMenu2Fill onClick={toggleSidebar} className="h-5 w-5" />
                    ) : (
                        <RiMenu3Fill onClick={toggleSidebar} className="h-5 w-5" />
                    )}
                    <span className="sr-only">Toggle sidebar</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>Dashboard</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-57px)]">
                    <div className="space-y-1 p-2">
                        {links.map(({ href, icon: Icon, label, badge }) => (
                            <Link key={href} href={href} passHref>
                                <Button
                                    variant={isLinkActive(href) ? "secondary" : "ghost"}
                                    className={cn(
                                        "w-full justify-start items-center h-11 px-2",
                                        isLinkActive(href) ? "bg-secondary" : ""
                                    )}
                                >
                                    <Icon className={cn("mr-2 h-4 w-4", isLinkActive(href) ? "text-primary" : "text-muted-foreground")} />
                                    <span className="flex-grow text-left">{label}</span>
                                    {badge && (
                                        <Badge variant="destructive" className="ml-auto">
                                            {badge}
                                        </Badge>
                                    )}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}