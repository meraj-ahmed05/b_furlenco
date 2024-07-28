import React from 'react'

const OrderCard = ({item}) => {
  return (
    <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg gap-2">

      <div className="flex items-center gap-4">
        <div className="h-[72px] w-[72px] overflow-hidden rounded-lg border">
          <img className="h-full w-full object-cover object-center" src={item?.image} alt="" />
        </div>
        <div>
          <h3>{item.title}</h3>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <p>{item.width}inch</p>
            <hr className="h-3 w-[1px] bg-slate-400" />
            <p>{item.height}inch</p>
          </div>
        </div>
      </div>

      <div className='hidden md:block max-w-[50%]'>
        <p className='text-sm text-slate-300'>{item.description.slice(0,50)}</p>
      </div>

      <div>
        <h3 className="text-lg">₹{item.price}</h3>
        <p className="text-right sm:text-base text-sm text-slate-400">Qty: {item.qty}</p>
      </div>
    </div>
  )
}

export default OrderCard