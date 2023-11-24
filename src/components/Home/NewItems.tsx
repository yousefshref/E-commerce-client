'use client'
import React, { useEffect, useState } from 'react'
import ProductCard from '../ProductCard'
import Slider from 'react-slick'
import { MdFiberNew } from 'react-icons/md'

const NewItems = ({authSettings}:any) => {

    const [w, setWidth] = useState(0)

    useEffect(() => {
      setWidth(window.innerWidth)
    }, [])

    return (
        <div className="new px-5">
            <div className="text-3xl mb-3 font-medium flex gap-2">
                <h3 className="my-auto">{localStorage?.getItem('dir') == 'ar'? "الجديد" :"Latest Items"}</h3>
                <span className="my-auto">
                    <MdFiberNew />
                </span>
            </div>

            <div className="w1400 bg-white">
                <Slider
                    slidesToShow={w > 950 ? 3 : w > 600 ? 2 : 1}
                    dots
                    autoplay
                    autoplaySpeed={2000}
                    infinite
                    className="flex"
                    centerMode
                >
                    {
                        authSettings?.authSettings[0]?.new?.map((product: any) => (
                            <div key={product?.id}>
                                <ProductCard new_p={true} p={product} item={''} popular={''} />
                            </div>
                        ))
                    }
                </Slider>
            </div>
        </div>
    )
}

export default NewItems