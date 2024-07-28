import React from 'react'
import Cards from '../components/Cards'
import Link from 'next/link';
import productModel from '@/models/productModel';
import connectDB from '@/libs/db';

export async function getData() {
  try {
    connectDB()

    const _featured = await productModel.find({ tag: "featured" }).sort({ updatedAt: -1 })
    const _trending = await productModel.find({ tag: "trending" }).sort({ updatedAt: -1 })

    const featured = JSON.parse(JSON.stringify(_featured))
    const trending = JSON.parse(JSON.stringify(_trending))

    return {
      featured,
      trending
    }
  } catch (err) {
    return null
  }
}

const Page = async () => {
  let items = await getData();

  if (!items) {
    return null
  }

  const { featured, trending } = items

  return (
    <div className='w-full py-10 px-6 space-y-12'>
      <div className="bg-[#D8D9DA] flex flex-col-reverse md:flex-row justify-between">
        <div className="basis-1/2 flex flex-col gap-2 justify-center p-4">
          <h2
            className='text-xl font-semibold leading-relaxed
                      sm:text-2xl 
                      md:text-3xl'>
            {featured?.[0]?.title || 'Default Title'}
          </h2>
          <p>
            Welcome to our furniture store. We offer a wide range of high-quality furniture pieces that are both stylish and functional. Browse our collection and find the perfect piece for your home today.
          </p>
          <Link
            href={featured?.[0] ? `/products/${featured[0].slug}` : '#'}
            className='px-8 py-2 text-center border border-slate-400 w-48 hover:bg-slate-300 rounded-sm'>
            Shop Now
          </Link>
        </div>

        <div className="basis-1/2">
          <img
            className="w-full h-full object-cover object-center"
            src={featured?.[0]?.image || 'default-image-url'}
            alt="" />
        </div>
      </div>

      <div className="bg-[#D8D9DA] text-slate-200 flex min-h-[180px] md:max-h-[250px] gap-2">
        <div className="basis-3/5 sm:basis-4/5 flex gap-2 flex-col sm:flex-row">
          <div className="relative sm:basis-1/2">
            <img
              className="opacity-60 object-cover object-center w-full h-full"
              src={featured?.[1]?.image || 'default-image-url'}
              alt="" />

            <div className="absolute top-0 left-0 flex flex-col justify-center w-full h-full p-4 gap-1">
              <h2 className="text-2xl md:text-3xl font-bold tracking-wide">HOT DEALS</h2>
              <p className="text-sm md:text-base font-semibold">{featured?.[1]?.category || 'Default Category'}</p>
              <Link href={featured?.[1] ? `/products/${featured[1].slug}` : '#'} className="font-light underline text-sm">SHOP NOW</Link>
            </div>
          </div>

          <div className="relative sm:basis-1/2">
            <img
              className="opacity-60 object-cover object-center w-full h-full"
              src={featured?.[2]?.image || 'default-image-url'}
              alt="" />

            <div className="absolute top-0 left-0 flex flex-col justify-center w-full h-full p-4 gap-1">
              <h2 className="text-2xl md:text-3xl font-bold tracking-wide">HOT DEALS</h2>
              <p className="text-sm md:text-base font-semibold">{featured?.[2]?.category || 'Default Category'}</p>
              <Link href={featured?.[2] ? `/products/${featured[2].slug}` : '#'} className="font-light underline text-sm">SHOP NOW</Link>
            </div>
          </div>
        </div>

        <div className="basis-2/5 sm:basis-1/5 bg-rose-300 flex flex-col justify-center p-4 text-center text-slate-50">
          <h1 className="text-3xl sm:text-xl md:text-2xl">UP TO</h1>
          <h1 className="text-xl font-semibold">40% off</h1>
          <p>Home Harvest</p>
        </div>
      </div>

      <div className="bg-[#D8D9DA] text-slate-200 flex flex-row-reverse min-h-[180px] md:max-h-[250px] gap-2">
        <div className="basis-3/5 sm:basis-4/5 flex gap-2 flex-col sm:flex-row">
          <div className="relative sm:basis-1/2">
            <img
              className="opacity-60 object-cover object-center w-full h-full"
              src={featured?.[3]?.image || 'default-image-url'}
              alt="" />

            <div className="absolute top-0 left-0 flex flex-col justify-center w-full h-full p-4 gap-1">
              <h2 className="text-2xl md:text-3xl font-bold tracking-wide">HOT DEALS</h2>
              <p className="text-sm md:text-base font-semibold">{featured?.[3]?.category || 'Default Category'}</p>
              <Link href={featured?.[3] ? `/products/${featured[3].slug}` : '#'} className="font-light underline text-sm">SHOP NOW</Link>
            </div>
          </div>

          <div className="relative sm:basis-1/2">
            <img
              className="opacity-60 object-cover object-center w-full h-full"
              src={featured?.[4]?.image || 'default-image-url'}
              alt="" />

            <div className="absolute top-0 left-0 flex flex-col justify-center w-full h-full p-4 gap-1">
              <h2 className="text-2xl md:text-3xl font-bold tracking-wide">HOT DEALS</h2>
              <p className="text-sm md:text-base font-semibold">{featured?.[4]?.category || 'Default Category'}</p>
              <Link href={featured?.[4] ? `/products/${featured[4].slug}` : '#'} className="font-light underline text-sm">SHOP NOW</Link>
            </div>
          </div>
        </div>

        <div className="basis-2/5 sm:basis-1/5 bg-rose-300 flex flex-col justify-center p-4 text-center text-slate-50">
          <h1 className="text-3xl sm:text-xl md:text-2xl">UP TO</h1>
          <h1 className="text-xl font-semibold">40% off</h1>
          <p>Home Harvest</p>
        </div>
      </div>

      <Cards title={"Trending Products"} items={trending} />

      <div className="bg-[#D8D9DA] flex flex-col sm:flex-row sm:min-h-[300px] sm:max-h-[380px] md:max-h-[320px] gap-4">
        <div className="sm:w-1/2">
          <img
            className="w-full h-full object-cover object-center"
            src="https://img.freepik.com/free-photo/modern-styled-entryway_23-2150695915.jpg?t=st=1694174258~exp=1694177858~hmac=4476fc1d7e0ab21042e100ab924c8d00e24bdadead0402f47d96f915a33ee7c2&w=740"
            alt="" />
        </div>
        <div className="sm:w-1/2 p-4 md:flex md:flex-col md:justify-center md:items-center">
          <h3 className="font-semibold text-xl text-left w-full">About Us</h3>
          <p>
            Our furniture business is dedicated to providing high-quality and stylish pieces for every room in your home. With a focus on craftsmanship and attention to detail, we strive to exceed our customers expectations. Our team of experienced professionals is committed to delivering exceptional customer service and ensuring your satisfaction with every purchase.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page
