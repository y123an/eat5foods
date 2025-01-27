"use client"
import { cn } from "@/lib/utils";

type Props = {
    title: string,
    btnBg?: string,
    fill?: string,
    border?: string,
    textColor?: string;
    disabled?: boolean,
    onClick?: () => void


}

export default function CustomButton({
    title,
    onClick,
    btnBg = '#fff',
    fill = '#9C4E7E',
    border = '#fff',
    textColor = '#9C4E7E',
    disabled = false,
}: Props) {
    return (
        <div
            className={cn(`cursor-pointer ${disabled ? 'opacity-65' : 'opacity-100'}  cursor-pointer`)}>
            <div
                style={{
                    backgroundColor: fill,
                }}
                className={`relative hover:opacity-95  rounded-full inline-block`}>
                <div
                    onClick={onClick}
                    className="relative z-10 px-5 py-2  font-bold text-lg rounded-full flex items-center justify-center  -top-[5px] left-[2px] transition-transform"
                    style={{
                        backgroundColor: btnBg,
                        color: textColor,
                        borderColor: border,
                        borderWidth: '0.5px',
                        borderStyle: 'solid'
                    }}
                >
                    {title}
                </div>
            </div>
        </div>
    )
}
