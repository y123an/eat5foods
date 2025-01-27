"use client";
import { Button } from "@/components/ui/button";
type Props = {
    text?: string;
    width?: number;
    height?: number;
    backgroundColor?: string;
    primaryColor?: string;
    secondaryColor?: string;
    hoverTranslateY?: number;
    onClick?: () => void;
}
export default function RaisedButton({
    text = "Button",
    width = 200,
    height = 60,
    backgroundColor = "#FFF5F5",
    primaryColor = "#9C4E7E",
    secondaryColor = "#FFFFFF",
    hoverTranslateY = -1,
    onClick,
}: Props) {
    return (
        <div className={`p-8 bg-[${backgroundColor}]`}>
            <div className="relative inline-block">
                <svg
                    width={width}
                    height={height}
                    viewBox={`0 0 ${width} ${height}`}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 left-0"
                >
                    <rect
                        x="0"
                        y={height / 7.5}
                        width={width}
                        height={(height * 52) / 60}
                        rx={height / 2.3}
                        fill={primaryColor}
                    />
                    <rect
                        x="4"
                        y="4"
                        width={width - 8}
                        height={(height * 52) / 60}
                        rx={height / 2.3}
                        fill={secondaryColor}
                    />
                </svg>
                <button
                    onClick={onClick}
                    className={`relative z-10 w-[${width - 3}px] h-[${(height * 52) / 60
                        }px] bg-${secondaryColor} hover:bg-${secondaryColor} text-${primaryColor} font-bold text-lg rounded-full border-2 border-${primaryColor} transition-transform hover:-translate-y-${hoverTranslateY}`}
                >
                    {text}
                </button>
            </div>
        </div>
    );
}
