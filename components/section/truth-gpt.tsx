import { Hero3Image, Hero4Image, TruthGPT } from "@/constants/images";
import { AirplayIcon, Heart } from "lucide-react";
import Image from "next/image";
import CarouselWrapper from "../shared/caroucel-slider";
import { Button } from "../ui/button";
import CustomButton from "../shared/custom-button";

export default function TruthGptSection() {
    const slides = [

        {
            content: (
                <section className="flex flex-col items-center bg-[#000000] justify-between md:flex-row ">
                    <div className="flex flex-col p-6 text-center space-y-7 mx-auto ">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white flex items-center">Truth <AirplayIcon className="text-purple-600 h-16 w-16 mx-2" /> GPT</h1>
                        <p className="text-xl md:text-2xl text-white">The whole truth of Foods & Fitness  </p>
                        <p className="text-xl md:text-2xl text-white text-start">Powered by AI</p>
                        <Button className="bg-white hover:bg-gray-50 max-w-[200px] font-bold  text-black min-w-max">Ask Me Anything</Button>
                    </div>
                    <Image src={TruthGPT} alt="Truth GPR" />
                </section>
            ),
        },
        {
            content: (
                <div className="flex flex-col md:flex-row bg-[#f0a5a7] justify-between">
                    <Image
                        src={Hero4Image}
                        width={600}
                        height={400}
                        alt="Hero"
                        className=" h-full w-1/2 object-cover"
                        style={{ aspectRatio: "600/400", objectFit: "cover" }}
                    />
                    <div className=" flex flex-col md:flex-row items-center">
                        <div className="pl-12">
                            <div className="bg-[#FF6B6B] text-white px-4 py-2 rounded-full inline-flex items-center mb-4">
                                <span>200+ Chemical search</span>
                                <Heart className="ml-2 h-4 w-4" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Found an ingredient<br />
                                you can&apos;t <span className="bg-[#90EE90] px-2">pronounce</span>?
                            </h1>
                            <div className="my-3">
                                <CustomButton
                                    title="ALLOW US TO HELP"
                                    fill="#7e6b2a"
                                />
                            </div>

                        </div>
                    </div>
                </div>

            ),
            backgroundColor: "bg-indigo-700",
        },
        {
            content: (
                <div className="flex flex-col md:flex-row justify-between bg-[#bca9a1]">
                    <div className="space-y-4 p-6 flex-col ">
                        <h2 className="text-4xl font-bold tracking-tight">Introducing</h2>
                        <h1 className="text-xl md:text-5xl flex-1 font-bold">SINGLE  SERVE SACHET</h1>

                        <div className="flex space-x-4">
                            <div>
                                <Button>24g Proteins</Button>
                            </div>
                            <div>
                                <Button>66g BCAA</Button>
                            </div>

                        </div>
                        <div>
                            <CustomButton
                                title="SHOP NOW"
                            />
                        </div>
                    </div>
                    <Image
                        src={Hero3Image}
                        width={600}
                        height={400}
                        alt="Hero"
                        className="rounded-lg object-cover"
                        style={{ aspectRatio: "600/400", objectFit: "cover" }}
                    />
                </div>
            ),
            backgroundColor: "bg-red-800",
        },

    ];

    return <CarouselWrapper slides={slides} autoplayDelay={10000} />;
}





