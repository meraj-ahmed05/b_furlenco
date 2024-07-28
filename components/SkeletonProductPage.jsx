import React from 'react'

const SkeletonProductPage = () => {
  return (
    

<div className="flex flex-col sm:flex-row p-8 justify-between gap-8 animate-pulse h-screen sm:h-[90vh] border rounded-lg">

<div className="basis-[48%] bg-[#D8D9DA]" />

<div className="basis-[48%] flex flex-col justify-between gap-2">

  <div className="flex flex-col gap-2">
    <div className="w-3/4 h-[10px] bg-[#D8D9DA]" />
    <div className="w-full h-[30px] bg-[#D8D9DA]" />
  </div>

  <div className="w-full h-[100px] bg-[#D8D9DA]" />

  <div className="flex gap-2">
    <div className="w-1/2 h-[50px] bg-[#D8D9DA]" />
    <div className="w-2/5 h-[30px] bg-[#D8D9DA]" />
  </div>

  <div className="w-2/5 h-[20px] bg-[#D8D9DA]" />

  <div className="flex justify-between">
    <div className="bg-[#D8D9DA] basis-[49%] h-[40px] p-2" />
    <div className="bg-[#D4E4D0] basis-[49%] h-[40px] p-2" />
  </div>

</div>

</div>
  )
}

export default SkeletonProductPage