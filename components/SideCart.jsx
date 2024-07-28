"use client"
import React, { useEffect } from 'react'
import CartCard from './CartCard'
import {MdPayment} from 'react-icons/md'
import { BsFillCartXFill } from 'react-icons/bs'
import { useCart } from '../context/CartState'
import Link from 'next/link'

const SideCart = () => {


  const {cart, 
        saveCart, 
        setCart, 
        clearCart, 
        subTotal,
        countTotal} = useCart();

  
  useEffect(()=>{
    const data = localStorage.getItem("cart")
    
    if(data){
      setCart(JSON.parse(data))
    }

  }, [])

  useEffect(()=>{
    saveCart(cart);
    setCart(cart);
    countTotal();
  }, [cart])


  return (

  <div 
  id="cart"
  className={`z-10 w-[340px] max-h-[75vh] flex flex-col justify-between transition-all bg-white sm:top-[13%] rounded-lg`}>

  <h1 className="h-[10%] p-4 text-center">My Cart</h1>
  
  <div id="items" 
  className="rounded-t-xl no-scrollbar bg-[#daddd8] max-h-[70%] p-4 flex flex-col gap-4 overflow-y-scroll">

    {
      cart.length
      ?
      cart?.map((item)=>(<CartCard key={item._id} item={item} />))
      :
      <div className='flex items-center gap-2'>
        <img 
        width={48}
        height={48}
        className=''
        src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" 
        alt="" />
        <p>Your cart is empty</p>
      </div>
    }
  
  </div>

  <div className='flex h-[10%] p-4 justify-center items-center font-semibold bg-[#daddc7]'>
    <p>SubTotal : ₹{subTotal}</p>
  </div>

    <div className='h-[10%] flex'>
  <Link 
  href='/checkout'
  className='p-4 basis-[70%] flex justify-center items-center gap-2 bg-[#FD8D14] hover:bg-[#ffaa29] font-semibold text-white '>
     <MdPayment/>
     <span>Checkout</span>
  </Link>
  <button 
  onClick={()=>(clearCart())}
  className='p-4 basis-[30%] flex justify-center items-center gap-2 font-semibold bg-slate-300 hover:bg-slate-200 '>
     <BsFillCartXFill/>
  </button>
    </div>

</div>

    
    )
}

export default SideCart