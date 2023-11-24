'use client'
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { server } from '../../config'
import { usePathname, useRouter } from 'next/navigation';


const StateContext = ({children}) => {

    const [states, setStates] = useState([])

    const getStates = async() => {
        await axios.get(`${server}get_states/`)
        .then((e) => setStates(e.data))
    }

    useEffect(() => {
        getStates()
    }, [])

  return (
    <StateContextProvider.Provider value={{
        states
    }}>
        {children}
    </StateContextProvider.Provider>
  )
}

export default StateContext
export const StateContextProvider = createContext()