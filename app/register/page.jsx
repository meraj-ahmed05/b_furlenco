"use client"
import { useAuth } from '@/context/AuthState'
import { toastOptions } from '@/utils/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { FaUser, FaUserPlus, FaLock } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { toast } from 'react-toastify'

const Page = () => {

  const router = useRouter();

  const {setAuth} = useAuth(); 

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    avatar: ''
  })

  const ref = useRef()

  const handleChange = (e)=>{
    let {name, value} = e.target;
    if(name == 'avatar'){
      value = e.target.files[0];
    }
    setUserDetails({...userDetails, [name]: value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();


    const userDetail = new FormData();
    userDetail.append('name', userDetails.name)
    userDetail.append('email', userDetails.email)
    userDetail.append('password', userDetails.password)
    if(userDetails.avatar)
      userDetail.append('avatar', userDetails.avatar, userDetails.avatar.name)

    const data = await fetch(`/api/auth/register`,{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(userDetails)
      // body: JSON.stringify(userDetail)
    });

    const res = await data.json();

    if(res.success){
      toast.success(res.msg, toastOptions)
      setTimeout(()=>{
        router.push('/login')
      }, 1100)
    } else{
      toast.error(res.msg, toastOptions)
    }

  }




  return (

  <div className="flex w-screen h-[90vh] justify-center items-center">
  
    <div className="custom-shadow rounded-3xl bg-[#fafaff] overflow-hidden max-w-[90%] w-[400px]">
  
      <div className="flex">
        <div className="login-div-deactive w-full">
          <Link href={'/login'}
          className="flex justify-center bg-slate-300 p-4 login-deactive w-full">
            <span className='text-center flex gap-2 items-center text-slate-400 text-lg '><FaUser size={"1.1em"}/> Sign in </span>
          </Link>
        </div>
        <div className="login-div-active w-full">
          <button
          className="flex justify-center bg-slate-300 p-4 login-active w-full">
            <span className='text-center flex gap-2 items-center text-slate-400 text-lg '><FaUserPlus size={"1.1em"}/> Register</span>
          </button>
        </div>
      </div>
  
  
      <div className="py-8 px-12 space-y-4 text-center">
  
        <div className="flex justify-center">
          <img 
          width="100"
          height="100"
          onClick={()=>(ref.current.click())} 
          className="rounded-full cursor-pointer"
          src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
          alt="user" />
          <input ref={ref} onChange={handleChange} className='hidden' type="file" name="avatar" id="" />
        </div>
  
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex rounded-lg items-center bg-slate-200 px-1">
            <span className="p-3 text-slate-400">
              <FaUser size={"1.3em"}/>
            </span>
            <input type="text" 
            name='name'
            value={userDetails.name}
            minLength={3}
            onChange={handleChange}
            className="w-full text-lg h-full p-3 bg-transparent text-slate-800 text-center"
            placeholder="Username"/>
          </div>

          <div className="flex rounded-lg items-center bg-slate-200 px-1">
            <span className="p-3 text-slate-400">
              <MdEmail size={"1.3em"}/>
            </span>
            <input type="email"
            name='email'
            value={userDetails.email}
            onChange={handleChange}
            className="w-full text-lg h-full p-3 bg-transparent text-slate-800 text-center"
            placeholder="Email"/>
          </div>
  
          <div className="flex rounded-lg items-center bg-slate-200 px-1">
            <span className="p-3 text-slate-400">
              <FaLock size={"1.3em"}/>
            </span>
            <input type="password"
            name='password'
            value={userDetails.password}
            onChange={handleChange}
            className="w-full h-full text-lg p-3 bg-transparent text-slate-800 text-center"
            placeholder="Password"
            />
          </div>

          <button
          type='submit'
          className="py-2 px-8 w-full sm:w-auto rounded-full text-slate-50 font-semibold tracking-normal bg-blue-500 hover:bg-blue-600">
            Register
          </button>

        </form>
  
          <p 
          className="text-sm font-light text-slate-400">Already registered? 
          <Link href={'/login'}
          className="text-slate-600 font-medium underline cursor-pointer">
            click here </Link>
          </p>
  
      </div>
  
  
  
  
  
    </div>
  
  </div>

  )
}

export default Page