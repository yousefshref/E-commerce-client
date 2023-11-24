import Image from 'next/image'
import React from 'react'
import { MdOutlineCategory } from "react-icons/md";
import { server } from '../../../config';
import Link from 'next/link';

const TopCategories = ({authSettings}:any) => {
    return (
        <div className="w-[100%] md:max-w-[1400px] mx-auto">
            <div className="text-xl px-5 mb-5 flex gap-2">
                <h3 className="black-orange-text my-auto">{localStorage?.getItem('dir') == 'ar' ? "الأصناف الشائعة" :"Top Categories"}</h3>
                <span className="my-auto text-xl text-orange-800">
                    <MdOutlineCategory />
                </span>
            </div>
            <div className="w-[100%] md:max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-5 lg:justify-around justify-center">
                <div className="left flex flex-col gap-5">
                    <div className="p-1 shadow-lg rounded-md w-[450px] h-[300px] mx-auto lg:mx-0 bg-white relative overflow-hidden">
                        <div className="absolute z-50 left-[50%] translate-x-[-50%] top-[50%] text-center translate-y-[-50%]">
                            <h3 className="text-4xl black-orange-text font-medium">{authSettings?.authSettings[0]?.category_1?.title}</h3>
                            {/* <p>New Brands and cool quality.</p> */}
                            <Link href={{
                                pathname:'/products',
                                query:{
                                    category:authSettings?.authSettings[0]?.category_1?.id
                                }
                            }}>
                                <button className="mx-auto flex btn-dark-orange">Go Check</button>
                            </Link>
                        </div>
                        <Image loading="lazy" alt="" width={200} height={200} className="opacity-90 w-[4500px] h-[300px] absolute bottom-0 left-0" src={server + authSettings?.authSettings[0]?.category_image_1} />
                    </div>
                    <div className="p-1 shadow-lg rounded-md w-[450px] h-[300px] mx-auto lg:mx-0 bg-white relative overflow-hidden">
                        <div className="absolute z-50 left-[50%] translate-x-[-50%] top-[50%] text-center translate-y-[-50%]">
                            <h3 className="text-4xl black-orange-text font-medium">{authSettings?.authSettings[0]?.category_2?.title}</h3>
                            {/* <p>New Brands and cool quality.</p> */}
                            <Link href={{
                                pathname:'/products',
                                query:{
                                    category:authSettings?.authSettings[0]?.category_2?.id
                                }
                            }}>
                                <button className="mx-auto flex btn-dark-orange">Go Check</button>
                            </Link>
                        </div>
                        <Image loading="lazy" alt="" width={200} height={200} className="opacity-90 w-[4500px] h-[300px] absolute bottom-0 left-0" src={server + authSettings?.authSettings[0]?.category_image_2} />
                    </div>
                </div>
                <div className="right border-b-yellow-200 flex flex-col my-auto mx-auto lg:mx-0">
                    <div className="p-1 shadow-lg rounded-md w-[450px] h-[300px] mx-auto lg:mx-0 bg-white relative overflow-hidden">
                        <div className="absolute z-50 left-[50%] translate-x-[-50%] top-[50%] text-center translate-y-[-50%]">
                            <h3 className="text-4xl black-orange-text font-medium">{authSettings?.authSettings[0]?.category_3?.title}</h3>
                            {/* <p>New Brands and cool quality.</p> */}
                            <Link href={{
                                pathname:'/products',
                                query:{
                                    category:authSettings?.authSettings[0]?.category_3?.id
                                }
                            }}>
                                <button className="mx-auto flex btn-dark-orange">Go Check</button>
                            </Link>
                        </div>
                        <Image loading="lazy" alt="" width={200} height={200} className="opacity-75 w-[4500px] h-[300px] absolute top-0 left-0" src={server + authSettings?.authSettings[0]?.category_image_3} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopCategories