'use client'
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { server } from '../../config'
import { useRouter } from 'next/navigation';


const AuthContext = ({children}) => {

    const route = useRouter()

    const [error, setError] = useState([])
    
    
    const [loginReq, setLoginReq] = useState(false)


    // register
    const register = async(e) => {
        e.preventDefault()
        await axios.post(`${server}register/`,{
            username:e.target.username.value,
            email:e.target.email.value,
            password:e.target.password.value,
        })
        .then((e) => {
            if(e.data.id){
                localStorage.setItem('user_id', e.data.id)
                route.push('/')
            }else{
                setError(e.data)
            }
        })
    }


    // login
    const login = async(e) => {
        e.preventDefault()
        await axios.post(`${server}login/`,{
            username:e.target.username.value,
            password:e.target.password.value,
        })
        .then((e) => {
            if(e.data.success){
                localStorage.setItem('user_id', e.data.success)
                route.push('/')
            }else{
                setError(e.data)
            }
        })
    }



    // get user
    const [user, setUser] = useState([])

    const getUser = async() => {
        await axios.get(`${server}get_user/?id=${localStorage?.getItem('user_id')}`)
        .then((e) => setUser(e.data))
        .catch((e) => {
            localStorage.removeItem('user_id')
            location.reload()
        })
    }

    useEffect(() => {
        localStorage?.getItem('user_id') ? getUser() : null
    }, [])



    // get auth settings
    const [authSettings, setAuthSettings] = useState([])
    const getAuthSettings = async() => {
        await axios.get(`${server}get_auth_settings/`)
        .then((e) => setAuthSettings(e.data))
    }
    useEffect(() => {
        getAuthSettings()
    }, [])


    // check authentication
    useEffect(() => {
        // path == '/login' && localStorage.getItem('user_id') ? route.push('/') : null
        // path == '/register' && localStorage.getItem('user_id') ? route.push('/') : null

        if(authSettings[0]?.login_requierd == 'yes'){
            if(!localStorage?.getItem('user_id')){
                route.push('/login')
            }
        }
    }, [authSettings?.length])

  return (
    <AuthContextProvider.Provider value={{
        error,
        register,
        login,

        user,
        authSettings,

        loginReq,
        setLoginReq,
    }}>
        {children}
    </AuthContextProvider.Provider>
  )
}

export default AuthContext
export const AuthContextProvider = createContext()