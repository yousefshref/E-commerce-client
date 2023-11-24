'use client'
import Header from '@/components/Header'
import Loading from '@/components/Loading'
import ProductCard from '@/components/ProductCard'
import { AuthContextProvider } from '@/context/AuthContext'
import { OrderContextProvider } from '@/context/OrderContext'
import Link from 'next/link'
import React, { useContext } from 'react'

const page = () => {
    const orderContext = useContext(OrderContextProvider)
    const authContext = useContext(AuthContextProvider)

    if(orderContext?.loading){
        return <Loading />
    }

    if(orderContext?.orders?.length == 0){
        return (
            <div>
                <Header />
                <div className='absoluteCenter flex flex-col gap-1'>
                    <strong className='text-2xl'>{
                        authContext?.user?.id ? "You have no Orders" : "If you made order without login, Wait us to call you"
                    }</strong>
                    {
                        authContext?.user?.id ?
                        <Link href={'/products'} className='text-blue-500'>Get some NOW</Link>
                        :
                        <Link href={'/login'} className='text-blue-500'>Login now to track your orders</Link>
                    }
                </div>
            </div>
        )
    }
  return (
    <div>
        <Header />
        <br />
        <br />
        <br />
        <br />
        <div className='flex flex-col gap-4 px-3'>
            <h3 className='text-2xl font-medium'>Orders</h3> 
            <hr />
            <div className='orders flex flex-col gap-5 w1400'>
                {
                    orderContext?.orders?.map((order:any) => (
                        <div className='order bg-white p-3 rounded-md shadow-md flex-wrap flex justify-between' key={order?.id}>
                            <div className='order_details flex flex-col justify-center'>
                                <strong>{order?.name}</strong>
                                <strong>{order?.address}</strong>
                                <strong>{order?.phone}</strong>
                                <strong>{order?.state_details?.name}</strong>
                                <strong>Shipping Price: <span className='text-green-700'>{order?.state_details?.shipping_price} EGP</span></strong>
                                <strong>Total Coast: <span className='text-green-700'>{order?.total_coast} EGP</span></strong>
                                <strong>{order?.status}</strong>
                            </div>
                            <div className='order_items gap-5 from-red-50 to-yellow-50 bg-gradient-to-tr flex w-[300px] overflow-scroll p-1 rounded-lg shadow-md'>
                                {
                                    order?.order_items?.map((item:any) => (
                                        <div className='item' key={item?.id}>
                                            <ProductCard new_p={''} popular={''} item={item} p={item?.product_details} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default page