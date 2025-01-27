"use client";
import { gooddogFont } from "@/lib/local-font"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import CustomButton from "../shared/custom-button"
import { useRouter } from "next/navigation"

export default function NeverHaveSection() {
    const router = useRouter();
    return (
        <div className="bg-[#FFF] p-8 font-sans">
            <div className="max-w-2xl mx-auto relative">
                <div className="w-full relative bg-[#9C4E7E] px-5 py-4 rounded-full max-w-md mx-auto mb-2">
                    <p className={cn(gooddogFont.className, "text-white text-3xl text-center")}><span className="underline">Never</span> have I ever</p>

                </div>

                <h2 className={cn(gooddogFont.className, "text-xl font-semibold mb-4")}>Added any of these:</h2>

                <div className="flex space-x-4 items-center">
                    <div>
                        {["Sugar", "Sugar Alcohols", "Preservatives"].map((item, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <X className={cn(gooddogFont.className, "w-5 h-5 mr-2 text-[#3d0327]")} />
                                <span className={cn(gooddogFont.className, "text-gray-800")}>{item}</span>
                            </div>
                        ))}
                    </div>
                    <div>
                        {["Soy or Gluten", "Flavour", "Artificial Sweeteners", "Colour"].map((item, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <X className={cn(gooddogFont.className, "w-5 h-5 mr-2 text-[#3d0327]")} />
                                <span className={cn(gooddogFont.className, "text-gray-800")}>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Character SVG */}
                <svg className="w-32 h-32 absolute right-0 bottom-20" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M64 120C95.4802 120 120 95.4802 120 64C120 32.5198 95.4802 8 64 8C32.5198 8 8 32.5198 8 64C8 95.4802 32.5198 120 64 120Z" fill="#FDE2E2" />
                    <path d="M40 80C46.6274 80 52 74.6274 52 68C52 61.3726 46.6274 56 40 56C33.3726 56 28 61.3726 28 68C28 74.6274 33.3726 80 40 80Z" fill="#9C4E7E" />
                    <path d="M88 80C94.6274 80 100 74.6274 100 68C100 61.3726 94.6274 56 88 56C81.3726 56 76 61.3726 76 68C76 74.6274 81.3726 80 88 80Z" fill="#9C4E7E" />
                    <path d="M64 100C73.9411 100 82 91.9411 82 82H46C46 91.9411 54.0589 100 64 100Z" fill="#9C4E7E" />
                    <path d="M24 40C24 40 32 36 40 36C48 36 56 40 56 40" stroke="#9C4E7E" strokeWidth="4" strokeLinecap="round" />
                    <path d="M72 40C72 40 80 36 88 36C96 36 104 40 104 40" stroke="#9C4E7E" strokeWidth="4" strokeLinecap="round" />
                </svg>

                <div className="bg-[#FFF3F1] rounded-lg border border-[#9C4E7E] p-6 flex flex-col md:flex-row items-center justify-between relative z-10 shadow-xl">
                    <p className="text-gray-800 text-lg mb-4 md:mb-0">No half-truths. No false-claims.<br />And def no * marks.</p>

                    <CustomButton
                        onClick={() => router.push('/shop/our-story')}
                        border="#9C4E7E" title="OUR STORY" />
                </div>
            </div>
        </div>
    )
}
