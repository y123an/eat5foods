import { IMG1, IMG2 } from '@/constants/images'
import Image from 'next/image'

const categories = [
    { name: "All Products", image: IMG2, color: "bg-pink-500" },
    { name: "New Launches & Offers", image: IMG2, color: "bg-green-800" },
    { name: "Breakfast", image: IMG2, color: "bg-purple-500" },
    { name: "Protein", image: IMG2, color: "bg-pink-500" },
    { name: "Muesli", image: IMG2, color: "bg-yellow-500" },
    { name: "Bars", image: IMG2, color: "bg-green-800" },
    { name: "YogaBaby", image: IMG2, color: "bg-pink-500" },
    { name: "Dry Fruits & Seeds", image: IMG2, color: "bg-green-800" },
    { name: "Oats & Quinoa", image: IMG2, color: "bg-pink-500" },
]

export default function ProductCategories() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-4xl font-extrabold text-center mb-8 text-[#101f14]">Explore all categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {categories.map((category, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className={`w-40 h-40  rounded-mds flex items-center justify-center mb-2`}>
                            <div className="w-40 h-40 bg-white rounded-md flex items-center justify-center overflow-hidden">
                                <Image
                                    src={`https://picsum.photos/200/300?random=${index + 1}`}
                                    alt={category.name}
                                    width={100}
                                    height={100}
                                    className="object-cover rounded-md w-full"
                                />
                            </div>
                        </div>
                        <h3 className="text-center text-[#101f14] text-2xl font-semibold">{category.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}