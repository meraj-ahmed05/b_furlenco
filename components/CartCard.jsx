"use client"

import React, { useEffect, useState } from 'react'
import {BiUpArrow, BiDownArrow} from 'react-icons/bi'
import {IoIosCloseCircleOutline} from 'react-icons/io'
import { useCart } from '../context/CartState'
import Link from 'next/link'

const CartCard = ({item, description}) => {

  const [qty, setQty] = useState(1);
  const [visible, setVisible] = useState("invisible");

  const {cart, addToCart, removeFromCart} = useCart()
  const [remove, setRemove] = useState('')


  const handleQty = (amt)=>{
    if (qty+amt >= 1 && qty+amt <= 50){
      setQty(qty+amt)
    }
  }

  const handleCart = ()=>{
    setRemove('translate-x-[12rem]')
    setTimeout(()=>{
      removeFromCart(item?._id)
      setRemove('')
    }, 100)
  }

  useEffect( ()=>{
    setQty(item?.qty);
  }, [cart])


  useEffect( ()=>{
    const deBounce = ()=>{
      const timeOut = setTimeout(()=>{
        if(qty!==item.qty && qty>=1){
          addToCart(item, qty);
        }
      }, 1000);
      return ()=>clearTimeout(timeOut);
    }
    deBounce()

  }, [qty] )


  return (
    <div
    onMouseEnter={()=>setVisible("visible")}
    onMouseLeave={()=>setVisible("invisible")}
    className={`${remove} transition-all relative item flex justify-between items-center w-full gap-4 rounded-xl bg-[#ffffff] p-2`}>
      <div 
      className="h-[70px] w-[70px] overflow-hidden rounded-full border outline-none">
        <img 
        className="object-cover object-center h-full w-full rounded-full" 
        src={item?.image}
        />
      </div>

      <Link 
      href={`/products/${item.slug}`} 
      className="text-sm font-semibold">
        <p className='text-lg'>{item?.title} </p>
        <p className="text-[#FD8D14] text-sm">₹{item?.price}</p>
      </Link>
      
      {
        description &&
        <div className='w-2/5'>
        {`${description.substring(0,35)}...`}
      </div>
      }

      <div className="flex flex-col border items-center rounded-md w-8 overflow-hidden">

        <button onClick={()=>{handleQty(1)}} className="w-8 h-6 flex justify-center items-center hover:bg-slate-200">
            <BiUpArrow/>
        </button>

        <button className="bg-slate-300 w-8 h-8 flex justify-center items-center">
          <span>{qty}</span>
          </button>

        <button onClick={()=>{handleQty(-1)}} className="w-8 h-6 flex justify-center items-center hover:bg-slate-200"> 
          <BiDownArrow/> 
        </button>

      </div>

      <button 
      className={`${visible} absolute top-1`}
      onClick={handleCart}>
        <IoIosCloseCircleOutline />
      </button>

    </div>

  )
}

export default CartCard