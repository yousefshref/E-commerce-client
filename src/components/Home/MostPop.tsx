'use client'
import React, { useEffect, useState } from 'react'
import { FaFireAlt } from "react-icons/fa";
import ProductCard from '../ProductCard';
import Slider from 'react-slick';

const MostPop = ({ authSettings }: any) => {
    const [w, setWidth] = useState(0)

    useEffect(() => {
      setWidth(window.innerWidth)
    }, [])
    return (
        <div id="most_pop" className="most_pop px-5">
            <div className="flex gap-1 text-xl w-[100%] md:max-w-[1400px] mx-auto mb-3">
                <h3 className="black-orange-text my-auto">{localStorage?.getItem('dir') == 'ar' ? "الأكثر مبيعا" :"Most Popular"}</h3>
                <span className="my-auto text-xl text-orange-800">
                    <FaFireAlt />
                </span>
            </div>
            <Slider slidesToShow={w > 950 ? 3 : w > 600 ? 2 : 1}
                dots
                autoplay
                autoplaySpeed={2000}
                infinite
                centerMode 
                className="popular flex justify-evenly gap-5 flex-wrap w1400 bg-white">
                {
                    authSettings?.authSettings[0]?.popular?.map((product: any) => (
                        <ProductCard key={product?.id} new_p={false} p={product} popular={true} item={''} />
                    ))
                }
                {/* {
                    productContext?.products?.map((product: any) => (
                        <div key={product?.id}>
                            <ProductCard new_p={false} p={product} popular={true} item={''} />
                        </div>
                    ))
                } */}
            </Slider>
        </div>
    )
}

export default MostPop