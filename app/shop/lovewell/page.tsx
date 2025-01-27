// @ts-nocheck
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star, Play } from 'lucide-react'

const ReviewCard = ({ image, name, review, date }) => (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-sm">
        <Image src={image} alt={name} width={50} height={50} className="rounded-full mb-2" />
        <p className="text-sm mb-2">{review}</p>
        <p className="text-xs text-gray-500">{name} • {date}</p>
    </div>
)

const WallOfLove = () => (
    <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">mTruth&apos;s Wall of Love</h2>
            <h3 className="text-xl mb-8">Real People, Real Reviews ❤️</h3>
            <div className="flex space-x-4 overflow-x-auto pb-4">
                <ReviewCard
                    image={"https://github.com/onesamket.png"}
                    name="Sanjeet S3071"
                    review="Bought 5 BYOB variety box. Have tried the peanut butter so far. Taste is amazing!"
                    date="23rd Sep"
                />
                <ReviewCard
                    image={"https://github.com/onesamket.png"}
                    name="Shail"
                    review="Great packaging, prompt delivery and most importantly, real ingredients. Thank you!"
                    date="23rd Sep"
                />
                <ReviewCard
                    image={"https://github.com/onesamket.png"}
                    name="Shivakant"
                    review="Absolutely loved the Peanut butter. It's so creamy and delicious."
                    date="23rd Sep"
                />
            </div>
            <div className="flex justify-center mt-4 space-x-2">
                <button className="bg-white text-primary rounded-full p-2"><ChevronLeft className="w-6 h-6" /></button>
                <button className="bg-white text-primary rounded-full p-2"><ChevronRight className="w-6 h-6" /></button>
            </div>
        </div>
    </section>
)

const StarProfile = ({ image, name }) => (
    <div className="flex flex-col items-center">
        <Image src={image} alt={name} width={50} height={50} className="rounded-full mb-2" />
        <p className="text-xs">{name}</p>
    </div>
)

const StarsRUs = () => (
    <section className="bg-secondary py-12">
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Stars R us</h2>
            <p className="mb-8">and we didn&apos;t even have to pay for it</p>
            <div className="flex flex-wrap justify-between">
                {['Virat Kohli', 'Anushka Sharma', 'Shikhar Dhawan', 'Mithali Raj', 'KL Rahul', 'Sunil Chhetri', 'PV Sindhu', 'Smriti Mandhana', 'Neeraj Chopra'].map((name) => (
                    <StarProfile key={name} image={"https://github.com/onesamket.png"} name={name} />
                ))}
            </div>
        </div>
    </section>
)

const CommunityPost = ({ platform, content, stats }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex items-center mb-2">
            <Image src={`/placeholder.svg?height=20&width=20`} alt={platform} width={20} height={20} />
            <span className="ml-2 font-bold">{platform}</span>
        </div>
        <p className="mb-2">{content}</p>
        <div className="flex space-x-4">
            {stats.map((stat, index) => (
                <div key={index} className="flex items-center">
                    <span className="font-bold mr-1">{stat.value}</span>
                    <span className="text-xs text-gray-500">{stat.label}</span>
                </div>
            ))}
        </div>
    </div>
)

const OurCommunity = () => (
    <section className="bg-blue-100 py-12">
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Our Community ❤️</h2>
            <p className="mb-8">always has our back</p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <CommunityPost
                    platform="Instagram"
                    content="Thanks to lot of messages for what you see here today is for another level. As a founder of Indian origin, you are an inspiration. Specially how open you are to share everything that goes behind the scenes. Thank you for making India proud and being an amazing human being. Lots of love and respect."
                    stats={[
                        { value: '2,433', label: 'Likes' },
                        { value: '71', label: 'Comments' },
                        { value: '5,297', label: 'Views' }
                    ]}
                />
                <CommunityPost
                    platform="LinkedIn"
                    content="#justdoit Sometimes Stories Shashank Mehta I love reading your posts. They are so inspiring. Keep up the great work!"
                    stats={[
                        { value: '1,433', label: 'Reactions' },
                        { value: '71', label: 'Comments' }
                    ]}
                />
            </div>
            <div className="flex justify-center mt-4 space-x-2">
                <button className="bg-white text-primary rounded-full p-2"><ChevronLeft className="w-6 h-6" /></button>
                <button className="bg-white text-primary rounded-full p-2"><ChevronRight className="w-6 h-6" /></button>
            </div>
        </div>
    </section>
)

const PressMention = ({ logo, quote }) => (
    <div className="bg-white rounded-lg shadow-md p-4">
        <Image src={logo} alt="Press logo" width={100} height={50} className="mb-2" />
        <p className="text-sm">{quote}</p>
    </div>
)

const StopThePress = () => (
    <section className="bg-red-500 text-white py-12">
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Stop the press! 🖋️</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <PressMention
                    logo="/placeholder.svg?height=50&width=100"
                    quote="TWT represents unhealthy food brands with brutal honesty"
                />
                <PressMention
                    logo="/placeholder.svg?height=50&width=100"
                    quote="I love The Whole Truth Foods is bringing 'truth' to packaged foods"
                />
                <PressMention
                    logo="/placeholder.svg?height=50&width=100"
                    quote="TL:Why is The Whole Truth Foods ditching influencer marketing?"
                />
                <PressMention
                    logo="/placeholder.svg?height=50&width=100"
                    quote="D2C brand The Whole Truth raises $6M in Series A round"
                />
            </div>
            <div className="flex justify-center mt-4 space-x-2">
                <button className="bg-white text-primary rounded-full p-2"><ChevronLeft className="w-6 h-6" /></button>
                <button className="bg-white text-primary rounded-full p-2"><ChevronRight className="w-6 h-6" /></button>
            </div>
        </div>
    </section>
)

const StartupFamTestimonial = ({ image, name, company, quote }) => (
    <div className="flex items-start space-x-4">
        <Image src={image} alt={name} width={50} height={50} className="rounded-full" />
        <div>
            <h3 className="font-bold">{name}</h3>
            <p className="text-sm text-gray-600">{company}</p>
            <p className="mt-2">{quote}</p>
        </div>
    </div>
)

const FromStartupFam = () => (
    <section className="bg-yellow-100 py-12">
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">❤️ from startup fam</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StartupFamTestimonial
                    image={"https://github.com/onesamket.png"}
                    name="Kunal Shah"
                    company="CRED"
                    quote="The products are fantastic and the brand building is top notch"
                />
                <StartupFamTestimonial
                    image={"https://github.com/onesamket.png"}
                    name="Radhika Ghai"
                    company="kindlife"
                    quote="Love the brand, the products and most importantly the mission"
                />
                <StartupFamTestimonial
                    image={"https://github.com/onesamket.png"}
                    name="Vaibhav Sisinty"
                    company="GrowthSchool"
                    quote="Shashank's approach to brand building is next level"
                />
            </div>
        </div>
    </section>
)

const ContentSection = () => (
    <section className="py-12">
        <div className="container mx-auto px-4">
            <div className="bg-gray-100 rounded-lg p-4 mb-8">
                <h2 className="text-2xl font-bold mb-4">❤️ for our content</h2>
                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex-1">
                        <Image src="/placeholder.svg?height=225&width=400" alt="Which bread is healthier?" width={400} height={225} className="rounded-lg" />
                        <div className="flex items-center mt-2">
                            <Play className="text-red-600 mr-2" />
                            <span>4:26</span>
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold mb-2">Brown Bread vs White Bread: Which is Healthier?</h3>
                        <p className="text-sm mb-4">The Whole Truth Academy</p>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <Star className="text-yellow-400 mr-2" />
                                <span>You&apos;ll never look at brown bread the same way again</span>
                            </li>
                            <li className="flex items-center">
                                <Star className="text-yellow-400 mr-2" />
                                <span>The truth about &apos;atta&apos; bread</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4">The Whole Truth of Influencer Marketing</h3>
                    <p className="mb-4">On 8th October, we put out an open call for influencers who are willing to promote our products for free. Here&apos;s what happened next.</p>
                    <Image src="/placeholder.svg?height=225&width=400" alt="Influencer Marketing" width={400} height={225} className="rounded-lg" />
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">The Whole Truth-Savers</h3>
                    <p className="mb-4">Meet the people who are helping us spread the truth</p>
                    <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Image key={i} src="/placeholder.svg?height=100&width=100" alt={`Truth-Saver ${i}`} width={100} height={100} className="rounded-full" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
)

const JoinTheGang = () => (
    <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Join the gang</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4">
                <Image src="/placeholder.svg?height=200&width=200" alt="Product 1" width={200} height={200} className="rounded-lg" />
                <Image src="/placeholder.svg?height=200&width=200" alt="Product 2" width={200} height={200} className="rounded-lg" />
                <Image src="/placeholder.svg?height=200&width=200" alt="Product 3" width={200} height={200} className="rounded-lg" />
            </div>
        </div>
    </section>
)

export default function Page() {
    return (
        <main className="min-h-screen bg-white">
            <WallOfLove />
            <StarsRUs />
            <OurCommunity />
            <StopThePress />
            <FromStartupFam />
            <ContentSection />
            <JoinTheGang />
        </main>
    )
}