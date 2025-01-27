import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'
import { PageNotFoundIMG } from '@/constants/images'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
            <div className="max-w-2xl w-full text-center">
                <div className="mb-8 mx-auto flex items-center justify-center ">
                    <Image src={PageNotFoundIMG} className='' alt='page not found' />
                </div>
                <h1 className="text-xl font-bold mb-4 text-gray-900">URL does not exist!</h1>
                <p className=" mb-8 text-gray-600">
                    Looks like the page that you are looking for does not exist. Please enter a valid URL and try again.
                </p>
                <Link href={'/'}>
                    <Button>Go Back</Button>
                </Link>
            </div>
        </div>
    )
}