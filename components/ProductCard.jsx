"use client"
import React, { useEffect, useState } from 'react'
import {BiCart, BiHeart} from 'react-icons/bi'
import { useCart } from '../context/CartState'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { BsFillHeartFill, BsHeart } from 'react-icons/bs'
import { toastOptions } from '@/utils/utils'

const ProductCard = ({item}) => {

    const {wishlist, addToCart, addToWishList, removeFromWishList} = useCart();
    const [inWishlist, setInWishlist] = useState(false)

    const handleCart = ()=>{
        toast.success(`${item.title} to Cart`, toastOptions);
        addToCart(item)
    }

    const handleWishlist = ()=>{
        if( !(wishlist?.includes(item)) ){
            toast.success(`${item.title} to Wishlist`, toastOptions);
            addToWishList(item)
            setInWishlist(true)
        } else{
            toast.success("Already in Wishlist");
            setInWishlist(true)
        }
    }

    useEffect(()=>{
        if( wishlist?.includes(item) ){
            setInWishlist(true)
        }
    }, [])

  return (
    <div className='custom-shadow mb-8 border rounded-t-lg overflow-hidden flex flex-col justify-between 
                    max-w-full max-h-[380px]
                    w-[300px] min-h-[350px]
                    sm:w-[300px] sm:min-h-[350px]'>
            <Link href={`/products/${item?.slug}`} >
            <div className='overflow-hidden w-full h-[280px] rounded-t-lg cursor-pointer'>
            <img 
                className=' w-full h-full object-cover object-center hover:scale-[1.04] transition ease-in-out'
                src={item?.image}
                alt="product" />
            </div>
            </Link>

        <div className=' flex items-center justify-between py-2'>
            <div>
                <p className='text-lg sm:text-base text-slate-800 font-semibold tracking-normal'>{item?.title}</p>
                <p className='text-sm sm:text-base text-slate-500 font-semibold'>₹{item?.price}</p>
            </div>

            <div className='flex gap-2 sm:text-lg md:text-xl font-bold'>
                <button 
                className='border-2 p-2 rounded-full hover:bg-slate-300'
                onClick={handleCart}>
                    <BiCart className='font-semibold text-xl md:text-2xl'/>
                </button>

                <button 
                onClick={handleWishlist}
                className='border-2 p-2 rounded-full hover:bg-slate-300 '>
                    {
                        inWishlist
                        ?
                        <BsFillHeartFill className=' font-semibold text-xl md:text-2xl ' />
                        :
                        <BsHeart className=' font-semibold text-xl md:text-2xl '/>
                    }
                </button>

            </div>
        </div>
    </div>
  )
}

export default ProductCard