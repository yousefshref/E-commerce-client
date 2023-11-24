'use client'
import Header from '@/components/Header'
import CartCard from '@/components/CartCard'
import { CartContextProvider } from '@/context/CartContext'
import React, { useContext } from 'react'
import 'swiper/swiper-bundle.css'
import { AuthContextProvider } from '@/context/AuthContext'
import LoginReqComponent from '@/components/LoginReqComponent'
import Link from 'next/link'
import Loading from '@/components/Loading'

const page = () => {

    const cartContext = useContext(CartContextProvider)
    const authContext = useContext(AuthContextProvider)

    const totalCoast = cartContext?.cart?.reduce((acc: any, curr: any) => acc + curr['total_price'], 0)



    if (cartContext?.laoding) {
        return <Loading />
    }

    if (cartContext?.cart?.length == 0) {
        return (
            <div>
                <Header />
                <strong className='absolute top-[50%] translate-y-[50%] left-[50%] translate-x-[-50%] text-3xl'>You have no items in your cart for now <br /> <span className='text-red-600 text-lg'>go and add some !</span></strong>
            </div>
        )
    }



    return (
        <div>
            {
                authContext?.authSettings[0]?.login_requierd == 'in making order' && !localStorage?.getItem('user_id') ? <LoginReqComponent /> : null
            }
            <Header />
            <br />
            <br />
            <br />
            <div className='cart px-5 flex flex-col gap-5'>
                <h1 className='black-orange-text pb-1'>Ready To CheckOut</h1>
                <div className='carts flex flex-col gap-10'>
                    {
                        cartContext?.cart?.map((cart: any) => (
                            <div key={cart?.id || cart?.variant}>
                                <CartCard c={cart} />
                            </div>
                        ))
                    }
                </div>
                <br />
                <div className='orderIt flex flex-wrap justify-evenly w-[100%] bg-white mx-auto md:max-w-[1300px] p-2 rounded-md shadow-md'>
                    <strong className='my-auto'>Total: {cartContext?.cart ? cartContext?.cart[0]?.cart?.total_order ? cartContext?.cart[0]?.cart?.total_order : totalCoast : totalCoast} EGP</strong>
                    <Link href={'/order'}>
                        <button className='my-auto bg-green-300 hover:bg-green-600 hover:text-white'>Order</button>
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default page


