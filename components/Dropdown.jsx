"use client"
import React, { useState } from 'react'

const Dropdown = ({title, menu, func1}) => {

    const [dropdown, setDropDown] = useState('h-0');


  return (
    <div className="relative">
    <button 
    onMouseEnter={()=>(setDropDown(''))}
    onMouseLeave={()=>(setDropDown('h-0'))}
    // onClick={()=>(setDropDown(''))}
    className="flex  py-1 px-2 rounded-md bg-blue-500 text-slate-50 font-semibold">
        {title}
    </button>

    <div 
    onMouseEnter={()=>(setDropDown(''))}
    onMouseLeave={()=>(setDropDown('h-0'))}
    className={`flex ${dropdown} transition-all translate-x-0 flex-col absolute right-0 bg-slate-200 min-w-[160px] rounded-md overflow-hidden `}>
        {
            menu?.map( (menuItem, index)=>{
                return (
                    <button key={`${menuItem.title}-${index}`} onClick={()=>{func1}} className="w-full text-left px-2 py-3 border-b hover:bg-slate-300 border-b-slate-300 text-slate-500 font-semibold"> <span className='flex gap-2 items-center'>{menuItem.icon} {menuItem.title}</span></button>
                )
            } )
        }
    </div>

  </div>
  )
}

export default Dropdown