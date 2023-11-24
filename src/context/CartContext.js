'use client'
import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { server } from '../../config'
import { ProductContextProvider } from './ProductContext';
import { AuthContextProvider } from './AuthContext';
import { usePathname } from 'next/navigation';


const CartContext = ({children}) => {

    const path = usePathname()

    const productContext = useContext(ProductContextProvider)
    const authContext = useContext(AuthContextProvider)
    
    var totalCost = []

    const [cart, setCart] = useState()

    useEffect(() => {
        setCart(localStorage?.getItem('user_id') ? [] : JSON.parse(localStorage?.getItem('cart'))||[])
    }, [])
    

    const [laoding, setLoading] = useState(true)
    
    const getCart = async() => {
        await axios.get(`${server}get_cart/?user_id=${localStorage?.getItem('user_id')||''}`)
        .then((e) => {
            setLoading(false)
            setCart(e.data)
        })
        .catch((f) =>{
            setLoading(false)
            console.log(f);
        })
    }

    useEffect(() => {
        localStorage?.getItem('user_id') ? getCart() : setLoading(false)
    }, [path])


    const deleteCartItem = async(e, id) => {
        if(localStorage?.getItem('user_id')){
            e.preventDefault()
            await axios.delete(`${server}delete_cart_item/${id}`)
            .then((e) => {
                if(e.data.success){
                    console.log(e.data);
                    getCart()
                    location.reload()
                }else{
                    console.log(e.data);
                }
            })
            .catch((s) => console.log(s))
        }else{
            let storeArray = JSON.parse(localStorage.getItem('cart')) || []
    
            const objToDelete = storeArray.findIndex(obj => obj.product === id)

            if(objToDelete !== -1){
                storeArray.splice(objToDelete, 1)
            }

            localStorage.setItem('cart', JSON.stringify(storeArray))
            location.reload()
        }
    }


    const deleteCartItems = async(e) => {
        if(localStorage?.getItem('user_id')){
            await axios.delete(`${server}delete_cart_items/?id=${localStorage?.getItem('user_id')}`)
            .then((e) => {
                if(e.data.success){
                    getCart()
                }else{
                    console.log(e.data);
                }
            })
        }else{
            localStorage.removeItem('cart')
        }
        localStorage?.getItem('user_id') ? getCart() : null
    }

    const [selectedVariant, setSelectedVariant] = useState(0)
    useEffect(() => {
        setSelectedVariant(productContext?.product?.variants?.length > 0 ? productContext?.product?.variants[0]?.id : 0)
    }, [productContext?.product?.variants?.length])
    const addToCart = async(e, product) => {
        if(localStorage?.getItem('user_id')){
            await axios.post(`${server}create_or_update_cart/?user_id=${localStorage?.getItem('user_id')}`,{
                product:product,
                variant:selectedVariant,
                quantity:e.target.quantity.value,
            })
            .then((e) => {
                if(e.data.success){
                    alert('Successfully updated your cart')
                    getCart()
                }else{
                    alert('something went wrong, please try again later')
                    e.target.quantity.value = 1
                }
            })
            .catch(() => {
                alert('Enter quantity')
            })
        }else{
            if(e.target.quantity.value == '' || e.target.quantity.value == 0){
                alert('write a quantity')
            }else{
                // no
                if(authContext?.authSettings[0]?.login_requierd == 'no'){
                    const newObj = {
                        product:product,
                        variant:selectedVariant,
                        quantity:e.target.quantity.value,
                        total_price:productContext?.products?.find((e) => e?.id == product)?.variants?.find((e) => e?.id == selectedVariant).sell_price * e.target.quantity.value,
                    } 
        
                    let storeArray = JSON.parse(localStorage.getItem('cart')) || []
        
                    const existObj = storeArray.findIndex(obj => obj.product === newObj.product && obj.variant === newObj.variant)
        
                    if(existObj !== -1){
                        storeArray[existObj] = newObj
                    }else{
                        storeArray.push(newObj)
                    }
        
                    localStorage.setItem('cart', JSON.stringify(storeArray))
                    alert('Successfully updated your cart')
                    e.target.quantity.value = 1

                    location.reload()
                }

                // in making order
                if(authContext?.authSettings[0]?.login_requierd == 'in making order'){
                    authContext?.setLoginReq(true)
                }
            }
            
        }
        localStorage?.getItem('user_id') ? getCart() : null
    }


  return (
    <CartContextProvider.Provider value={{
        addToCart,
        deleteCartItem,
        deleteCartItems,
        cart,
        laoding,

        totalCost,
        setSelectedVariant,
        selectedVariant,
        getCart
    }}>
        {children}
    </CartContextProvider.Provider>
  )
}

export default CartContext
export const CartContextProvider = createContext()