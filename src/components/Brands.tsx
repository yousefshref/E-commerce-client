'use client'
import React, { useContext, useEffect, useState } from 'react'
import Image from "next/image";
import { server } from "../../config";
import { BrandContextProvider } from "@/context/BrandContext";
import Slider from "react-slick";
import { MdOutlineBrandingWatermark } from 'react-icons/md';
import { FaShapes } from 'react-icons/fa';
import Link from 'next/link';
import { IoLogoApple, IoLogoDribbble } from 'react-icons/io';
import { IoLogoAmazon, IoLogoRss, IoLogoXbox } from 'react-icons/io5';

const Brands = () => {
    const brandContext = useContext(BrandContextProvider)

    const [w, setWidth] = useState(0)

    useEffect(() => {
        setWidth(window.innerWidth)
    }, [])

    return (
        <div className="px-5">
            <div className='flex gap-2 mb-2 text-xl'>
                <strong className='my-auto'>{localStorage?.getItem('dir') == 'ar'? "نتعامل مع" :"Our Brands"}</strong>
                <span className='my-auto'>
                    <FaShapes />
                </span>
            </div>
            <Slider
                slidesToShow={w > 950 ? 3 : w > 600 ? 2 : 1}
                dots
                autoplay
                autoplaySpeed={3000}
                infinite
                className="flex w1400 from-white via-neutral-100 to-yellow-100 bg-gradient-to-tr"
                centerMode
            >
                {
                    brandContext?.brands?.map((category: any) => (
                        <Link href={{
                            pathname: '/products',
                            query: {
                                brand: category?.id
                            }
                        }} key={category?.id}>
                            <Image src={server + category?.image} className='hover:scale-105 transition-all' loading="lazy" alt={category?.title} width={100} height={100} />
                        </Link>
                    ))
                }
                {/* <span className='text-3xl'>
                    <IoLogoApple />
                </span>
                <span className='text-3xl'>
                    <IoLogoAmazon />
                </span>
                <span className='text-3xl'>
                    <IoLogoXbox />
                </span>
                <span className='text-3xl'>
                    <IoLogoRss />
                </span>
                <span className='text-3xl'>
                    <IoLogoDribbble />
                </span> */}
            </Slider>
        </div>
    )
}

export default Brands