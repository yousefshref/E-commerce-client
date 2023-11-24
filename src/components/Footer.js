import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className="footer p-1 rounded-t-xl px-3 bg-[url(/footer-bg.png)] text-white bg-cover bg-no-repeat h-auto w-full">
            <h3 className="white-orange-text-100 text-2xl">Cookiy Store</h3>
            <div className="flex flex-col justify-center h-full">
                <div className="flex justify-around">
                    <div className="flex flex-col gap-1 justify-center">
                        <Link className="text-sm transition-all hover:text-blue-400" href={''}>Home</Link>
                        <Link className="text-sm transition-all hover:text-blue-400" href={''}>Products</Link>
                        <Link className="text-sm transition-all hover:text-blue-400" href={''}>Cart</Link>
                        <Link className="text-sm transition-all hover:text-blue-400" href={''}>Orders</Link>
                    </div>
                    <div className="flex flex-col gap-1 justify-center">
                        <Link className="text-sm transition-all hover:text-blue-400" href={''}>Privacy and Policy</Link>
                        <Link className="text-sm transition-all hover:text-blue-400" href={''}>Send Feedback</Link>
                        <Link className="text-sm transition-all hover:text-blue-400" href={''}>Contact us</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer