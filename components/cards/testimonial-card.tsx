"use client";

import React from "react";
import ReactFlipCard from "reactjs-flip-card";

interface TestimonialCardProps {
    quote: string;
    name: string;
    title: string;
    imageUrl: string;
    details: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, title, imageUrl, details }) => {
    return (
        <ReactFlipCard
            containerCss="mx-5 w-80 overflow-hidden h-[450px] rounded-md"
            flipTrigger="onHover"
            frontComponent={
                <div
                    className="w-80 h-full flex flex-col justify-between p-6 text-white relative rounded-md overflow-hidden transition-all duration-900"
                    style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-purple-900/50 z-10" />
                    <div className="relative z-20">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
                            <path d="M14.88 18.72C13.152 20.256 11.904 21.984 11.136 23.904C10.368 25.824 9.984 27.84 9.984 29.952C9.984 32.832 10.8 35.136 12.432 36.864C14.064 38.592 16.128 39.456 18.624 39.456C21.12 39.456 23.184 38.592 24.816 36.864C26.448 35.136 27.264 32.928 27.264 30.24C27.264 27.552 26.448 25.344 24.816 23.616C23.184 21.888 21.12 21.024 18.624 21.024C18.144 21.024 17.664 21.072 17.184 21.168C17.472 20.304 18.048 19.488 18.912 18.72C19.776 17.952 20.736 17.376 21.792 16.992L19.2 12C17.28 12.768 15.936 13.824 15.168 15.168C14.4 16.512 14.112 17.76 14.304 18.912L14.88 18.72ZM33.6 18.72C31.872 20.256 30.624 21.984 29.856 23.904C29.088 25.824 28.704 27.84 28.704 29.952C28.704 32.832 29.52 35.136 31.152 36.864C32.784 38.592 34.848 39.456 37.344 39.456C39.84 39.456 41.904 38.592 43.536 36.864C45.168 35.136 45.984 32.928 45.984 30.24C45.984 27.552 45.168 25.344 43.536 23.616C41.904 21.888 39.84 21.024 37.344 21.024C36.864 21.024 36.384 21.072 35.904 21.168C36.192 20.304 36.768 19.488 37.632 18.72C38.496 17.952 39.456 17.376 40.512 16.992L37.92 12C36 12.768 34.656 13.824 33.888 15.168C33.12 16.512 32.832 17.76 33.024 18.912L33.6 18.72Z" fill="white" fillOpacity="0.2" />
                        </svg>
                        <h2 className="text-sm">{quote}</h2>
                    </div>
                    <div>
                        <p className="text-lg">{name}</p>
                        <p className="text-sm opacity-80">{title}</p>
                    </div>
                </div>
            }
            backComponent={
                <div className="w-80 h-full flex flex-col justify-center items-center text-center p-6 bg-[#93385d] text-white rounded-md transition-all duration-300">
                    <h2 className="text-2xl font-bold mb-4">More Details</h2>
                    <p className="text-sm leading-relaxed">{title}</p>
                </div>
            }
        />
    );
};

export default TestimonialCard;
