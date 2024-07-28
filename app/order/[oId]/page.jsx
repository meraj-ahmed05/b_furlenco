"use client"
import React from 'react'
import OrderCard from '../../../components/OrderCard'
import { useCart } from '../../../context/CartState'
import { FaFileInvoice } from 'react-icons/fa'
import { MdOutlineTrackChanges, MdSyncProblem } from 'react-icons/md'
import { BiLogoVisa } from 'react-icons/bi'
import { BsBoxSeamFill, BsFillArrowUpRightCircleFill, BsTruck } from 'react-icons/bs'
import { useParams } from 'next/navigation'

const Page = () => {

  const {cart} = useCart();

  const {oId} = useParams()

  return (

<div className="flex items-center justify-center sm:p-6 p-2">

<div className="w-[90%] space-y-4 rounded-lg border sm:p-4">

  <div>

    <div 
    className="flex flex-col sm:flex-row sm:items-center justify-between">
      <h1 
      className="text-xl sm:text-2xl md:text-3xl font-semibold">Order ID: <span>{oId}</span></h1>
      <div className="flex gap-2">
        <button 
        className="rounded-md border bg-slate-50 px-2 py-1 text-sm text-slate-700 hover:bg-slate-500 hover:text-slate-50 space-x-2 flex gap-2 items-center transition-all"> <span><FaFileInvoice/></span> Invoice</button>
        <button className="rounded-md bg-blue-600 px-2 py-1 text-sm text-slate-200 hover:bg-blue-700 hover:text-slate-50 space-x-2 flex gap-2 items-center transition-all"> <span><MdOutlineTrackChanges/></span> Track Order</button>
      </div>
    </div>

    <div>
      <p className="text-sm text-slate-400">Order date: <span>Feb 16, 2022</span></p>
    </div>

  </div>

  <hr />

  <div className='flex flex-col sm:flex-row gap-4'>

  <div 
  className="sm:basis-[70%] md:basis-[60%] flex flex-col gap-4 overflow-y-scroll custom-scrollbar max-h-[250px] px-2">

    {
      cart?.map( (item)=>(<OrderCard key={item._id} item={item} />) )
    }

  </div>

  <div 
  className="sm:basis-[30%] md:basis-[38%] flex flex-col gap-3">
    <div>
      <h2>Payment</h2>
      <p className="text-sm text-slate-600 flex gap-2 items-center">Visa **45 <BiLogoVisa size={"2em"} className='text-blue-500 rounded-lg'/> </p>
    </div>

    <div className="space-y-1">
      <h2>Delivery</h2>
      <div>
        <h3 className="text-sm text-slate-400">Address</h3>
        <p className="text-slate-600">Lorem ipsum dolor sit. Lorem, ipsum dolor.</p>
      </div>
      <div>
        <h3 className="text-sm text-slate-400">Delivery Method</h3>
        <p className="text-slate-600">Free(30days)</p>
      </div>
    </div>
  </div>

  </div>


  {/* <div 
  className="grid grid-cols-2">
    <div>
      <h2>Payment</h2>
      <p className="text-sm text-slate-600 flex gap-2 items-center">Visa **45 <BiLogoVisa size={"2em"} className='text-blue-500 rounded-lg'/> </p>
    </div>

    <div className="space-y-2">
      <h2>Delivery</h2>
      <div>
        <h3 className="text-sm text-slate-400">Address</h3>
        <p className="text-slate-600">Lorem ipsum dolor sit. Lorem, ipsum dolor.</p>
      </div>
      <div>
        <h3 className="text-sm text-slate-400">Delivery Method</h3>
        <p className="text-slate-600">Free(30days)</p>
      </div>
    </div>
  </div> */}

  <hr />

  <div 
  className="grid grid-cols-1 gap-y-2 sm:grid-cols-2">
    <div className='space-y-2'>
      <h2>Need help?</h2>
      <p className="text-slate-600 flex gap-2 items-center"> <MdSyncProblem/> Issues <BsFillArrowUpRightCircleFill/></p>
      <p className="text-slate-600 flex gap-2 items-center"> <BsTruck/> Delivery Info <BsFillArrowUpRightCircleFill/></p>
      <p className="text-slate-600 flex gap-2 items-center"><BsBoxSeamFill/> Returns <BsFillArrowUpRightCircleFill/></p>
    </div>

    <div className="space-y-2">
      <h2>Order Summary</h2>
      <div className="flex items-center justify-between">
        <p>Subtotal</p>
        <p>₹2312.00</p>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-400">
        <p>Discount</p>
        <p>(20%) - ₹1109.40</p>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-400">
        <p>Delivery</p>
        <p>₹0.00</p>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-400">
        <p>Tax</p>
        <p>+2312.00</p>
      </div>

      <hr className="border border-dashed" />

      <div className="flex items-center justify-between">
        <p className="text-lg">Total</p>
        <p>+2312.00</p>
      </div>
    </div>
  </div>

</div>

</div>
  )
}

export default Page