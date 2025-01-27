"use client";
import { BlackLogo } from '@/constants/images';
import Image from 'next/image';
import Link from 'next/link';
import { FaBullhorn, FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const FooterSection = () => {
    return (
        <footer className="bg-[#1b1b1b] text-white px-8 md:px-24 pt-6 pb-24">
            <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10">
                {/* Logo and Newsletter Section */}
                <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">
                    <div className='w-[100px] h-[100px] flex items-center justify-center rounded-full'>
                        {/* <p className="text-3xl font-bold">E5F</p> */}
                        <Image src={BlackLogo} alt='logo' width={100} height={100} className='w-[100px] h-[100px]rounded-full object-cover' />
                    </div>
                    <div className="max-w-[410px]">
                        <div className="flex items-center space-x-2">
                            <FaBullhorn className="text-2xl" />
                            <h3 className="text-xl font-semibold">Eat Five Foods Unit</h3>
                        </div>
                        <p className="mt-2 text-gray-300">
                            One, BS free, in-depth article about food & fitness. Delivered every Saturday. Free (for now).
                        </p>


                    </div>

                </div>

                {/* Footer Links */}
                <div className=" flex mt-5 flex-col-reverse md:flex-col">
                    <div className='flex w-full p-4 md:p-12 space-x-12 justify-around '>
                        <div className="flex flex-col space-y-2">
                            <Link href="/shop/contact-us" className="text-[12px] my-1">Contact Us</Link>
                            <Link href="/shop/term-of-service" className="text-[12px] my-1">Terms of Service</Link>
                            <Link href="/shop/our-policy" className="text-[12px] my-1">Our Policy</Link>
                            <Link href="/my-account" className="text-[12px] my-1">My Account</Link>
                            <Link href="/shop/search/refer" className="text-[12px] my-1">Refer & Earn</Link>
                            <Link href="/shop/offers" className="text-[12px] my-1">Offers </Link>
                            <Link href="/shop/rate-us" className="text-[12px] my-1">Rate Us </Link>
                            <Link href="/shop/testimonials" className="text-[12px] my-1">Give us feedback </Link>
                            <Link href="/shop/search/protein-powder" className="text-[12px] my-1">24g Protein Powder</Link>
                            <Link href="/shop/search/15g-protein-powder" className="text-[12px] my-1">15g Protein Powder</Link>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Link href="/shop/categories" className="text-[12px] my-1">All Categories </Link>
                            <Link href="/shop/search/energy-bar" className="text-[12px] my-1">Energy Bar</Link>
                            <Link href="/shop/search/protein-bar" className="text-[12px] my-1">Protein Bar</Link>
                            <Link href="/shop/search/mini-protein-bar" className="text-[12px] my-1">Mini Protein Bar</Link>
                            <Link href="/shop/search/muesli" className="text-[12px] my-1">Muesli</Link>
                            <Link href="/shop/search/nut-butter" className="text-[12px] my-1">Nut Butter</Link>
                            <Link href="/shop/search/dark-chocolate" className="text-[12px] my-1">Dark Chocolate</Link>
                        </div>
                    </div>

                    {/* Social Media & Copyright */}
                    <div className="flex md:mt-10 justify-between w-full">
                        <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="font-bold">
                            <FaTwitter className='w-7 h-7' />
                        </Link>
                        <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="font-bold">
                            <FaFacebookF className='w-7 h-7' />
                        </Link>
                        <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-bold">
                            <FaInstagram className='w-7 h-7' />
                        </Link>
                        <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="font-bold">
                            <FaYoutube className='w-7 h-7' />
                        </Link>
                    </div>
                </div>
            </div>



            <hr className='h-[0.6px] bg-slate-200 my-8' />
            <p className="text-center text-sm">© 2023,Eat Five Foods . All rights reserved.</p>
        </footer>
    );
}

export default FooterSection;
