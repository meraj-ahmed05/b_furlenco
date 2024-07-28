import React from 'react'

const Skeleton = () => {
  return (
    

<div className="flex flex-col justify-between border animate-pulse rounded-lg w-[300px] h-[300px] p-2 space-y-4">

<div className="bg-slate-400 w-full h-2/3"></div>

<div className="flex gap-4 items-center h-1/4">
    <div className="w-1/2 space-y-4">
      <div className="w-full h-4 bg-slate-400"></div>
      <div className="w-full h-4 bg-slate-400"></div>
    </div>
    <div className="w-12 h-12 bg-slate-400 rounded-full"></div>
    <div className="w-12 h-12 bg-slate-400 rounded-full"></div>
</div>


</div>
  )
}

export default Skeleton