"use client"
import AdminSideBar from '@/components/AdminSideBar'
import { toastOptions } from '@/utils/utils'
import React, { useEffect, useRef, useState } from 'react'
import { MdAddBox, MdCancel, MdClose, MdDelete, MdEdit, MdPhotoCamera, MdSearch } from 'react-icons/md'
import { toast } from 'react-toastify'
import { CldUploadWidget } from 'next-cloudinary';


const Page = () => {

  const initialProduct = {
    title: '', 
    description: '', 
    image: undefined, 
    category: '', 
    price: '', 
    width: '', 
    height: '', 
    tag: 'regular', 
    stock: 'in-stock'
  }
  const [products, setProducts] = useState([]);
  const [delStatus, setDelStatus] = useState({ status: false, item: {} })
  const [updStatus, setUpdStatus] = useState({ status: false, item: {}, tag: "" })
  const [search, setSearch] = useState('');
  const [product, setProduct] = useState(initialProduct);
  const [categories, setCategories] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([])
  const cloudRef = useRef();

  const getProducts = async () => {
    const result = await fetch(`/api/product/getproduct`)
    const res = await result.json();
    if(res.success){
      setProducts(res.products)
      setDisplayProducts(res.products)
    }
  }

  const getCategories = async () => {
    const result = await fetch(`/api/category/getcategory`)
    const res = await result.json();
    if(res.success){
      setCategories(res.categories)
    }
  }


  useEffect(() => {

    getProducts()
    getCategories()

  }, [])

  useEffect(()=>{
    
    const search = ()=>{
      const timeOut = setTimeout(()=>{
        handleSearch();
      }, 1000)
      
      return ()=>{clearTimeout(timeOut)}
    }


    search();
    
  }, [search])

  const handleDelete = async () => {

    const pId = delStatus.item.id
    const result = await fetch(`/api/product/deleteproduct/?pId=${pId}`, {
      method: "DELETE"
    })

    const res = await result.json();

    if (res.success) {
      showDelete(false)

      setDisplayProducts((items) =>
        items.filter((item) => {
          return (item._id != pId)
        })
      )

      setProducts((items) =>
        items.filter((item) => {
          return (item._id != pId)
        })
      )

      toast.success(res.msg, toastOptions)
    }
  }

  const handleUpdate = async () => {

    if (updStatus.tag == "add") {
      const result = await fetch(`/api/product/addproduct`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json"
        // },
        body: JSON.stringify(product)
        // body: formData
      })
      
      const res = await result.json();

      
      if(res.success){
        const newProduct = res.product
        toast.success(res.msg, toastOptions)
        setProducts(([newProduct, ...products ]))
        setDisplayProducts([newProduct, ...products])
      }

      showProduct(false)

    } else {
      const result = await fetch(`/api/product/updateproduct/?id=${updStatus.item.id}`, {
        method: "PUT",
        body: JSON.stringify(product)
        // body: formData
      })

      const res = await result.json();

      if(res.success){
        const newProduct = res.product
        toast.success(res.msg, toastOptions)

        let items = products

        items = items.filter((item)=>{
          return (item._id != newProduct._id)
        })

        items = [newProduct, ...items]
        
        setProducts(items)
        setDisplayProducts(items)

      }
      
      showProduct(false)

    }
  }
  
  const handleSearch = () => {
    const newPro = products.filter((item)=> {return (item.title.includes(search) || item.slug.includes(search)  || item.category.includes(search) ) })
    if(newPro.length)
      setDisplayProducts(newPro)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "search") {
      setSearch(value.toLowerCase())
    } else {
      setProduct({ ...product, [name]: value })
    }
  }

  const showDelete = (item) => {
    if (item) {
      document.body.style.overflow = "hidden"
      setDelStatus({ status: true, item: { id: item._id, title: item.title } })
    }
    else {
      document.body.style.overflow = "scroll"
      setDelStatus({ status: false, item: {} })
    }
  }

  const showProduct = (item) => {

    let itm = item;
    if (item) {
      document.body.style.overflow = "hidden"
      if(item == "add"){
        setUpdStatus({ status: true, tag: "add"})
      } else{
        setUpdStatus({ status: true, item: {id: item._id}, tag: "update"})
        setProduct(itm)
      }
    }
    else {
      document.body.style.overflow = "scroll"
      setUpdStatus({ status: false, item: {}, tag: "" })
      setProduct(initialProduct)
    }
  }

  return (
    <div className='flex'>

      <div className='absolute'>
      <CldUploadWidget
        signatureEndpoint="/api/auth/cloudinarySign"
        uploadPreset="bfurn_preset"
        onUpload={(result, widget) => {
          // console.log('SignedUpload:widget:upload', result);
          const res = result?.info
          setProduct({...product, image: res?.secure_url});
          widget.close();
        }}
        onOpen={(widget) => {
          // console.log('SignedUpload:widget:open', widget);
        }}
        onClose={(widget) => {
          // console.log('SignedUpload:widget:close', widget);
        }}
      >
        {({ open }) => {
          function handleOnClick(e) {
            setProduct({...product, image: undefined});
            e.preventDefault();
            open();
          }
          return (
            <button ref={cloudRef} onClick={handleOnClick} />
          );
        }}
      </CldUploadWidget>

      </div>

      {
        delStatus.status &&

          <div className="absolute flex items-center justify-center w-screen min-h-screen bg-[#ffffff]/30 backdrop-blur-sm">
            <div className="max-w-[90%] w-[360px] h-[180px] bg-[#f6f6f5] rounded-xl flex flex-col items-center justify-center gap-4">
              <div className="text-center">
                <p className="text-lg sm:text-xl leading-4">Want to Delete the item</p>
                <p className="text-lg sm:text-xl font-semibold ">{delStatus.item?.title}</p>
              </div>
              <div className='flex gap-2'>
                <button onClick={() => showDelete(false)} className="text-sm sm:text-base font-semibold border bg-blue-200 hover:bg-blue-300 transition-all px-4 py-2 rounded-lg flex gap-1 items-center"><MdCancel size={"1.2em"} /> Cancel</button>
                <button onClick={handleDelete} className="text-sm sm:text-base font-semibold bg-rose-500 hover:bg-rose-300 transition-all px-4 py-2 rounded-lg flex gap-1 items-center"><MdDelete size={"1.2em"} /> Delete</button>
              </div>
            </div>
          </div>
    
      }
      {
        updStatus.status &&
          <div className="absolute z-[5] top-0 left-0 flex min-h-screen h-full w-screen items-center justify-center bg-black/10 backdrop-blur-sm">
            <div className="flex sm:flex-row flex-col rounded-lg max-w-[800px] bg-[#f5f6f5] h-fit p-8 gap-4">
              <button
                onClick={() => showProduct()}
                className="absolute right-[3%] top-[3%] hover:text-slate-200 hover:bg-slate-700 text-slate-700 cursor-pointer rounded-full border border-slate-700 p-2">
                <MdClose />
              </button>

              <div className="flex flex-col basis-full sm:basis-[40%] gap-4">
                <div className="relative w-full min-h-[30px] sm:h-[60%]">
                  <img className="h-full w-full rounded-xl object-cover object-center"
                    src={product?.image}
                    />
                  <div onClick={() => { cloudRef.current.click() }} className="cursor-pointer hover:text-[#ffffff] text-slate-800 p-4 absolute top-0 left-0 flex flex-col justify-center items-center w-full h-full bg-black/10">
                    <MdPhotoCamera className='hidden sm:block' size={"1.8em"} />
                    <p className='text-center text-sm'>Click to change photo</p>
                  </div>
                  {/* <input onChange={(e) => {setPhoto(URL.createObjectURL(e.target.files[0])); setProduct({...product, image: e.target.files[0]})}} type="file" className='hidden' ref={ref} /> */}
                </div>

                <div className="w-full h-full sm:h-[40%]">
                  <textarea name='description' value={product.description} onChange={handleChange} placeholder="Product Description"
                    className="custom-scrollbar bg-[#ffffff] h-full w-full resize-none rounded-xl p-2 text-slate-600 outline-none"></textarea>
                </div>
              </div>

              <div className="flex sm:basis-[60%] flex-col gap-4">
                <div className="w-full border-b border-slate-500">
                  <input name='title' value={product.title} onChange={handleChange} placeholder="Product Name" className="w-full rounded-sm border-none bg-[#ffffff] p-2 text-slate-600 outline-none py-3" type="text" />
                </div>
                <div className="w-full border-b border-slate-500">
                  <input name='price' value={product.price} onChange={handleChange} placeholder="₹ Price" className="w-full rounded-sm border-none bg-[#ffffff] p-2 text-slate-600 outline-none" type="text" />
                </div>

                <div className="w-full border-b border-slate-500">
                  <select name='category' value={product.category} onChange={handleChange} className="w-full rounded-sm border-none bg-[#ffffff] p-2 capitalize text-slate-600 outline-none" type="text" placeholder="category">
                    <option className="hidden">category</option>
                    {categories?.map((c)=>(<option key={c._id} value={c.category}>{c.category}</option>))}
                  </select>
                </div>

                <div className="w-full border-b border-slate-500">
                  <select name='tag' value={product.tag} onChange={handleChange} className="w-full rounded-sm border-none bg-[#ffffff] p-2 capitalize text-slate-600 outline-none" type="text">
                    <option value="regular">regular</option>
                    <option value="featured">featured</option>
                    <option value="trending">trending</option>
                  </select>
                </div>

                <div className="flex w-full gap-2 ">
                  <div className="w-1/2 border-b border-slate-500">
                    <input name='width' value={product.width} onChange={handleChange} className="w-full rounded-sm border-none bg-[#ffffff] p-2 text-slate-600 outline-none" type="text" placeholder="width(in)" />
                  </div>
                  <div className="w-1/2 border-b border-slate-500">
                    <input name='height' value={product.height} onChange={handleChange} className="w-full rounded-sm border-none bg-[#ffffff] p-2 text-slate-600 outline-none" type="text" placeholder="height(in)" />
                  </div>
                </div>

                <div className="w-full border-b border-slate-500">
                  <select name='stock' value={product.stock} onChange={handleChange} className="w-full rounded-sm border-none bg-[#ffffff] p-2 text-slate-600 outline-none" type="text">
                    <option defaultValue="in-stock">in stock</option>
                    <option value="out-of-stock">out of stock</option>
                  </select>
                </div>

                <div>
                  <button onClick={handleUpdate} className='flex p-2 text-center justify-center bg-blue-500 hover:bg-blue-600 rounded-xl w-full text-slate-50'> {product?.slug ? "Update" : "Add"} </button>
                </div>
              </div>

            </div>
          </div>
      }


      <AdminSideBar active={"products"} />

      <div className='p-6 text-center w-full md:w-[75%] space-y-4'>
        <div className='flex flex-col-reverse md:flex-row gap-4'>

          <form onSubmit={(e)=>e.preventDefault()} className='flex items-center transition-all w-full bg-[#f5f6f5a1] hover:translate-y-1 hover:shadow-none shadow-xl font-semibold'>
            <input onChange={handleChange} name='search' value={search} className='p-2 w-full text-center gap-2' />
            <button type="submit" onClick={handleSearch} className='p-2 flex'>
              <MdSearch size={"1.4em"} />
            </button>
          </form>

          <button 
          className='p-3 transition-all bg-[#f5f6f5a1] hover:bg-slate-400 font-semibold uppercase text-center flex justify-center w-full md:w-1/2 items-center gap-2'
          onClick={() => { showProduct("add") }}>
            add product<MdAddBox size={"1.3em"} />
          </button>
          

        </div>
        <>
        {
            displayProducts?.length
            ?
        <div className='w-full grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>

            {
            displayProducts?.map((item) => {
              return (
                  <div key={item._id} className='justify-self-center custom-shadow mb-8 border rounded-t-lg overflow-hidden flex flex-col justify-between 
                          max-w-full max-h-[440px]
                          w-[400px] min-h-[350px]
                          sm:w-[300px] sm:min-h-[350px]'>
                    <div className='overflow-hidden w-full h-[280px] rounded-t-lg cursor-pointer'>
                      <img
                        className=' w-full h-full object-cover object-center hover:scale-[1.04] transition-all'
                        src={item?.image}
                        alt="product" />
                    </div>

                    <div className=' flex items-center justify-between p-2'>

                      <div>
                        <p className='text-lg sm:text-base text-slate-800 font-semibold tracking-normal'>{item?.title}</p>
                        <p className='text-base sm:text-sm text-slate-500 font-semibold'>₹{item?.price}</p>
                      </div>

                      <div className='flex gap-2 sm:text-lg md:text-xl font-bold'>
                        <button
                          onClick={() => showProduct(item)}
                          className='border-2 p-2 rounded-full transition-all hover:bg-blue-200'>
                          <MdEdit className='text-blue-500' size={"1.2em"} />
                        </button>

                        <button
                          onClick={() => showDelete(item)}
                          className='border-2 p-2 rounded-full transition-all hover:bg-red-200 '>
                          <MdDelete className='text-red-500' size={"1.2em"} />
                        </button>
                      </div>

                    </div>

                  </div>

              )
            })
          }
            

        </div>
        :
        <h1 className='text-center py-12 text-3xl font-semibold text-slate-800'>No Product Found</h1>
      }
        </>
      </div>

    </div>
  )
}
export default Page