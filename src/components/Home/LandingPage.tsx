'use client'
import { AuthContextProvider } from '@/context/AuthContext'
import Image from 'next/image'
import { useContext } from 'react'
import Slider from 'react-slick'
import { server } from '../../../config'
import Link from 'next/link'


const LandingPage = () => {
    const authSettings = useContext(AuthContextProvider)

    return (
        <Slider
            autoplay
            autoplaySpeed={3000}
            infinite
            speed={1500}
            className="flex"
        >
            {
                authSettings?.authSettings[0]?.landing?.map((land: any) => (
                    <div className={`landing md:pt-0 pt-10 
        bg-no-repeat bg-cover h-[77vh]
        bg-white w-[100vw] bg-fixed relative overflow-hidden
      `} key={land?.id}>
                        <div className='absolute md:flex md:flex-row flex flex-col h-full w-full'>
                            <div className='my-auto flex flex-col md:mb-auto mb-0 md:text-start text-center ms-0 md:ms-3'>
                                <p className='text-xl'>{land?.title_up}</p>
                                <h1 className='lg:text-6xl md:text-5xl mb-3 sm:text-4xl font-bold'>{land?.title}</h1>
                                <Link href={{
                                    pathname:"/products",
                                    query:{
                                        category:land?.category
                                    }
                                }} className='w-fit mx-auto md:mx-0'>
                                    <button className='px-5'>Check</button>
                                </Link>
                            </div>
                            <div className='w-full md:w-auto md:flex md:flex-col justify-center flex flex-row md:h-full h-auto ms-auto'>
                                <Image alt='' width={400} height={400} loading='lazy' src={server + land?.image} />
                            </div>
                        </div>
                    </div>
                ))
            }
        </Slider>
    )
}

export default LandingPage
