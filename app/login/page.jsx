"use client"
import { useAuth } from '@/context/AuthState'
import { toastOptions } from '@/utils/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaUser, FaUserPlus, FaLock } from 'react-icons/fa'
import { toast } from 'react-toastify'
const Page = () => {


  const router = useRouter();

  const {saveAuth} = useAuth();

  const [userDetails, setUserDetails] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetch(`/api/auth/login`,{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(userDetails)
    });

    const res = await data.json();

    if(res.success){
      // setAuth({user: res.user, token: res.token});
      saveAuth(res.user, res.token)
      toast.success("Login Successful", toastOptions)
      setTimeout(()=>{
        router.push('/')
      }, 1100)
    } else{
      toast.error(res.msg, toastOptions)
    }

  }

  return (

    <div className="flex w-screen h-[90vh] justify-center items-center ">

      <div className="custom-shadow rounded-3xl bg-[#fafaff] overflow-hidden max-w-[90%] w-[400px]">

        <div className="flex">
          <div className="login-div-active w-full">
            <button
              className="flex justify-center bg-slate-300 p-4 login-active w-full">
              <span className='text-center flex gap-2 items-center text-slate-400 text-lg '><FaUser size={"1.1em"} /> Sign in </span>
            </button>
          </div>
          <div className="login-div-deactive w-full">
            <Link href={'/register'}
              className="flex justify-center bg-slate-300 p-4 login-deactive w-full">
              <span className='text-center flex gap-2 items-center text-slate-400 text-lg '><FaUserPlus size={"1.1em"} /> Register</span>
            </Link>
          </div>
        </div>


        <div className="py-8 px-12 space-y-4 text-center">

          <div className="flex justify-center">
            <img
              width="100"
              height="100"
              className="rounded-full"
              src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              alt="user" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex rounded-lg items-center bg-slate-200 px-1">
              <span className="p-3 text-slate-400">
                <FaUser size={"1.3em"} />
              </span>
              <input type="email"
                name='email'
                value={userDetails.email}
                onChange={handleChange}
                className="w-full text-lg h-full p-3 bg-transparent text-slate-800 text-center"
                placeholder="Email" />
            </div>

            <div className="flex rounded-lg items-center bg-slate-200 px-1">
              <span className="p-3 text-slate-400">
                <FaLock size={"1.3em"} />
              </span>
              <input type="password"
                name='password'
                value={userDetails.password}
                onChange={handleChange}
                className="w-full h-full text-lg p-3 bg-transparent text-slate-800 text-center"
                placeholder="Password"
              />
            </div>

            <p className="text-xs text-left">
              <a href="">Forgot Password?</a>
            </p>
            <button
              type='submit'
              className="py-2 px-8 w-full sm:w-auto rounded-full text-slate-50 font-semibold tracking-normal bg-blue-500 hover:bg-blue-600">
              Login
            </button>
          </form>

          <p className="text-sm font-light text-slate-400">Not a member? <a className="text-slate-600 font-medium underline cursor-pointer">click here</a></p>

        </div>





      </div>

    </div>

  )
}

export default Page