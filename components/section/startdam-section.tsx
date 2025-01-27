import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SpeechBubble = ({ children }: { children: React.ReactNode }) => (
    <svg viewBox="0 0 300 150" className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-64">
        <path
            d="M0,0 h300 v110 q-150,40 -300,0 z"
            fill="white"
            stroke="#6B3074"
            strokeWidth="2"
        />
        <foreignObject x="10" y="10" width="280" height="130">
            {/* @ts-ignore  */}
            <div xmlns="http://www.w3.org/1999/xhtml" className="p-2 text-sm">
                {children}
            </div>
        </foreignObject>
    </svg>
)

const FounderCard = ({ name, role, company, logo, image, testimonial }: {
    name: string;
    role: string;
    company: string;
    logo: string;
    image: string;
    testimonial: string;
}) => (
    <div className="relative flex flex-col items-center">
        <SpeechBubble>
            <p>{testimonial} <a href="#" className="text-blue-600 underline">Read more</a></p>
        </SpeechBubble>
        <Image src={image} alt={name} width={200} height={200} className="rounded-full border-4 border-white" />
        <div className="mt-4 bg-white rounded-full px-4 py-2 flex items-center shadow-md">
            <div className="mr-2">
                <p className="font-bold">{name}</p>
                <p className="text-sm">{role}</p>
            </div>
            <Image src={logo} alt={company} width={50} height={20} />
        </div>
    </div>
)

export default function StartupFamSection() {
    return (
        <section className="bg-[#FFA726] py-16 px-4 relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold mb-12 text-[#6B3074]">
                    <span className="text-5xl">❤️</span> from startup fam
                </h2>
                <div className="flex justify-between items-center">
                    <button className="bg-[#6B3074] text-white rounded-full p-2 shadow-md">
                        <ChevronLeft size={24} />
                    </button>
                    <div className="flex justify-between w-full max-w-4xl">
                        <FounderCard
                            name="Avnish Bajaj"
                            role="Founder"
                            company="matrix"
                            logo="/placeholder.svg?height=20&width=50"
                            image="/placeholder.svg?height=200&width=200"
                            testimonial="the @wholetruthfood new energy bars have a new 14 year old fan in"
                        />
                        <FounderCard
                            name="Suchita Salwan"
                            role="Founder"
                            company="LBB"
                            logo="/placeholder.svg?height=20&width=50"
                            image="/placeholder.svg?height=200&width=200"
                            testimonial="SO DAMN GOOD @thewholetruthfoods"
                        />
                        <FounderCard
                            name="Mayank Goyal"
                            role="Founder"
                            company="hop"
                            logo="/placeholder.svg?height=20&width=50"
                            image="/placeholder.svg?height=200&width=200"
                            testimonial="I read somewhere that if your product is 3x - 4x better, the user"
                        />
                    </div>
                    <button className="bg-[#6B3074] text-white rounded-full p-2 shadow-md">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
            <div className="absolute bottom-4 right-4 bg-[#6B3074] text-white rounded-full p-3 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
            </div>
        </section>
    )
}