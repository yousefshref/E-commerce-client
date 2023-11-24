'use client'
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { server } from '../../config'


const BrandContext = ({children}) => {

    const [brands, setBrands] = useState([])

    const getBrands = async() => {
        await axios.get(`${server}get_brands/`)
        .then((e) => setBrands(e.data))
    }

    useEffect(() => {
        getBrands()
    }, [])

  return (
    <BrandContextProvider.Provider value={{
        brands
    }}>
        {children}
    </BrandContextProvider.Provider>
  )
}

export default BrandContext
export const BrandContextProvider = createContext()