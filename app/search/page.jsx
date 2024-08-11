"use client"
import Loader from '@/components/Loader'
import ProductCard from '@/components/ProductCard'
import Skeleton from '@/components/Skeleton'
// import { categories } from '@/utils/utils'
import React, { useEffect, useState } from 'react'
import { BiSolidDownArrow, BiSearch } from 'react-icons/bi'
import { FaFilter } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'


const Page = () => {

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState({title: "Our Catalog", search: '', category: ''})
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [showFilter, setShowFilter] = useState(false)
  const itm = Array(0,1,2,3,4,5,6,7,8,9)


  const loadProducts = async (page=1,search,category)=>{
      const res = await fetch(`/api/product/searchproduct/?page=${page}&search=${search}&category=${category}`)
    const response = await res.json();
    return response;
  }

  useEffect(()=>{

    const getproduct = async (search, category)=>{
      setLoading(true);
      setHasMore(true)
      setPage(1)
      const res = await loadProducts(1,search, category);
      setLoading(false)
      setProducts(res.products);

      
      const total = res.total

      const items = res.products

      if(items.length >= total){
        setHasMore(false)
      }



      if(filter.search || filter.category){
        setFilter({...filter, title: `${res.msg}` })
      } else{
        setFilter({...filter, title: `Our Catalog` })
      }
    }

    const timeOut = setTimeout(()=>{
      getproduct(filter.search, filter.category);
    }, 1000)

    return ()=>(clearTimeout(timeOut))
    
  }, [filter.search, filter.category])

  useEffect(()=>{

    const getproduct = async (page, search, category)=>{
      setLoading(true);
      const res = await loadProducts(page, search, category);

      const total = res.total

      const items = [...products, ...(res.products)]

      if(items.length >= total){
        setHasMore(false)
      }

      setLoading(false)
      // setProducts([...products, ...result.products]);
      setProducts(items)
    }

    const timeOut = setTimeout(()=>{
      (page >= 2) && getproduct(page, filter.search, filter.category);
    }, 2000)

    return ()=>(clearTimeout(timeOut))
  }, [page])

  useEffect(()=>{
    const getCategories = async ()=>{
      const result = await fetch(`/api/category/getcategory`);

      const res = await result.json();

      if(res.success){
        setCategories(res.categories)
      }
    }

    getCategories();

  }, [])


  const handleChange = (e)=>{
    const {name, value} = e.target;
    setFilter({...filter, [name]: value})
  }


  const handleFilter = ()=>{
    // window.scrollTo({top:0,behavior:'smooth'})
    // setTimeout(()=>{
      setShowFilter(!(showFilter))
    // }, 500)
  }

  // window.onscroll = ()=>{
  //   if( showFilter && (scrollY) > 150){
  //     setShowFilter(false)
  //   } 
  // }



  return (

      <>
    <div className="flex sm:flex-row flex-col">

      <div className={`${showFilter ? "h-0" : 'min-h-[10px]'} max-h-[50px] transition-all w-full overflow-hidden ease-in-out sm:hidden px-4 text-center`}>
        <button onClick={handleFilter} className=" transition-all bg-slate-600 hover:bg-slate-700 flex gap-2 justify-center items-center w-full py-2 rounded-lg text-lg text-slate-200 font-semibold">
          Filter
          <FaFilter/>
        </button>
      </div>

      <div className={`${showFilter ? "min-h-[10px] h-full" : 'h-0'} transition-all sm:h-full ease-in-out px-5 py-0 overflow-hidden sm:overflow-visible sm:block sm:basis-[30%] md:basis-[25%] sm:p-5 space-y-2 bg-white/30 `}>
        <h1 className="transition-all font-semibold text-xl text-slate-900">Categories</h1>
        <div className="transition-all flex flex-col gap-1">

          {
            categories?.map((ctg)=>{
              return (
                <label htmlFor={`category-${ctg._id}`} key={ctg._id}>
                  <div className={`${filter.category === ctg.category && "bg-gradient-to-r from-[#d1d1d1] to-[#b6b6b6]"} hover:bg-[#d1d1d1] transition-all rounded-l-lg flex items-center space-x-4 p-2 cursor-pointer`}>
                    <input checked={filter.category === ctg.category} type="radio" onChange={handleChange} value={ctg.category} name="category" id={`category-${ctg._id}`} className="h-4 w-4 accent-[#7079a8]" />
                    <span className="capitalize font-normal cursor-pointer">{ctg.category.replace('-', ' ')}</span>
                  </div>
                </label>
              )
            })
          }

          <div className='flex gap-2 mt-4 text-center'>
            <button onClick={()=>{setFilter( {title: "Our Catalog", search: '', category: ''})}} className='py-1 px-3 border w-full justify-center text-[#ffffff] bg-red-500 hover:bg-red-600 flex gap-2 items-center'>Clear<MdClose/> </button>
          </div>

        </div>
        <div className='sm:hidden flex gap-2 text-center'>
          <button onClick={handleFilter} className='py-2 px-3 border w-full justify-center text-[#ffffff] bg-slate-700 hover:bg-slate-800 flex gap-2 items-center'>Close<FaFilter/></button>
        </div>
      </div>


      <div className="basis-full sm:basis-[70%] md:basis-[75%] p-5 space-y-4">

        <div className='space-y-4'>

          <div className="rounded-r-full overflow-hidden flex items-center custom-outer-shadow outline-none px-4">
            <input
              autoComplete='true'
              name='search'
              onChange={handleChange}
              value={filter.search}
              className="p-2 border-b border-sky-500 bg-transparent outline-none font-semibold"
              type="search" />
            <span className="p-2">
              <BiSearch size={"1.3em"}/>
            </span>
          </div>

          <h1 className="text-center text-xl">{filter.title}</h1>
          <hr />
        </div>


        <div className="max-h-[70vh] no-scrollbar overflow-y-scroll w-full grid gap-4 max-[570px]:grid-cols-1 max-[639px]:grid-cols-2 md:grid-cols-2 min-[1000px]:grid-cols-3 justify-items-center">
          {
            products?.map((item, index) => {
              return (
                <ProductCard key={index} item={item} />
              )
            })
          }
          {
            loading &&
            itm?.map((item, index)=>(<Skeleton key={index}/>))
          }
        </div>

          { 
          loading
          ? 
          <div className='flex justify-center'>
            <Loader/>
          </div>
          : (
            hasMore &&
            <button 
            onClick={()=>{setPage(page+1)}}
            className='p-2 bg-slate-400 border px-8 rounded-lg text-slate-200 mx-auto flex gap-2 hover:bg-slate-500  items-center'> 
            Load More <BiSolidDownArrow/>
            </button>
          )
        
          }
      </div>


    </div>
      <hr />
    </>
  )
}

export default Page