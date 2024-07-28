import React from 'react'
import { FaBoxOpen } from 'react-icons/fa'

const Page = () => {
  return (
    <div className = "md:text-3xl sm:text-2xl text-xl text-center flex flex-col items-center py-12">
          <FaBoxOpen size="5em" className='text-slate-600'/>
        {/* <img src="https://img.freepik.com/free-vector/empty-cardboard-plastic-box_33099-1060.jpg?w=740&t=st=1697698801~exp=1697699401~hmac=d00ac64b75c4218a36b196e09d4560874bdaf75c6e1b12c8b11a82df4a4ced4e" alt="" /> */}
        <h1>No Orders Yet!</h1>
    </div>
  )
}

export default Page