'use client'
import { AuthContextProvider } from '@/context/AuthContext'
import Link from 'next/link'
import React, { useContext } from 'react'

const page = () => {
  const authContext = useContext(AuthContextProvider)
  return (
    <div className='px-4 flex flex-col gap-2 absoluteCenter w-full'>
      <h1 className='text-center'>Register</h1>
      <hr />
      <form onSubmit={authContext?.register} className='flex flex-col gap-5
      bg-white w-[100%] md:w-[500px] mx-auto p-3 rounded-lg shadow-md
      '>

        <div className='flex flex-col gap-1'>
          <label>Username</label>
          <input type='text' name='username' />
          {
            authContext?.error?.username && <small className='error-message'>{authContext?.error?.username}</small>
          }
        </div>

        <div className='flex flex-col gap-1'>
          <label>Email</label>
          <input type='email' name='email' />
          {
            authContext?.error?.email && <small className='error-message'>{authContext?.error?.email}</small>
          }
        </div>

        <div className='flex flex-col gap-1'>
          <label>Password</label>
          <input type='password' name='password' />
          {
            authContext?.error?.password && <small className='error-message'>{authContext?.error?.password}</small>
          }
        </div>

        <p>Already have an account ? <Link className='text-blue-400' href={'/login'}>Login now</Link></p>

        <button className='bg-orange-400'>Register</button>

      </form>
    </div>
  )
}

export default page