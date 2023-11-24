'use client'
import Header from '@/components/Header'
import { OrderContextProvider } from '@/context/OrderContext'
import { StateContextProvider } from '@/context/StateContext'
import React, { useContext } from 'react'

const page = () => {
    const stateContext = useContext(StateContextProvider)
    const orderContext = useContext(OrderContextProvider)
  return (
    <div>
        <Header />
        <br />
        <br />
        <br />
        <div className='px-4 flex flex-col gap-5'>
            <h3 className='font-mono text-2xl'>Time to checkout !</h3>

            <form onSubmit={orderContext?.createOrder} className='flex flex-col gap-3 bg-white w-[100%] md:max-w-[1300px] mx-auto p-2 rounded-sm shadow-md'>
                <div className='flex flex-col'>
                    <label>Enter your name</label>
                    <input name='name' />
                    {
                        orderContext?.error?.name ? <small className='error-message'>{orderContext?.error?.name}</small> : null
                    }
                </div>
                <div className='flex flex-col'>
                    <label>Enter your phone</label>
                    <input name='phone' />
                    {
                        orderContext?.error?.phone ? <small className='error-message'>{orderContext?.error?.phone}</small> : null
                    }
                </div>
                <div className='flex flex-col'>
                    <label>Enter your address</label>
                    <input name='address' />
                    {
                        orderContext?.error?.address ? <small className='error-message'>{orderContext?.error?.address}</small> : null
                    }
                </div>
                <div className='flex flex-col'>
                    <label>Choose your state</label>
                    <select name='state'>
                        <option value={''}>select</option>
                        {
                            stateContext?.states?.map((state:any) => (
                                <option value={state?.id} key={state?.id}>{state?.name} shipping: {state?.shipping_price} EGP</option>
                            ))
                        }
                    </select>
                    {
                        orderContext?.error?.state ? <small className='error-message'>{orderContext?.error?.state}</small> : null
                    }
                </div>
                <button className='bg-green-200 hover:bg-green-800 hover:text-white'>Done</button>
            </form>

        </div>
    </div>
  )
}

export default page