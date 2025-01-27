"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebarStore } from "@/hooks/use-sidebar";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { IoIosQrScanner } from "react-icons/io";
import { RiMenu2Fill, RiMenu3Fill } from "react-icons/ri";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MobileDrawer } from "./admin-mobile-sidebar";

type FullscreenState = boolean;

export default function TopHeader() {
    const { isOpen, closeSidebar, openSidebar } = useSidebarStore();
    const router = useRouter();
    const [isFullscreen, setIsFullscreen] = useState<FullscreenState>(false);

    // Handler 
    const handleScannerClick = () => {
        if (isFullscreen) {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
                // @ts-ignore
            } else if (document.mozCancelFullScreen) { // Firefox
                // @ts-ignore
                document.mozCancelFullScreen();
            }
            // @ts-ignore
            else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
                // @ts-ignore
                document.webkitExitFullscreen();
            }
            // @ts-ignore
            else if (document.msExitFullscreen) { // IE/Edge
                // @ts-ignore
                document.msExitFullscreen();
            }
        } else {
            // Enter fullscreen
            const element = document.documentElement; // Use the entire document
            if (element.requestFullscreen) {
                element.requestFullscreen();
                // @ts-ignore
            } else if (element.mozRequestFullScreen) { // Firefox
                // @ts-ignore
                element.mozRequestFullScreen();
            }
            // @ts-ignore
            else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
                // @ts-ignore
                element.webkitRequestFullscreen();
                // @ts-ignore
            } else if (element.msRequestFullscreen) { // IE/Edge
                // @ts-ignore
                element.msRequestFullscreen();
            }
        }
        setIsFullscreen(!isFullscreen);
    };
    return (
        <header className="flex justify-between p-3">
            <div>
                {/* for mobile screens  */}
                <div className="md:hidden">
                    <MobileDrawer />
                </div>
                {/* for large screen  */}
                <div className="hidden md:block">
                    {isOpen ? (
                        <RiMenu2Fill onClick={closeSidebar} className="size-4 cursor-pointer text-[#046A38]" />
                    ) : (
                        <RiMenu3Fill onClick={openSidebar} className="w-4 cursor-pointer text-[#046A38]" />
                    )}
                </div>
            </div>
            <div className="flex items-center space-x-5 px-4">
                <IoIosQrScanner onClick={handleScannerClick} className="size-4 cursor-pointer text-[#046A38]" />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center px-5">
                            <User className="size-4 cursor-pointer text-[#046A38]" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link
                                className="flex items-center space-x-2"
                                href={'/admin/settings'}>
                                <Settings className="w-4 h-4" />
                                <span>Settings</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <button
                                onClick={() => signOut()}
                                className="flex items-center w-full py-2 px-1 rounded  bg-red-500 hover:bg-red-600 text-white space-x-2 cursor-pointer "
                            >
                                <LogOut className="w-4 h-4 " />
                                <span>Logout</span>
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
