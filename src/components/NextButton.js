'use client'
import { useSwiper } from 'swiper/react';
import React from 'react'

const NextButton = () => {
    const swiper = useSwiper();
    return (
        <p onClick={() => swiper.slideNext()} className='
        absolute top-0 bottom-0 right-0 z-50
        text-black px-0.5 font-bold transition-all hover:px-1 cursor-pointer rounded-md h-[100%] flex flex-col justify-center'>{'>'}</p>
      )
}

export default NextButton