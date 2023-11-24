import React from 'react'
import { LuLoader } from 'react-icons/lu'

const Loading = () => {
  return (
    <div className='bg-black h-full w-full z-10 bg-opacity-70 fixed'>
      <strong className='text-white translate-x-[-50%] left-[50%] absolute top-[50%] translate-y-[50%]
        text-3xl flex gap-1
        '>
        <span className='my-auto'>
          Loading
        </span>
        <span className='my-auto animate-spin'>
          <LuLoader />
        </span>
      </strong>
    </div>
  )
}

export default Loading