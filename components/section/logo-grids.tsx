"use client";

import { gooddogFont } from '@/lib/local-font';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';

const companies = [
    { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
    { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'Facebook', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' },
    { name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
    { name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
    { name: 'Twitter', logo: 'https://img.icons8.com/color/100/twitter--v1.png' },
    { name: 'Dell', logo: 'https://img.icons8.com/color/100/hp.png' },
    { name: 'Nvidia', logo: 'https://img.icons8.com/color/100/dell.png' },
    { name: 'Uber', logo: 'https://img.icons8.com/color/100/github.png' },
    { name: 'GitHub', logo: 'https://img.icons8.com/color/100/nasa.png' },
];

export default function LogoGrid() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isHover, setIsHover] = useState(false);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let scrollPosition = 0;
        const scrollWidth = scrollContainer.scrollWidth;
        const clientWidth = scrollContainer.clientWidth;

        const scroll = () => {
            if (isHover) return;
            scrollPosition += 1;
            if (scrollPosition > scrollWidth - clientWidth) {
                scrollPosition = 0;
            }
            scrollContainer.scrollLeft = scrollPosition;
        };

        const intervalId = setInterval(scroll, 30);

        return () => clearInterval(intervalId);
    }, [isHover]);

    return (
        <div className="bg-white py-8">
            <div className="container mx-auto px-4">
                <h2 className="text-center text-3xl font-bold mb-4">
                    Stop the <span className="relative text-black font-extrabold">
                        Lies
                        <span className={cn(gooddogFont.className, "absolute -top-4 right-0 text-[#9C4E7E] rotate-12 text-xl")}>press</span>
                    </span>
                </h2>

                <Marquee>
                    {[...companies, ...companies].map((company, index) => (
                        <div key={index} className=" w-40">
                            <img
                                src={company.logo}
                                alt={`${company.name} logo`}
                                width={150}
                                height={50}
                                className="object-contain h-12"
                            />
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
}
