"use client"
import { useAuth } from '@/context/AuthState'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaBox, FaBoxes, FaUsers } from 'react-icons/fa'
import { MdArrowRight, MdSpaceDashboard } from 'react-icons/md'

const AdminSideBar = ({active}) => {

    const {auth} = useAuth();

    const [sideBar, setSideBar] = useState({side: 'left', property: "-translate-x-[150%]"})

    const handleSideBar = (shift)=>{
        if(shift=="left" || sideBar.side == "right"){
            setSideBar({side:"left", property:"-translate-x-[150%]"})
        } else{
            setSideBar({side:"right", property:"translate-x-0"})
        }
    }


  return (
    <>
        <div className={`${sideBar.property} z-[2] md:translate-x-0 absolute transition-all h-screen w-[75%] sm:w-[50%] md:relative md:w-[25%] bg-[#E7E7E7] p-2 md:p-6 md:pr-2 space-y-4`}>

            <div className='flex flex-col items-center gap-3'>

            <div className='w-[120px] h-[120px] overflow-hidden rounded-full bg-gradient-to-tr from-slate-200 via-sky-600 to-rose-500'>
                <img 
                className='object-cover object-center h-full w-full'
                // src="https://img.freepik.com/free-photo/view-3d-confident-businessman_23-2150709932.jpg" 
                src='https://img.freepik.com/free-photo/medium-shot-boy-relaxing-beach_23-2150753086.jpg'
                alt="" />
                
            </div>

            <div className='text-center'>
            <h2 className='text-lg font-semibold'>{auth.user.name}</h2>
            <p className='text-sm text-slate-400 font-semibold'>Admin</p>
            </div>
            </div>


            <div className='space-y-4'>
                <Link onClick={()=>handleSideBar("left")} href={'/admin/dashboard'}
                className={` ${active == "dashboard" && "bg-gradient-to-r from-sky-600 to-cyan-400 text-slate-50"} hover:bg-cyan-500 hover:text-slate-50 rounded-xl flex items-center gap-4 px-4 py-3 transition-all`}>
                    <MdSpaceDashboard size={"1.3em"}/>
                    <span>Dashboard</span>
                </Link>

                <Link onClick={()=>handleSideBar("left")} href={'/admin/users'}
                className={` ${active == "users" && "bg-gradient-to-r from-sky-600 to-cyan-400 text-slate-50"} hover:bg-cyan-500 hover:text-slate-50 rounded-xl flex items-center gap-4 px-4 py-3 transition-all`}>
                    <FaUsers className='' size={"1.3em"}/>
                    <span>Users</span>
                </Link>

                <Link onClick={()=>handleSideBar("left")} href={'/admin/orders'}
                className={` ${active == "orders" && "bg-gradient-to-r from-sky-600 to-cyan-400 text-slate-50"} hover:bg-cyan-500 hover:text-slate-50 rounded-xl flex items-center gap-4 px-4 py-3 transition-all`}>
                    <FaBoxes className='' size={"1.3em"}/>
                    <span>Orders</span>
                </Link>

                <Link onClick={()=>handleSideBar("left")} href={'/admin/products'}
                className={` ${active == "products" && "bg-gradient-to-r from-sky-600 to-cyan-400 text-slate-50"} hover:bg-cyan-500 hover:text-slate-50 rounded-xl flex items-center gap-4 px-4 py-3 transition-all`}>
                    <FaBox className='' size={"1.3em"}/>
                    <span>Products</span>
                </Link>

            </div>


        </div>
        
        <button onClick={handleSideBar} className={`md:hidden z-[3] absolute py-4 flex items-center bg-[#fefefe] rounded-r-lg`}>
            <MdArrowRight className={`${sideBar.side == "right" ? "rotate-180" : "rotate-0"} transition-all `} size={"1.5em"}/>
        </button>
    </>
  )
}

export default AdminSideBar