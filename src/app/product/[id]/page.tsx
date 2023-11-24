'use client'
import Header from '@/components/Header'
import NumbersInput from '@/components/NumbersInput'
import { CartContextProvider } from '@/context/CartContext'
import { ProductContextProvider } from '@/context/ProductContext'
import React, { useContext, useState } from 'react'
import 'swiper/swiper-bundle.css'
import ImageViewer from '@/components/ImageViewer'
import Loading from '@/components/Loading'
import ProductCard from '@/components/ProductCard'
import Image from 'next/image'
import { server } from '../../../../config'



const page = () => {
    const productContext = useContext(ProductContextProvider)
    const cartContext = useContext(CartContextProvider)

    if (productContext?.loading) {
        return <Loading />
    }


    return (
        <div>
            <Header />
            <br />
            <br />
            <br />

            <div className='mt-5 px-3'>
                <div className='top md:flex md:flex-row gap-2 w1400 bg-white'>
                    <div className='sm:w-96 w-auto mx-auto'>
                        <ImageViewer images={productContext?.product?.images} />
                    </div>
                    <div className='flex flex-col justify-center w-full'>
                        <strong>{productContext?.product?.title}</strong>
                        <p>{productContext?.product?.description}</p>
                    </div>
                </div>

                <br />
                <br />

                <div className='w1400 bg-orange-50 flex flex-wrap justify-evenly'>
                    {
                        productContext?.product?.variants?.map((variant:any) => (
                            <div 
                            onClick={(e) => {
                                e.preventDefault()
                                cartContext?.setSelectedVariant(variant?.id)
                            }}
                            key={variant?.id} 
                            className={`flex flex-col text-center hover:border hover:border-orange-300 hover:rounded-xl rounded-md transition-all cursor-pointer border p-5 
                            ${cartContext?.selectedVariant == variant?.id ? "border-orange-300 bg-orange-100 border" : ""}
                            `}>
                                <strong>{variant?.title}</strong>
                                <span style={{backgroundColor:variant?.color_details?.color}} 
                                className='color p-2 w-fit h-fit my-auto rounded-full border mx-auto border-black'></span>
                                <p className='mx-auto text-green-600'>{variant?.sell_price} EGP</p>
                            </div>
                        ))
                    }
                </div>

                <br />
                <br />
                <div className='w-[100%] max-w-[700px] p-2 rounded-md shadow-xl mx-auto bg-orange-50'>
                    <div className='flex flex-wrap flex-row justify-between gap-3'>
                        <div className='productInfo flex flex-col justify-center'>
                            {
                                productContext?.product?.category_details?.title ? (
                                    <div className='flex gap-2'>
                                        <strong className='my-auto'>Category: </strong>
                                        <label className='my-auto'>{productContext?.product?.category_details?.title}</label>
                                    </div>
                                ) : null
                            }
                            {
                                productContext?.product?.brand_details?.title ? (
                                    <div className='flex gap-2'>
                                        <strong className='my-auto'>Brand: </strong>
                                        <label className='my-auto'>{productContext?.product?.brand_details?.title}</label>
                                        <Image width={30} height={30} src={server + productContext?.product?.brand_details?.image} alt={productContext?.product?.brand_details?.title} />
                                    </div>
                                ) : null
                            }
                        </div>
                        <form className='flex flex-col gap-2 justify-center' onSubmit={(e) => {
                            e.preventDefault()
                            cartContext?.addToCart(e, productContext?.product?.id)
                        }}>
                            <NumbersInput />
                            <button className='btn-dark'>Add</button>
                        </form>
                    </div>
                </div>

                <br />
                <br />

                <div className='related'>
                    <div className='flex flex-wrap justify-around'>
                        {
                            productContext?.product?.related?.map((prod: any) => (
                                <ProductCard p={prod} item={''} new_p={''} popular={''} key={prod?.id} />
                            ))
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default page

