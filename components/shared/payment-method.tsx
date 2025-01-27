import { gooddogFont } from "@/lib/local-font";
import { cn } from "@/lib/utils";
import { LockClosedIcon } from "@radix-ui/react-icons";

export default function PaymentMethod() {
    const images = [
        "https://img.icons8.com/papercut/50/mastercard--v2.png",
        "https://img.icons8.com/color/100/visa.png",
        "https://img.icons8.com/color/100/paytm.png",
        "https://img.icons8.com/color/100/google-pay-india.png",
    ]
    return (
        <div className="bg-white py-4 border-t border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center justify-center space-x-4 space-y-2">
                    <span className="text-black font-sans text-sm font-bold whitespace-nowrap">
                        Securely pay using:
                    </span>
                    <div className="flex items-center space-x-4 flex-wrap">
                        {images.map((image) => (
                            <img
                                key={image}
                                src={image}
                                className="w-10 h-10"
                            />
                        ))}
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="15" r="15" fill="#6739B7" />
                            <path d="M9 12H21V18H9V12Z" fill="white" />
                        </svg>
                        <span className={cn(gooddogFont.className, "text-[#93385d] font-cursive  whitespace-nowrap")}>
                            Oh! and Cash On Delivery too :)
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}


export function PaymentMethodForCart() {
    const images = [
        "https://img.icons8.com/papercut/50/mastercard--v2.png",
        "https://img.icons8.com/color/100/visa.png",
        "https://img.icons8.com/color/100/paytm.png",
        "https://img.icons8.com/color/100/google-pay-india.png",
    ]
    return (
        <div className="bg-white py-4 border-t border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center space-x-4 space-y-2">
                    <div className="flex items-center space-x-4 flex-wrap">
                        {images.map((image) => (
                            <img
                                key={image}
                                src={image}
                                className="w-10 h-10"
                            />
                        ))}

                    </div>
                    <div className="flex items-center space-x-2">
                        <LockClosedIcon />
                        <span className={cn(gooddogFont.className, "text-[#93385d] font-cursive  whitespace-nowrap")}>
                            100% secured payments
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

