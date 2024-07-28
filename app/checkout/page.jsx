"use client"
import React, { useState } from 'react'
import { FaPaypal, FaGooglePay, FaAmazonPay } from 'react-icons/fa'
import { BsFillPersonVcardFill } from 'react-icons/bs'
import { BiCreditCard, BiSolidPhone } from 'react-icons/bi'
import { IoMdMail } from 'react-icons/io'
import { useCart } from '@/context/CartState'
import CartCard from '@/components/CartCard'


const Page = () => {

  const [paymentMethod, setPaymentMethod] = useState("");

  const { cart } = useCart()

  const [checkOut, setCheckOut] = useState({
    fname: '',
    lname: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCheckOut({ ...checkOut, [name]: value })
  }


  return (
    <div className=' p-8 space-y-4 w-full'>

      <div id="checkout" className="flex sm:flex-row flex-col w-full items-center sm:justify-between gap-4">

        <div className="flex w-full sm:basis-[60%] flex-col justify-between gap-6">

          <div className="space-y-1">
            <h1 className="text-4xl text-slate-500">Checkout</h1>
            <p className="text-sm text-slate-400">a checkout is a counter where you pay for the things you are buying</p>
          </div>

          <div className="flex flex-col gap-4 w-full sm:w-[90%]">

            <div className="space-y-3">
              <h3 className="text-slate-500">1. Contact Information</h3>

              <div className="flex gap-4">

                <div className="w-full rounded-md flex bg-white p-2 items-center border-b">
                  <span className='text-2xl p-2 text-slate-400'><BsFillPersonVcardFill /></span>
                  <input
                    name='fname'
                    value={checkOut.fname}
                    onChange={handleChange}
                    className="w-full border-none p-2 font-semibold outline-none"
                    type="text"
                    placeholder="First Name" />
                </div>

                <div className="w-full rounded-md flex bg-white p-2 items-center border-b">
                  <input
                    name='lname'
                    value={checkOut.lname}
                    onChange={handleChange}
                    type="text"
                    placeholder="Last Name" />
                </div>

              </div>

              <div className="flex items-center gap-4">

                <div className="w-full rounded-md flex bg-white p-2 items-center border-b">
                  <span className='text-2xl p-2 text-slate-400'><BiSolidPhone /></span>
                  <input
                    name='phone'
                    value={checkOut.phone}
                    onChange={handleChange}
                    className="w-full border-none bg-transparent p-2 font-semibold outline-none"
                    type="number"
                    pattern='[0-9]'
                    minLength={10}
                    maxLength={10}
                    placeholder="Phone" />
                </div>

                <div className="w-full rounded-md flex p-2 bg-white items-center border-b">
                  <span className='text-2xl p-2  text-slate-400'><IoMdMail /></span>
                  <input
                    name='email'
                    value={checkOut.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email" />
                </div>

              </div>

              <div className='w-full bg-white rounded-md'>
                <textarea
                  name='address'
                  value={checkOut.address}
                  onChange={handleChange}
                  placeholder="Address"
                  id=""
                  rows="3"></textarea>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-full rounded-md bg-white p-2 flex items-center border-b">
                  <input
                    name='city'
                    value={checkOut.city}
                    onChange={handleChange}
                    type="text"
                    placeholder="City" />
                </div>
                <div className="w-full rounded-md bg-white p-2 flex items-center border-b">
                  <input
                    name='state'
                    value={checkOut.state}
                    onChange={handleChange}
                    type="text"
                    placeholder="State" />
                </div>
                <div className="w-full rounded-md bg-white p-2 flex items-center border-b">
                  <input
                    name='pin'
                    value={checkOut.pincode}
                    onChange={handleChange}
                    type="number"
                    minLength={6}
                    maxLength={6}
                    placeholder="PinCode" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-slate-500">2. Payment Method</h1>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => { setPaymentMethod("gActive") }}
                  className={`  rounded-lg px-8 py-2 transition-all hover:bg-[#4847fa] hover:text-slate-200 text-3xl font-bold ${paymentMethod == "gActive" && "paymentMethod-active"}`}><FaGooglePay /></button>

                <button
                  onClick={() => { setPaymentMethod("aActive") }}
                  className={`rounded-lg px-8 py-2 transition-all hover:bg-[#4847fa] hover:text-slate-200 text-3xl font-bold ${paymentMethod == "aActive" && "paymentMethod-active"}`}><FaAmazonPay /></button>

                <button
                  onClick={() => { setPaymentMethod("pActive") }}
                  className={`rounded-lg px-8 py-2 transition-all hover:bg-[#4847fa] hover:text-slate-200 text-3xl font-bold ${paymentMethod == "pActive" && "paymentMethod-active"}`}><FaPaypal /></button>
              </div>
            </div>
          </div>

        </div>

        <div className=" w-[90%] sm:w-full sm:basis-[40%] md:basis-[30%] rounded-lg bg-gradient-to-b from-[#273141] to-[#273d41] p-8 text-white space-y-4">

          <div>
            <h2 className='text-slate-300 text-2xl font-semibold'>PaymentMethod Info</h2>
            <hr />
          </div>

          <div className='space-y-4'>
            <p className='text-sm font-semibold'>PaymentMethod Method</p>
            <div className='flex flex-col sm:flex-row gap-4 justify-between'>
              <button className='border py-2 px-2 text-slate-200 w-full hover:bg-black hover:border-none transition-all rounded-2xl flex items-center gap-2 justify-center'>
                <span className='text-lg sm:text-xl'><BiCreditCard /></span>
                <span>Credit Card</span>
              </button>
              <button className='border py-2 px-2 text-slate-200 w-full hover:bg-black hover:border-none transition-all rounded-2xl flex items-center gap-2 justify-center'>
                <span className='text-lg sm:text-xl'><FaPaypal /></span>
                <span>Paypal</span>
              </button>
            </div>
            <hr />
          </div>

          <div>
            <p>Name on Card</p>
            <div className='w-full border-b'>
              <input className='text-sm' type="text" placeholder='Your Name' />
            </div>
          </div>

          <div>
            <p>Card Number</p>
            <div className='w-full border-b'>
              <input className='text-sm' type="text" placeholder='**** **** **** ****' />
            </div>
          </div>

          <div className='flex space-x-4'>
            <div>
              <p>Expiration Data</p>
              <div className='flex space-x-4'>
                <div className='w-full border-b'>
                  <input className='text-sm' type="text" placeholder='MM' />
                </div>
                <div className='w-full border-b'>
                  <input className='text-sm' type="text" placeholder='YYYY' />
                </div>
              </div>
            </div>
            <div>
              <p>CVV</p>
              <div className='w-full border-b'>
                <input className='text-sm' type="text" placeholder='XXXX' />
              </div>
            </div>
          </div>

        </div>

      </div>

      <div className='flex flex-col gap-4 p-2 w-full custom-scrollbar max-h-[300px] overflow-y-scroll overflow-x-hidden'>
        {

          cart?.map((item) => (<CartCard key={item._id} item={item} description={item.description} />))
        }

      </div>

        <hr />
    </div>



  )
}

export default Page