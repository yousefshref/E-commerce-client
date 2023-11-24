'use client'
import { useSwiper } from 'swiper/react';
import React from 'react'

const PrevButton = () => {
    const swiper = useSwiper();
    return (
        <strong onClick={() => swiper.slidePrev()} className='
        absolute top-0 bottom-0 left-0 z-50
        text-black px-0.5 font-bold transition-all hover:px-1 cursor-pointer rounded-md h-[100%] flex flex-col justify-center'>{'<'}</strong>
      )
}

export default PrevButton