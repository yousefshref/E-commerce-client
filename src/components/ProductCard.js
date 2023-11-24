'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { server } from '../../config'
import { usePathname } from 'next/navigation'
import { MdFiberNew } from "react-icons/md";


const ProductCard = ({ p, item, popular, new_p }) => {
    const path = usePathname()
    return (
        <div className="h-auto my-auto hover:scale-[101%] transition-all w-52 shadow-xl from-neutral-200 to-neutral-100 bg-gradient-to-b">
            {/* <ImagesSlider images={p?.images} /> */}
            <div className='relative'>
                {
                    path !== '/order' && popular ? (
                        <div className='absolute'>
                            <Image alt='' width={85} height={85} src={'/popular.png'} />
                        </div>
                    )
                        : null
                }
                {
                    new_p ? (
                        <div className='absolute left-1 top-1'>
                            <span className='text-3xl text-red-300'>
                                <MdFiberNew />
                            </span>
                        </div>
                    )
                        : null
                }
                <Link href={`/product/${p?.id}`}>
                    <Image loading='lazy' alt={p?.images[0]?.alt} width={200} height={200} className='w-auto h-auto' src={server + p?.images[0]?.image} />
                </Link>
            </div>
            <div className='flex flex-col p-2'>
                <strong>{p?.title}</strong>
                <strong className='text-green-600'>{p?.sell_price} EGP {p?.before_discount ? <s className='text-sm text-neutral-700'>{p?.before_discount} EGP</s> : null}</strong>
                {
                    item?.quantity ?
                        <strong>quantity: {item?.quantity}</strong>
                        : null
                }
            </div>
        </div>
    )
}

export default ProductCard