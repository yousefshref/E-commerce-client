'use client'
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { server } from '../../config'
import { usePathname, useSearchParams } from 'next/navigation';


const ProductContext = ({children}) => {

    const path = usePathname()
    const params = useSearchParams()

    const [products, setProducts] = useState([])
    
    const [loading, setLoading] = useState(true)
    
    const getProducts = async() => {
        await axios.get(`${server}get_products/?category=${params.get('category') || ''}&search=${params.get('search') || ''}&brand=${params.get('brand') || ''}`)
        .then((e) => {
            setLoading(false)
            setProducts(e.data)
        })
    }
    
    useEffect(() => {
        getProducts()
    }, [params, path])
    
    
    const [variants, setVariants] = useState([])

    const getVariants = async() => {
        await axios.get(`${server}get_variants/`)
        .then((e) => {
            setVariants(e.data)
        })
    }

    useEffect(() => {
        getVariants()
    }, [params, path])


    const [product, setProduct] = useState([])

    const getProduct = async() => {
        await axios.get(`${server}get_product/${path.split('/').pop()}`)
        .then((e) => {
            setProduct(e.data)
            setLoading(false)
        })
    }

    useEffect(() => {
        path.includes('product') && Number.isInteger(Number(path.split('/').pop())) ? getProduct() : null
    }, [path.length, path])


  return (
    <ProductContextProvider.Provider value={{
        products,
        product,
        variants,
        loading,
    }}>
        {children}
    </ProductContextProvider.Provider>
  )
}

export default ProductContext
export const ProductContextProvider = createContext()