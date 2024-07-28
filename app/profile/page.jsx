"use client"
import EditProfile from '@/components/EditProfile'
import { useAuth } from '@/context/AuthState'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsFillHeartFill, BsBoxFill } from 'react-icons/bs'
import { MdArrowForwardIos, MdEdit, MdEmail, MdLocationPin, MdSmartphone } from 'react-icons/md'

const Page = () => {
  const [edit, setEdit] = useState('editModeOff')
  const [user, setUser] = useState(
    {
      avatar : 'https://img.freepik.com/premium-photo/man-with-beard-wearing-gray-sweater_873925-16110.jpg?w=900',
      _id: '',
      name: "",
      email : "",
      state: '',
      city : '',
      address : '',
      pincode : '',
      phone: ''
    });

  const {auth} = useAuth();

  useEffect(()=>{

    const getDelivery = async ()=>{
      
      // console.log(auth.user._id)
      const result = await fetch(`/api/delivery/getDelivery?uId=${auth.user._id}`)
  
      const res = await result.json();

      if(res.success){
        const us = {...user, ...(auth.user), ...(res.shipping)}
        // console.log(us);
        setUser(us)
      }
  
    }

    auth?.user._id && getDelivery();

  }, [auth])




  return (
    <div className="sm:h-[90vh] p-2 flex justify-center relative items-center w-screen bg-[#E7E7E7]">

      <div className="flex flex-col sm:flex-row justify-between gap-2 
                    w-[90%] h-[80%]
                    sm:w-[90%]
                    md:max-w-[80%] md:w-[800px] ">

        <div className="basis-[35%] md:basis-[32%] bg-slate-50 rounded-lg flex flex-col py-6 items-center">
          <div className="text-center space-y-4 mb-4">
            <div className="mx-auto w-[175px] h-[175px] rounded-lg overflow-hidden">
              <img
                className="h-full w-full object-center object-cover"
                // src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=740&t=st=1694527348~exp=1694527948~hmac=86c5ae0d7ad78a6104a440db4d6971233e98e58a01b92304441f1e506a64bda6" alt=""
                // src="https://img.freepik.com/premium-photo/photo-businesswoman_889227-37077.jpg?w=740"
                src={user?.avatar}
                alt='avatar'
              />
            </div>

            <h2 className="text-2xl font-semibold">{user?.name || "UserName"}</h2>

          </div>
          <div className="text-sm space-y-3 ">
            <p className='flex items-center gap-2'><MdLocationPin size={"1.4em"} className='text-yellow-400'/>{user?.state || "Your State"}, {user.city || "Your City"}</p>
            <p className='flex items-center gap-2'><MdEmail size={"1.4em"} className='text-red-200'/>{user?.email || "Your Email"}</p>
            <p className='flex items-center gap-2'><MdSmartphone size={"1.4em"} className='text-slate-900'/>+91 {user?.phone || "Your Phone"}</p>
          </div>

        </div>


        <div className="basis-[65%] md:basis-[68%] flex flex-col gap-2">

          <div className="basis-1/2 bg-slate-50 rounded-lg p-6 text-sm flex flex-col gap-2 sm:gap-0 justify-between">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Shipping Address</h3>
              <button
                className='transition-all rotate-0 text-blue-500 hover:rotate-[360deg]'
                onClick={() => (setEdit("editModeOn"))}><MdEdit size={"1.4em"} />
                </button>
            </div>
            <div className="flex justify-between">
              <p>Address</p>
              <h3 className="font-semibold">{user?.address || "Your Address"}</h3>
            </div>

            <div className="flex justify-between">
              <p>City</p>
              <h3 className="font-semibold">{user?.city || "Your City"}</h3>
            </div>

            <div className="flex justify-between">
              <p>Country</p>
              <h3 className="font-semibold">{user?.state || "Your State"}</h3>
            </div>

            <div className="flex justify-between">
              <p>Zipcode</p>
              <h3 className="font-semibold">{user?.pincode || "Your Pincode"}</h3>
            </div>

          </div>

          <div className="basis-1/2 flex flex-col gap-2">

            <Link
              href={'/orders'}
              className="group/orders cursor-pointer bg-slate-50 basis-1/2 p-4 rounded-lg">
              <div className='flex justify-between items-center'>
                <h3 className='flex items-center gap-2'>Orders<span>< BsBoxFill className='text-indigo-500'/></span></h3>
                <span className='group-hover/orders:translate-x-2 transition-all'><MdArrowForwardIos /></span>
              </div>
              <p className='group-hover/orders:underline'>Track your orders here</p>
            </Link>

            <Link
              href={'/wishlist'}
              className="group/wishlist cursor-pointer bg-slate-50 basis-1/2 p-4 rounded-lg">
              <div className='flex justify-between items-center'>
                <h3 className='flex items-center gap-2'>Wishlist<span>< BsFillHeartFill className='text-rose-600'/></span></h3>
                <span className='group-hover/wishlist:translate-x-2 transition-all'><MdArrowForwardIos /></span>
              </div>
              <p className='group-hover/wishlist:underline'>Your Wishlist are here</p>
            </Link>

          </div>

        </div>

      </div>

      {edit == "editModeOn" && <EditProfile userDet={user} setUserDet={setUser} setVisible={setEdit} />}



    </div>
  )
}

export default Page