import AdminLayoutConfig from "@/components/layout/admin-layout";
import SidebarComponent from "@/components/navigation/admin/admin-sidebar";
import TopHeader from "@/components/navigation/admin/admin-top-header";
import { prisma } from "@/lib/prisma-client";
import NotificationBannerAdmin from "./banner/page";
import { generateMetadata } from "@/lib/meta-data";


async function Layout({ children }: { children: React.ReactNode }) {
    const ordersCount = await prisma.order.count({
        where: {
            status: "NOT_DELIVERED"
        }
    })
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Get the start of the week (Sunday)

    const customersCount = await prisma.user.count({
        where: {
            role: "ADMIN",
            createdAt: {
                gte: startOfWeek, // Filter users joined this week
            },
        },
    });

    const contactMessagesCount = await prisma.contact.count({
        where: {
            createdAt: {
                gte: startOfWeek, // Filter messages received this week
            },
        },
    });
    return (
        <AdminLayoutConfig sidebar={<SidebarComponent
            ordersCount={ordersCount}
            customersCount={customersCount}
            contactMessagesCount={contactMessagesCount}
        />}>

            <header className="sticky  top-0 z-50 left-0 right-0 bg-white shadow-sm">
                <TopHeader />
                <NotificationBannerAdmin />
            </header>
            <section className="z-0 bg-[#F8F8F8] p-4">
                {children}
            </section>
        </AdminLayoutConfig>
    );
}

export default Layout;


export const metadata = generateMetadata({
    title: "Eat5Foods | Admin"
})