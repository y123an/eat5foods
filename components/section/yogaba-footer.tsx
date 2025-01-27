import { Facebook, Instagram, Linkedin } from "lucide-react"

export default function YogaBarFooter() {
    return (
        <footer className="bg-pink-500 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">


                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                            <p className="text-black font-bold">TBT</p>
                        </div>


                        <p className="text-sm">
                            WE&apos;RE A NUTRITION-LED FOOD COMPANY THAT PRIDES ITSELF IN MAKING LIP-SMACKING FOOD THAT&apos;S GOOD FOR YOU. ALL WITHOUT ANY ARTIFICIAL COLOURS, CHEMICALS OR PRESERVATIVES. IYKYK.
                        </p>
                        <p className="text-sm">AND IF YOU DON&apos;T, WHAT ARE YOU WAITING FOR? GO ON AND TRY SOME!</p>
                        <div className="flex space-x-4">
                            <a href="#" className="bg-white p-2 rounded-md">
                                <Instagram className="w-6 h-6 text-pink-500" />
                            </a>
                            <a href="#" className="bg-white p-2 rounded-md">
                                <Linkedin className="w-6 h-6 text-pink-500" />
                            </a>
                            <a href="#" className="bg-white p-2 rounded-md">
                                <Facebook className="w-6 h-6 text-pink-500" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">SHOP</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#">ALL PRODUCTS</a></li>
                            <li><a href="#">NEW LAUNCHES & OFFERS</a></li>
                            <li><a href="#">BREAKFAST</a></li>
                            <li><a href="#">PROTEIN</a></li>
                            <li><a href="#">MUESLI</a></li>
                            <li><a href="#">BARS</a></li>
                            <li><a href="#">YOGABABY</a></li>
                            <li><a href="#">DRY FRUITS & SEEDS</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">QUICK LINKS</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#">SHIPPING & DELIVERY</a></li>
                            <li><a href="#">TERMS AND CONDITIONS</a></li>
                            <li><a href="#">PRIVACY POLICY</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">CONTACT US</h3>
                        <ul className="space-y-2 text-sm">
                            <li>PH: +919600030616</li>
                            <li>WE ARE AVAILABLE MONDAY TO SATURDAY: 10 AM - 6:00 PM.</li>
                            <li>EMAIL: HELLO@YOGABARS.IN</li>
                            <li>WE TRY TO RESPOND WITHIN 48 HOURS.</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-pink-400 text-center">
                    <p className="text-sm">
                        Who needs a magic wand when you&apos;ve got our protein bars? They&apos;ll turn your cravings into happy little lettuce leaves. Poof! 🥬✨
                    </p>
                </div>
            </div>
        </footer>
    )
}