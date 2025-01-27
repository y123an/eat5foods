import React from 'react'

interface NewButtonProps {
    text?: string
}

const NewButton: React.FC<NewButtonProps> = ({ text = 'NEW!' }) => {
    return (
        <div className="relative inline-flex">
            <div className="bg-[#4a2d79] text-white font-bold py-1 pl-3 pr-5 text-sm uppercase tracking-wide">
                {text}
            </div>
            <div
                className="absolute right-0 top-0 h-full w-3 overflow-hidden"
                style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
            >
                <div className="absolute inset-0 bg-[#4a2d79] transform -skew-x-12 origin-top-left"></div>
            </div>
        </div>
    )
}

export default NewButton

// // Usage example
// export function Component() {
//     return (
//         <div className="bg-[#ffd84d] p-8 flex justify-center items-center min-h-screen">
//             <NewButton />
//         </div>
//     )
// }