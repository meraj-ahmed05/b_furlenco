import Cards from '@/components/Cards';
import Spinner from '@/components/Spinner';
import connectDB from '@/libs/db'
import categoryModel from '@/models/categoryModel';
import productModel from '@/models/productModel'
import Link from 'next/link';
import React from 'react'

async function getServerSideProps(category){
    try{
        connectDB()

        const ctg = await categoryModel.findOne({category});


        if(!ctg){
            return {
                items: null
            }
        }

        const itms = await productModel.find({category});

        const items = JSON.parse(JSON.stringify(itms))

        return {
            items
        }

    }catch(err){
        return {
            items: null
        }
    }
}

const Page = async ({params}) => {
    const {ctg} = params

    const {items} = await getServerSideProps((ctg.toLowerCase()));

    if(!items){

        return (
            <Spinner/>
        )
    }

    const products = items

  return (
    <>
        {
            !products?.length
            ?
            <div className='min-h-[40vh] flex flex-col justify-center items-center gap-2'>
                <h1 className='text-center text-3xl'>No {ctg}-Product found</h1>
                <Link 
                href={'/search'}
                className='text-center px-8 py-2 border bg-slate-300 w-48 hover:bg-slate-200 rounded-sm'>
                Back to Shop</Link>
            </div>
            :
            <Cards title={ctg} items={products} />
        }
    </>
  )
}

export default Page