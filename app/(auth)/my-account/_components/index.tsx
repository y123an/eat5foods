"use client";

import ProfileComponent from "@/components/pages/profile-page";
import { Order, Product, TransactionLog, User } from "@prisma/client";
import {
    ArrowLeft,
    LogOut,
    Menu
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { RiAccountCircleLine } from "react-icons/ri";

import SignOutComponent from "./sign-out";
import MyOrders from "./my-orders";

type OrderWithDetails = Order & {
    product: Product;
    TransactionLog: TransactionLog | null;
}
type Props = {
    user: User,
    orders: OrderWithDetails[]
}

export default function UserSettingOption({ user, orders }: Props) {
    const [activeSection, setActiveSection] = useState("personal-info");

    const renderContent = () => {
        switch (activeSection) {
            case "personal-info":
                return <ProfileComponent user={user} />;
            case "orders":
                return <MyOrders orders={orders} />;

            case "signout":
                return <SignOutComponent />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <Link href="/shop" className="flex items-center">
                        <div className="text-gray-500 hover:text-gray-700 mr-4">
                            <ArrowLeft className="w-6 h-6" />
                        </div>
                        <span className="text-lg font-medium text-gray-900">Back to shop</span>
                    </Link>
                    <div className="text-2xl font-bold">Eat Five Foods</div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row">
                    {/* Navigation Links (fixed on md and above) */}
                    <div className="px-4 md:w-1/4 md:fixed md:top-32 md:left-0 md:bottom-0 md:overflow-y-auto space-y-3 pr-4 md:border-r">
                        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

                        <button
                            onClick={() => setActiveSection("personal-info")}
                            className={`flex w-full items-center p-2 rounded-md ${activeSection === "personal-info" ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                                }`}
                        >
                            <RiAccountCircleLine className="w-5 h-5 mr-2" />
                            Account
                        </button>

                        <button
                            onClick={() => setActiveSection("orders")}
                            className={`flex w-full items-center p-2 rounded-md ${activeSection === "orders" ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                                }`}
                        >
                            <Menu className="w-5 h-5 mr-2" />
                            My Orders
                        </button>

                        <button
                            onClick={() => setActiveSection("signout")}
                            className={`flex w-full items-center p-2 rounded-md ${activeSection === "signout" ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                                }`}
                        >
                            <LogOut className="w-5 h-5 mr-2" />
                            Sign Out
                        </button>
                    </div>

                    {/* Dynamic Content Section */}
                    <div className="flex-1 md:ml-[25%]">
                        <div className="w-full h-full overflow-y-auto">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
