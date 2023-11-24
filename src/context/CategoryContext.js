'use client'
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { server } from '../../config'


const CategoryContext = ({children}) => {

    const [categories, setCategories] = useState([])

    const getCategories = async() => {
        await axios.get(`${server}get_categories/`)
        .then((e) => {
            setCategories(e.data)
        })
    }
    useEffect(() => {
        getCategories()
    }, [])

  return (
    <CategoryContextProvider.Provider value={{
        categories,
    }}>
        {children}
    </CategoryContextProvider.Provider>
  )
}

export default CategoryContext
export const CategoryContextProvider = createContext()