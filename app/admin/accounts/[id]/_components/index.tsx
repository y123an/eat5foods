"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Address, Order, User } from "@prisma/client";
import { Award, MapPin, Menu } from "lucide-react";
import { useState } from "react";
import { RiAccountCircleLine } from "react-icons/ri";
import AccountComponent from "./account";
import MyAddresses from "./addresses";
import MyOrders from "./orders";

type Props = {
    userInfo: User & {
        addresses: Address[];

    };
    userOrders: Order[];
};

type Section = "user-info" | "orders" | "addresses" | "loyalty" | "delete";

export default function UserDetailPage({ userInfo, userOrders }: Props) {
    const [activeSection, setActiveSection] = useState<Section>("user-info");

    const renderContent = () => {
        switch (activeSection) {
            case "user-info":
                return <AccountComponent user={userInfo} />;
            case "orders":
                return <MyOrders userOrders={userOrders} />;
            case "addresses":
                return <MyAddresses
                    userInfo={userInfo}
                    userAddresses={userInfo.addresses} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center ">
            <div className="flex flex-col gap-3 md:flex-row w-full">
                {/* Navigation Links */}
                <Card className="md:w-1/4 flex-shrink-0">
                    <CardContent className="space-y-3 pr-4 overflow-x-auto flex md:h-screen md:flex-col w-full py-4 sticky top-[60px] md:overflow-hidden">
                        <button
                            onClick={() => setActiveSection("user-info")}
                            className={`flex-shrink-0 flex items-center p-2 rounded-md ${activeSection === "user-info" ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                                }`}
                        >
                            <RiAccountCircleLine className="w-5 h-5 mr-2" />
                            Account
                        </button>

                        <button
                            onClick={() => setActiveSection("orders")}
                            className={`flex-shrink-0 flex items-center p-2 rounded-md ${activeSection === "orders" ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                                }`}
                        >
                            <Menu className="w-5 h-5 mr-2" />
                            Orders
                        </button>

                        <button
                            onClick={() => setActiveSection("addresses")}
                            className={`flex-shrink-0 flex items-center p-2 rounded-md ${activeSection === "addresses" ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                                }`}
                        >
                            <MapPin className="w-5 h-5 mr-2" />
                            Addresses
                        </button>

                        <button
                            onClick={() => setActiveSection("loyalty")}
                            className={`flex-shrink-0 flex items-center p-2 rounded-md ${activeSection === "loyalty" ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                                }`}
                        >
                            <Award className="w-5 h-5 mr-2" />
                            Loyalty Points
                        </button>
                    </CardContent>
                </Card>

                {/* Dynamic Content Section */}
                <div className="flex-1 ml-3 md:ml-0 w-full ">
                    <div className="w-full h-full overflow-y-auto">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}
