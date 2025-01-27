import { Rate, User } from "@prisma/client"
import { Star } from "lucide-react"

interface ReviewProps {
    name: string
    comment: string,
    rating: number

}

function Review({ name, comment }: ReviewProps) {
    return (
        <div className="bg-white flex flex-col justify-between w-[390px] h-[176px]  rounded-lg p-4 shadow-md">
            <p className="text-gray-800 text-sm mb-2">{comment}</p>
            <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700">{name}</span>
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                </div>
            </div>
        </div>
    )
}


type Props = {
    reviews: (Rate & { User: { name: string, image: string | null } })[]
}

export default function CustomerReviews({ reviews }: Props) {

    return (
        <div className="bg-pink-500 py-12 px-4 relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-2">REAL FOOD REAL</h2>
                <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">REVIEWS</h2>
                <p className="text-white text-center mb-8">Rated out of 5</p>

                {/* Horizontal scroll container */}
                <div className="overflow-x-scroll hide-scrollbar flex space-x-4 py-4 hide-scrollbar">
                    <div className="flex flex-nowrap space-x-6">
                        {reviews.map((review, index) => (
                            <div
                                key={index}
                                className=" flex-shrink-0"
                            >
                                <Review
                                    rating={review.value}
                                    name={review.User.name} comment={review.comment || "No content "} />
                            </div>
                        ))}
                    </div>
                </div>
                {/* <div className="overflow-x-scroll hide-scrollbar flex space-x-4 py-4 ">
                    <div className="flex flex-nowrap space-x-6">
                        {reviews.map((review, index) => (
                            <div
                                key={index}
                                className=" flex-shrink-0"
                            >
                                <Review rating={review.value} name={review.User.name} comment={review.comment || "No Content"} />
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32">
                <div className="relative w-full h-full">
                    <div className="absolute top-4 right-4 w-24 h-24 bg-orange-400 rounded-full transform -rotate-45"></div>
                    <div className="absolute top-6 right-6 w-20 h-20 bg-yellow-400 rounded-full transform -rotate-45"></div>
                    <div className="absolute top-2 right-16 w-4 h-4 bg-white rounded-full"></div>
                    <div className="absolute top-1 right-14 w-2 h-2 bg-yellow-200 rounded-full"></div>
                </div>
            </div>
        </div>
    )
}
