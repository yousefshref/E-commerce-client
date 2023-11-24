'use client'
import { AuthContextProvider } from '@/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

const LoginReqComponent = () => {
    const authContext = useContext(AuthContextProvider)
    const router = useRouter()
    return (
        <div className='flex flex-col gap-3 px-2 absolute w-full h-full z-30 bg-blue-300 bg-opacity-30'>
            <div className='bg-white p-3 rounded-md shadow-2xl w-[97%] mx-auto md:max-w-[500px] left-[50%] translate-x-[-50%] translate-y-[-50%] top-[50%] absolute'>
                <strong className='text-3xl my-1 text-center flex flex-col'>Wanna buy it ?</strong>
                <hr />
                <div className='flex flex-col gap-2'>
                    <strong>Create new account</strong>
                    <p>OR</p>
                    <strong>Log into your account</strong>
                </div>
                <Link href={'/login'}>
                    <button className='w-full mt-3 bg-orange-400'>Go now</button>
                </Link>
                <button onClick={() => router.back()} className='w-full mt-3 bg-red-400 hover:bg-red-700 hover:text-white'>Back</button>
                {/* <button onClick={() => authContext?.setLoginReq(false)} className='w-full mt-3 bg-red-400 hover:bg-red-700 hover:text-white'>Close</button> */}
            </div>
        </div>
    )
}

export default LoginReqComponent