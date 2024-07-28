"use client"
import React, { useEffect, useState } from 'react'
import { useCart } from '../context/CartState';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useRouter } from 'next/navigation';
import SkeletonProductPage from './SkeletonProductPage';
import { toast } from 'react-toastify';
import PictureViewer from './PictureViewer';
import { toastOptions } from '@/utils/utils';





const ProductPageCard = ({ slug }) => {

  const [item, setItem] = useState('')
  const [preview, setPreview] = useState(false)
  const [unit, setUnit] = useState('in');
  const [qty, setQty] = useState(1);
  const { addToCart, clearCart, setCart } = useCart();

  const router = useRouter();

  useEffect(() => {

    const getSingleProduct = async () => {
      const result = await fetch(`/api/product/getsingleproduct/?slug=${slug}`);

      const res = await result.json()

      if ((res.success)) {
        setItem(res.product);
      }


    }

    getSingleProduct();

  }, [])

  const handleQty = (amt)=>{

    if(qty+amt>=1 && qty+amt <= 50){
      setQty(qty+amt)
    }

  }

  const handleCart = () => {
    toast.success(`${item.title} to Cart`, toastOptions);
    addToCart(item, qty, 1);
    setQty(1)
  }

  const handleBuyNow = ()=>{
    clearCart();
    setCart([{...item, qty: 1}]);
    router.push('/checkout')
  }

  return (

    <>
    {
      !item ?
        <SkeletonProductPage/>
      :
      <div id="main" className="flex flex-col sm:flex-row min-h-[90vh]">
            {
              preview &&
              <div className={`${preview ? "visible" : "invisible"} transition-all`}>
                <PictureViewer setPreview={setPreview} img={item?.image} />
              </div>
            }
            <div className=" bg-[#ffffff] flex justify-center items-center p-6 sm:p-8 md:p-16 sm:basis-1/2">
              <div
              onClick={()=>{setPreview(true)}}
              className="w-auto h-auto max-h-[500px] flex justify-center items-center overflow-hidden">
                <img
                  className="object-cover object-center cursor-zoom-in"
                  src={item?.image}
                />
              </div>
            </div>

            <div className="flex justify-center bg-[#efefef] p-6 sm:p-8 md:p-16 sm:basis-1/2">
              <div className="flex flex-col gap-2 justify-between text-slate-700">
                <div className='space-y-2'>
                  <h3 className="text-2xl font-bold">{item?.title}</h3>
                  <p className='text-sm font-semibold'>Category : <span className='text-slate-400'>{item?.category}</span> </p>
                </div>
                <p className="description font-semibold">{item?.description}</p>

                <div className="grid grid-flow-col items-center gap-2">
                    {
                      <div className="flex h-full justify-between border border-slate-500 px-2 py-1 font-semibold">
                          {
                            item?.height &&
                            <>
                              <div className="mx-auto">
                                <p className="text-xs uppercase text-slate-400">Height</p>
                                <p className="font-bold">{unit == "cm" ? item?.height * (2.5) : item?.height } {unit}</p>
                              </div>
                            </>
                          }
                        {
                          item?.width &&
                          <>
                            <hr className="h-full w-[1px] bg-slate-400" />
                            <div className="mx-auto">
                              <p className="text-xs uppercase text-slate-400">Width</p>
                              <p className="font-bold"> {unit == "cm" ? item?.width * (2.5) : item?.width} {unit}</p>
                            </div>
                          </>
                        }
                        {
                          item?.length &&
                          <>
                            <hr className="h-full w-[1px] bg-slate-400" />
                            <div className="mx-auto">
                              <p className="text-xs uppercase text-slate-400">Length</p>
                              <p className="font-bold"> {unit == "cm" ? item?.length * (2.5) : item?.width} {unit}</p>
                            </div>
                          </>
                        }
                        {
                          item?.diameter &&
                          <>
                            <hr className="h-full w-[1px] bg-slate-400" />
                            <div className="mx-auto">
                              <p className="text-xs uppercase text-slate-400">Diameter</p>
                              <p className="font-bold"> {unit == "cm" ? item?.diameter * (2.5) : item?.width} {unit}</p>
                            </div>
                          </>
                        }
                      </div>
                    }
                  <div>
                    <p
                      onClick={() => { setUnit(unit == "cm" ? "in" : "cm") }}
                      className="text-sm font-semibold underline cursor-pointer">
                      View in {unit == "cm" ? "inches" : "cms"}
                    </p>
                  </div>
                </div>

                <p className="text-lg font-bold text-slate-800">₹{item?.price}</p>

                <div className="flex gap-1">
                  <button onClick={()=>handleQty(-1)} className="flex h-[32px] w-[32px] items-center justify-center rounded-lg border border-black p-2 text-4xl "><AiOutlineMinus /></button>
                  <button className="flex h-[32px] w-[32px] items-center justify-center p-2 font-bold">{qty}</button>
                  <button onClick={()=>handleQty(1)} className="flex h-[32px] w-[32px] items-center justify-center rounded-lg border border-black p-2 bg-black text-white text-4xl"><AiOutlinePlus /></button>
                </div>

                <div className="flex gap-4 justify-between sm:justify-start ">

                  <button
                    className="basis-[50%] rounded-lg font-semibold border-none bg-white p-3 font-serif text-sm uppercase drop-shadow-lg text-center"
                    onClick={handleCart}>
                    <span>Add to cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="basis-[50%] rounded-lg font-semibold border-none bg-black p-3 font-serif text-sm uppercase text-white drop-shadow-lg text-center">
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            </div>
            </div>
      }

    </>
  )
}

export default ProductPageCard