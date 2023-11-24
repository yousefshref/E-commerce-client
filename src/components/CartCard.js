import React, { useContext } from 'react'
import { ProductContextProvider } from '@/context/ProductContext'
import { CartContextProvider } from '@/context/CartContext'
import { server } from '../../config'
import Image from 'next/image'
import { MdDelete } from 'react-icons/md'
import Link from 'next/link'

const CartCard = ({ c }) => {
    const productContext = useContext(ProductContextProvider)
    const cartContext = useContext(CartContextProvider)

    return (
        <div className='w1400-no-shadow flex flex-col gap-2'>
            <div className='variatn flex gap-2 p-2 rounded-md from-orange-300 via-orange-200 to-orange-100 bg-gradient-to-bl w-fit shadow-lg'>
                <strong>{productContext?.variants?.find((e) => e?.id == c?.variant)?.title}</strong>
                <span style={{ backgroundColor: productContext?.variants?.find((e) => e?.id == c?.variant)?.color_details?.color }}
                    className='color p-2 w-fit h-fit my-auto rounded-full border border-black'></span>
            </div>
            <div className='cart relative w1400 bg-white flex flex-wrap justify-between'>
                <div className='absolute right-1 '>
                    <button onClick={(e) => cartContext?.deleteCartItem(e, c?.id || c?.product)} className='text-red-600 bg-inherit hover:bg-inherit cursor-pointer p-1'>
                        <MdDelete />
                    </button>
                </div>
                <Link href={`/product/${c?.product?.id || c?.product}`} className='flex gap-2'>
                    <Image alt='' width={100} height={100} src={productContext?.products?.find((e) => e?.id == c?.product)?.images ? server + productContext?.products?.find((e) => e?.id == c?.product)?.images[0]?.image : c?.product?.images ? server + c?.product?.images[0].image : ''} />
                    <div className='flex my-auto flex-col'>
                        <strong>{c?.product?.title || productContext?.products?.find((e) => e?.id == c?.product)?.title}</strong>
                        <strong className='text-green-600'>{c?.product?.sell_price || productContext?.variants?.find((e) => e?.id == c?.variant)?.sell_price * c?.quantity} EGP</strong>
                    </div>
                </Link>
                <div className='flex mt-auto justify-center flex-row gap-3 flex-wrap'>
                    <strong className='flex px-4 py-2 shadow-lg rounded-3xl bg-orange-200'>{c?.quantity}</strong>
                </div>
                {/* <form onSubmit={(e) => {
                    e.preventDefault()
                    cartContext?.addToCart(e, c?.product?.id || c?.product)
                }} className='flex mt-auto justify-center flex-row gap-3 flex-wrap'>
                    <NumbersInput default={c?.quantity} />
                    <button>Change</button>
                </form> */}
            </div>
        </div>
    )
}

export default CartCard