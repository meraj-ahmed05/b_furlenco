import React from 'react'

const Loader = () => {
  return (
    <div className="bg-purple-600 flex gap-2 items-center p-2 px-4 w-fit rounded-md drop-shadow-lg text-white tracking-wider">

  <div className="w-5 h-5 border-2 border-r-0 border-t-0 border-white rounded-full animate-spin" />
  <p className="font-semibold text-slate-200">Loading</p>

</div>
  )
}

export default Loader