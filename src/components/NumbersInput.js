import React, { useState } from 'react'
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";

const NumbersInput = (props) => {
    const [count, setCount] = useState(props?.default ? props?.default : 1)
    return (
        <div className='bg-white text-xl p-2 shadow-lg w-[100px] flex justify-between'>
            <span onClick={() => {
                count > 1 ?
                    setCount(count - 1)
                    : null
            }} className='cursor-pointer my-auto text-sm'>
                <LuMinus />
            </span>
            <strong id='numbersInputCount'>{count}</strong>
            <input value={count} name='quantity' className='hidden' readOnly />
            <span onClick={() => {
                setCount(Number(count) + Number(1))
            }} className='cursor-pointer my-auto text-lg'>
                <GoPlus />
            </span>
        </div>
    )
}

export default NumbersInput