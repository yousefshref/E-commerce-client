'use client'
import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { server } from '../../config'
import { useRouter } from 'next/navigation';
import { CartContextProvider } from './CartContext';


const OrderContext = ({ children }) => {

    const route = useRouter()



    const [error, setError] = useState([])

    const cartContext = useContext(CartContextProvider)


    const [loading, setLoading] = useState(true)


    const [orders, setOrders] = useState([])

    const getOrders = async () => {
        await axios.get(`${server}get_orders/${localStorage?.getItem('user_id')}`)
            .then((e) => {
                setOrders(e.data)
                setLoading(false)
            }).catch((x) => {
                console.log(x)
                setLoading(false)
            })
    }



    useEffect(() => {
        localStorage?.getItem('user_id') ? getOrders() : setLoading(false)
    }, [])


    const createOrder = async (e) => {
        localStorage?.getItem('user_id') ? cartContext?.getCart() : null
        e.preventDefault();
        const orderData = {
            name: e.target.name.value,
            phone: e.target.phone.value,
            address: e.target.address.value,
            state: e.target.state.value,
            order_items: cartContext?.cart?.map(c => ({
                product: c?.product?.id || c?.product,
                quantity: c?.quantity
            })),
            user: localStorage?.getItem('user_id') || null
        };

        try {
            const response = await axios.post(`${server}create_order/`, orderData);
            if (response.data.id) {
                alert('Succesfully created order, wait for us')
                cartContext?.deleteCartItems()
                route.push('/orders')
                getOrders()
            } else {
                setError(response.data)
            }
        } catch (error) {
            alert("You're choosing quantity more than the product has")
            route.push('/cart')
        }
    };



    return (
        <OrderContextProvider.Provider value={{
            error,
            createOrder,
            orders,
            loading,
        }}>
            {children}
        </OrderContextProvider.Provider>
    )
}

export default OrderContext
export const OrderContextProvider = createContext()