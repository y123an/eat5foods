"use client"
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
    icon: ReactNode,
    btnBg?: string,
    fill?: string,
    border?: string,
    textColor?: string;
    disabled?: boolean,
    onClick?: () => void


}

export default function IconButton({
    icon,
    onClick,
    btnBg = '#fff',
    fill = '#9C4E7E',
    border = '#fff',
    textColor = '#9C4E7E',
    disabled = false,
}: Props) {
    return (
        <div
            className={cn(`${disabled ? 'opacity-65' : 'opacity-100'} flex justify-center`)}>
            <div
                style={{ backgroundColor: fill }}
                className="relative  min-w-[30px] h-[30px]  rounded-full inline-block">
                <div
                    onClick={onClick}
                    className="relative z-10 min-w-[30px] h-[30px] font-bold text-lg rounded-full flex items-center justify-center  -top-[5px] left-[2px] transition-transform"
                    style={{
                        backgroundColor: btnBg,
                        color: textColor,
                        borderColor: border,
                        borderWidth: '0.5px',
                        borderStyle: 'solid'
                    }}
                >
                    {icon}
                </div>
            </div>
        </div>
    )
}
