import ProductPageCard from '@/components/ProductPageCard'
import React from 'react'

const Page = ({params}) => {
    const {slug} = params
  return (
    <ProductPageCard slug={slug} />
  )
}

export default Page