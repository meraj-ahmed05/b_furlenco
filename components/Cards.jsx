import React from 'react'
import ProductCard from './ProductCard'
const Cards = ({title, items}) => {
  return (
    <div className='my-container w-full py-4 space-y-4'>
        <h1 className='font-semibold text-center tracking-wider text-2xl uppercase'>{title}</h1>    

        <hr/>

        <div className='justify-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
            {
              items?.map((item)=>(<ProductCard key={item._id} item={item} />) )
            }
        </div>
    </div>
  )
}

export default Cards