"use client"
import Cards from '@/components/Cards'
import { useCart } from '@/context/CartState'
import Link from 'next/link'
import React from 'react'

const Page = () => {

    const {wishlist} = useCart()

  return (
    <div>
        {
            wishlist.length ?
            <Cards title={"My Wishlist"} items={wishlist} />
            :
            <div className='min-h-[40vh] flex flex-col justify-center items-center gap-2'>
                <img 
                width={100}
                height={100}
                src="https://cdn-icons-png.flaticon.com/512/9603/9603702.png" 
                alt="heart" />
                <h1 className='text-center'>No items found</h1>
                <Link 
                href={'/search'}
                className='text-center px-8 py-2 border bg-slate-300 w-48 hover:bg-slate-200 rounded-sm'>
                Back to Shop</Link>
            </div>
        }
    </div>
  )
}

export default Page