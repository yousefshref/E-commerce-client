'use client'
import { BrandContextProvider } from '@/context/BrandContext'
import { CategoryContextProvider } from '@/context/CategoryContext'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

const SliderFilter = () => {

    const categoryContext = useContext(CategoryContextProvider)
    const brandContext = useContext(BrandContextProvider)


    const route = useRouter()
    const params = useSearchParams()

    const create_category = (name: any, value: any) => {
        const p = new URLSearchParams(params)

        p.set(name, value)

        return p.toString()
    }


    const create_brand = (name: any, value: any) => {
        const p = new URLSearchParams(params)

        p.set(name, value)

        return p.toString()
    }

    return (
        <div className='bg-white lg:w-[300px] flex lg:flex lg:flex-col justify-around flex-wrap gap-4 rounded-md shadow-lg p-1 h-fit w-full'>
            <div className='category'>
                <strong>Filter by category</strong>
                <div className='lg:flex flex-col gap-1 hidden'>
                    <small
                        onClick={(e) => {
                            e.preventDefault()
                            route.push('/products' + '?' + create_category('category', ''))
                        }}
                        className={params.get('category') == '' ? "text-orange-800 cursor-pointer" : "cursor-pointer transition-all hover:text-orange-600"}
                    >None</small>
                    {
                        categoryContext?.categories?.map((category: any) => (
                            <small
                                onClick={(e) => {
                                    e.preventDefault()
                                    route.push('/products' + '?' + create_category('category', category?.id))
                                }}
                                className={params.get('category') == category?.id ? "text-orange-800 cursor-pointer" : "cursor-pointer transition-all hover:text-orange-600"}
                                key={category?.id}>{category?.title}</small>
                        ))
                    }
                </div>
                <select
                    onChange={(e) => {
                        e.preventDefault()
                        route.push('/products' + '?' + create_category('category', e.target.value))
                    }}
                    className='flex lg:hidden'>
                    <option value={''}>{'Select'}</option>
                    {
                        categoryContext?.categories?.map((category: any) => (
                            <option value={category?.id} key={category?.id}>{category?.title}</option>
                        ))
                    }
                </select>
            </div>
            <hr className='my-4' />
            <div className='brand'>
                <strong>Filter by Brand</strong>
                <div className='lg:flex hidden flex-col gap-1'>
                    <small
                        onClick={(e) => {
                            e.preventDefault()
                            route.push('/products' + '?' + create_category('brand', ''))
                        }}
                        className={params.get('brand') == '' ? "text-orange-800 cursor-pointer" : "cursor-pointer transition-all hover:text-orange-600"}
                    >None</small>
                    {
                        brandContext?.brands?.map((brand: any) => (
                            <small
                                onClick={(e) => {
                                    e.preventDefault()
                                    route.push('/products' + '?' + create_brand('brand', brand?.id))
                                }}
                                className={params.get('brand') == brand?.id ? "text-orange-800 cursor-pointer" : "cursor-pointer transition-all hover:text-orange-600"}
                                key={brand?.id}>{brand?.title}</small>
                        ))
                    }
                </div>
                <select
                    onChange={(e) => {
                        e.preventDefault()
                        route.push('/products' + '?' + create_brand('brand', e.target.value))
                    }}
                    className='lg:hidden flex'
                >
                    <option value={''}>Select</option>
                    {
                        brandContext?.brands?.map((brand: any) => (
                            <option value={brand?.id} key={brand?.id}>{brand?.title}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}

export default SliderFilter