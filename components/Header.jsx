"use client"

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { BiSolidCartAlt, BiSolidHeart } from 'react-icons/bi'
import SideCart from './SideCart'
import { MdAccountCircle, MdManageAccounts, MdLogout, MdMenu, MdClose } from 'react-icons/md'
import { FaBoxes, FaSun, FaMoon } from 'react-icons/fa'
import { useAuth } from '@/context/AuthState'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { toastOptions } from '@/utils/utils'

const Header = () => {

  const pathname = usePathname();

  const ref = useRef();
  const router = useRouter();

  const [dropdown, setDropDown] = useState('h-0');
  const [menu, setMenu] = useState({mode: "hidden", position: "-translate-x-[150%] left-4 top-4"})


  const toggleCart = () => {

    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    } else {
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full')
    }
  }

  const { auth, setAuth, clearAuth, checkAdmin } = useAuth();

  const handleLogOut = () => {
    setDropDown('h-0')
    clearAuth()
    router.push('/');
    toast.success("Logged Out", toastOptions)
  }



  useEffect(() => {
    let data = localStorage.getItem('auth');
    
    if (data) {
      setAuth(JSON.parse(data));
      data = JSON.parse(data)
      
      if( pathname.startsWith("/admin") ){
        const check = async ()=>{
          const res = await checkAdmin(data?.token);
          // console.log(res)
          if(!res.access){
            router.push("/permission")
          }
        }
        check()
      } else if( pathname == '/login' || pathname == '/register' ){
        router.push('/')
      } else{
        router.refresh()
      }
    } else if( pathname.includes("admin") || pathname.includes("checkout") ){
      router.push('/')
    }

  }, [])


  const handleMenu = (mode)=>{
    if(mode == "hide" || menu.mode == "visible")
      setMenu({mode: "hidden", position:"-translate-x-[150%]"})
    else
      setMenu({mode: "visible", position:"translate-x-0"})
  }


  return (
    <>
    { !pathname.startsWith('/admin') &&
    <header id='hdr'
      className="text-gray-600 relative body-font items-center w-full border bg-[#E7E7E7] ">

     <div className='relative h-[137px] sm:h-[147px] md:h-[67px] bg-[#E7E7E7]' />

      <div id='navbar'
        className="top-0 left-0 z-10 bg-white/30 backdrop-blur-sm w-full fixed flex flex-wrap justify-between flex-col px-6 py-4 md:flex-row items-center" //flex-wrap flex-col
      >

        <div
          className="flex title-font items-center font-medium text-gray-900 mb-4 md:mb-0"
        >
          <Link href={'/'} >
            <h1 className='logo font-semibold tracking-widest text-lg'>BFurnitures</h1>
          </Link>
        </div>
        <div className={`transition-all ${menu?.mode == "visible" && " z-[1] w-full h-screen bg-white/80 backdrop-blur-sm"} w-[100px] h-5 sm:${()=>handleMenu} py-4 px-2 absolute sm:p-0 top-0 left-0 sm:w-auto sm:h-full sm:left-0 sm:top-0 sm:relative`}>
          <button 
          className='sm:hidden px-2 block'
          onClick={handleMenu} 
          >
            {
              menu.mode == "hidden"
              ?
              <MdMenu size={"1.6em"}/>
              :
              <MdClose size={"1.6em"}/>
            }
          </button>

          <nav
            className={`${menu.position} py-2 sm:py-0 gap-2 sm:gap-0 sm:translate-x-0 transition-all flex flex-col absolute flex-wrap items-start sm:items-center gap-x-4 text-base sm:top-0 sm:left-0 sm:flex md:ml-auto md:mr-auto sm:relative sm:flex-row`}>
            <Link onClick={()=>handleMenu("hide")} href={'/beds'} className={`px-2 py-1 sm:p-0 mr-5 text-sm font-semibold hover:text-gray-900 uppercase`}>Beds</Link>
            <Link onClick={()=>handleMenu("hide")} href={'/sofas'} className={`px-2 py-1 sm:p-0 mr-5 text-sm font-semibold hover:text-gray-900 uppercase`}>Sofas</Link>
            <Link onClick={()=>handleMenu("hide")} href={'/tables'} className={`px-2 py-1 sm:p-0 mr-5 text-sm font-semibold hover:text-gray-900 uppercase`}>Tables</Link>
            <Link onClick={()=>handleMenu("hide")} href={'/decors'} className={`px-2 py-1 sm:p-0 mr-5 text-sm font-semibold hover:text-gray-900 uppercase`}>Decoratives</Link>
            <Link onClick={()=>handleMenu("hide")} href={'/search'} className={`px-2 py-1 sm:p-0 mr-5 text-sm font-semibold hover:text-gray-900 uppercase`}>Categories</Link>
          </nav>
        </div>

        <div className='flex items-center gap-2'>

          <button className='mt-4 md:mt-0'>
              <FaSun className='text-[#ff5a19]'/>
              {/* <FaMoon className='text-[#191922]'/> */}
          </button>

          {
            auth?.token
            ?
            <div
              className="gap-1 items-center border-0 p-2 focus:outline-none hover:text-slate-400 rounded text-base mt-4 md:mt-0">

              <div className="relative">
                <button
                  onMouseEnter={() => (setDropDown(''))}
                  onMouseLeave={() => (setDropDown('h-0'))}
                  className="flex  py-1 px-2 rounded-md hover:bg-blue-600 bg-blue-500 text-slate-50 font-semibold">
                  <MdAccountCircle size={"1.4em"} />
                </button>

                <div
                  onMouseEnter={() => (setDropDown(''))}
                  onMouseLeave={() => (setDropDown('h-0'))}
                  className={`flex ${dropdown} transition-all translate-x-0 flex-col absolute right-0 bg-slate-200 min-w-[160px] rounded-md overflow-hidden `}>
                  <Link href={'/profile'} onClick={()=> (setDropDown('h-0'))} className="w-full text-left px-2 py-3 border-b hover:bg-slate-300 border-b-slate-300 text-slate-500 font-semibold text-sm"> <span className='flex gap-2 items-center'><MdManageAccounts /> My Account</span></Link>
                  <Link href={'/orders'} onClick={()=> (setDropDown('h-0'))} className="w-full text-left px-2 py-3 border-b hover:bg-slate-300 border-b-slate-300 text-slate-500 font-semibold text-sm"> <span className='flex gap-2 items-center'><FaBoxes /> My Orders</span></Link>
                  <Link href={'/wishlist'} onClick={()=> (setDropDown('h-0'))} className="w-full text-left px-2 py-3 border-b hover:bg-slate-300 border-b-slate-300 text-slate-500 font-semibold text-sm"> <span className='flex gap-2 items-center'><BiSolidHeart /> My Wishlist</span></Link>
                  <button onClick={handleLogOut} className="w-full text-left px-2 py-3 border-b hover:bg-slate-300 border-b-slate-300 text-slate-500 font-semibold text-sm"> <span className='flex gap-2 items-center'><MdLogout /> Logout</span></button>
                </div>

              </div>

            </div>
            :
            <Link href={'/login'}
              className="gap-1 py-1 px-4 bg-slate-900 text-slate-50 rounded-lg focus:outline-none mt-4 md:mt-0">
              Login
            </Link>
          }

          <button
            className="gap-1 items-center bg-gray-100 border-0 p-2 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            onClick={toggleCart}>
            <BiSolidCartAlt className='text-xl font-semibold' />
          </button>

        </div>

      </div>

      <div ref={ref} 
      onMouseLeave={toggleCart}
      className='z-10 transition-all translate-x-full fixed mt-2 right-0'>
        <SideCart />
      </div>

    </header>
    }
    </>
  )
}

export default Header
