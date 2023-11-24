'use client'
import { useContext, useEffect, useState } from "react"
import LoginReqComponent from "./components/LoginReqComponent"
import { AuthContextProvider } from "./context/AuthContext"

const App = ({children}) => {
    const authContext = useContext(AuthContextProvider)

    const [dir, setDir] = useState()

    useEffect(() => {
      setDir(localStorage?.getItem('dir') ? localStorage?.getItem('dir') : 'en')
    }, [])
  return (
    <div style={{direction:dir == 'ar' ? "rtl" : "ltr"}}>
        {/* LOADING */}
        {/* LoginReq */}
        {
            authContext?.loginReq ? (
                <LoginReqComponent />
            )
            : null
        }
        
        {children}
    </div>
  )
}

export default App