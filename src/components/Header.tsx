'use client'
import { AuthContextProvider } from '@/context/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

import { HiOutlineSearch } from "react-icons/hi";
import { LuShoppingCart } from "react-icons/lu";
import { IoCloseOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { IoMdLogIn } from "react-icons/io";
import { LuUserPlus2 } from "react-icons/lu";
import { CartContextProvider } from '@/context/CartContext'
import { ProductContextProvider } from '@/context/ProductContext'

const Header = () => {
    const authContext = useContext(AuthContextProvider)
    const cartContext = useContext(CartContextProvider)
    const productContext = useContext(ProductContextProvider)

    const route = useRouter()
    const path = usePathname()
    const params = useSearchParams()

    const [menu, setMenu] = useState(false)
    const [focus, setFocus] = useState(true)

    const create = (name: any, value: any) => {
        const p = new URLSearchParams(params)

        p.set(name, value)

        return p.toString()
    }

    const [y, setY] = useState(0)

    useEffect(() => {
        onscroll = () => {
            if (window.scrollY > 40) {
                setY(window.scrollY)
            }
        }
    }, [])


    return (
        <div id='header' className={`header px-3 py-2
        flex justify-between gap-4 z-[100] fixed w-full transition-all ${path !== '/' ? "bg-neutral-100" : ""} ${y > 140 ? "bg-neutral-100" : ""}`}>
            <Link href={'/'} className='my-auto w-[40px]'>
                <Image className='my-auto' alt='cookiy' width={30} height={30} src={'/brand-logo.png'} />
            </Link>
            <form onSubmit={(e: any) => {
                e.preventDefault()
                route.push('/products' + '?' + create('search', e.target.search.value))
            }} className='search w-full flex my-auto'>
                <input onFocus={() => setFocus(true)} name='search' type='search' className='w-full focus:rounded-s-md' placeholder='Search on "WhatEver"' />
                <button className='bg-orange-300 hover:bg-orange-300 flex w-fit p-1 px-2 rounded-sm flex-col justify-center transition-all
                hover:px-3 cursor-pointer
                '>
                    <HiOutlineSearch />
                </button>
            </form>
            <div className='my-auto flex w-20 justify-between'>
                <Link href={'/cart'} className='text-xl cursor-pointer relative my-auto text-white'>
                    <span className='text-black'><LuShoppingCart /></span>
                    {
                        cartContext?.cart?.length !== 0 ? <p className='p-1 animate-pulse rounded-full bg-orange-700 top-[-8px] left-[-8px] absolute'></p> : null
                    }
                </Link>
                <Image onClick={() => setMenu(!menu)} className='rounded-full cursor-pointer my-auto' alt='cookiy' width={30} height={30} src={'/avatar.jpg'} />
                {
                    menu ? (
                        <div className='menu text-white top-0 p-1 rounded-s-md right-0 from-neutral-700 to-neutral-950 bg-gradient-to-b
                        w-[300px] flex flex-col text-center absolute h-[100vh]
                        '>
                            <span onClick={() => setMenu(!menu)} className='text-xl w-fit transition-all hover:text-red-600 cursor-pointer'>
                                <IoCloseOutline />
                            </span>
                            <div>
                                <Link className='text-xl transition-all hover:text-blue-300' href={'/'}>Home</Link>
                            </div>
                            <br />
                            <div>
                                <Link className='text-xl transition-all hover:text-blue-300' href={'/orders'}>Orders</Link>
                            </div>

                            {
                                authContext?.user?.id ? (
                                    <div onClick={() => {
                                        localStorage?.removeItem('user_id')
                                        location.reload()
                                    }} className='mt-auto mb-5 justify-center flex gap-5 hover:bg-white p-2 hover:rounded-md transition-all cursor-pointer hover:text-black'>
                                        <span className='text-xl my-auto'>
                                            <CiLogout />
                                        </span>
                                        <strong className='my-auto text-xl'>Logout</strong>
                                    </div>
                                )
                                    : (
                                        <div className='mt-auto'>
                                            <Link href={'/login'} className='mb-5 justify-center flex gap-5 hover:bg-white p-2 hover:rounded-md transition-all cursor-pointer hover:text-black'>
                                                <span className='text-xl my-auto'>
                                                    <IoMdLogIn />
                                                </span>
                                                <strong className='my-auto text-xl'>Login</strong>
                                            </Link>
                                            <Link href={'/register'} className='mb-5 justify-center flex gap-5 hover:bg-white p-2 hover:rounded-md transition-all cursor-pointer hover:text-black'>
                                                <span className='text-xl my-auto'>
                                                    <LuUserPlus2 />
                                                </span>
                                                <strong className='my-auto text-xl'>Register</strong>
                                            </Link>
                                        </div>
                                    )
                            }
                        </div>
                    )
                        : null
                }
            </div>
        </div>
    )
}

export default Header