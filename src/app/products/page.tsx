'use client'
import Header from '@/components/Header'
import Loading from '@/components/Loading'
import ProductCard from '@/components/ProductCard'
import SliderFilter from '@/components/SliderFilter'
import { AuthContextProvider } from '@/context/AuthContext'
import { ProductContextProvider } from '@/context/ProductContext'
import React, { useContext } from 'react'

const page = () => {
    const productContext = useContext(ProductContextProvider)
    const authContext = useContext(AuthContextProvider)


    if (productContext?.loading) {
        return <Loading />
    }

    return (
        <div>
            <Header />
            <br />
            <br />
            <br />
            <br />
            <div className='lg:flex lg:flex-row flex flex-col px-5 gap-4 lg:justify-around'>
                <SliderFilter />
                {
                    productContext?.products?.length == 0 ? (
                        <div>
                            <strong className='text-red-700 text-2xl'>There's no items with this Search Info.</strong>
                            <p className='font-mono'>Try to use another search Keywords.</p>
                        </div>
                    )
                        :
                        <div className='w-[100%]'>
                            <div className='products wfull gap-5 flex flex-col justify-between'>
                                <div>
                                    <h3 id='hide_pop' className='black-orange-text mb-1 text-lg'>Most popular</h3>
                                    <div className='most_popular gap-5 flex flex-wrap justify-start'>
                                        {
                                            authContext?.authSettings[0]?.popular?.map((pop:any) => (
                                                productContext?.products?.map((product: any) => (
                                                    pop?.id == product?.id ?
                                                    <div key={product?.id}>
                                                        <ProductCard new_p={''} popular={true} item={''} p={product} />
                                                    </div>
                                                    : null
                                                ))
                                            ))
                                        }
                                        {/* {
                                        } */}
                                    </div>
                                </div>
                                <br />
                                {
                                    productContext?.products?.length == 1 ?
                                        null
                                        : <div>
                                            <h3 className='black-orange-text mb-1 text-lg'>Our best</h3>
                                            <div className='rest gap-5 flex flex-wrap justify-evenly'>
                                                {
                                                    productContext?.products?.slice(1)?.map((product: any) => (
                                                        <div key={product?.id}>
                                                            <ProductCard popular={false} item={''} new_p={''} p={product} />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                }
                            </div >
                        </div>
                }

            </div>
        </div >
    )
}

export default page