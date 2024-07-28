import connectDB from "@/libs/db";
import productModel from "@/models/productModel";
import { NextResponse } from "next/server"


export const revalidate = 1;
export async function GET( request ){

    connectDB();

    const {searchParams} = new URL(request.url)

    const ctg = searchParams.get('category')
    const page = searchParams.get('page')
    const search = searchParams.get('search')


    let products = []
    const lmt = 19;
    const pages = ( (page-1) >=0 ? (page-1)*lmt : 0 )
    let msg = "";
    let total = 0;
    // if(category){
    //     products = await productModel.find({category}).sort({updatedAt: -1}).skip((page-1)*lmt).limit(lmt);
    // } else{
    //     products = await productModel.find().sort({updatedAt: -1});
    // }

    msg = `Search Result For ${ctg} ${search}`

    products = await productModel.find({
        $or: [
            {
                $and: [
                    {category : ctg},
                    {slug : {$regex : search , $options: "i"}}
                ]
            }
        ]
     }).sort({updatedAt: -1}).skip(pages).limit(lmt)


    total = await productModel.find({
        $or: [
            {
                $and: [
                    {category : ctg},
                    {slug : {$regex : search , $options: "i"}}
                ]
            }
        ]
     }).sort({updatedAt: -1}).count()

     if(!products.length){
         products = await productModel.find({
            $and:[
                {
                    slug : {$regex : search , $options: "xi"}
                },
                {
                    slug: {$regex : ctg , $options: "xi"}
                }
            ]
            }).sort({updatedAt: -1}).skip(pages).limit(lmt)

        total = await productModel.find({
            $and:[
                {
                    slug : {$regex : search , $options: "xi"}
                },
                {
                    slug: {$regex : ctg , $options: "xi"}
                }
            ]
            }).sort({updatedAt: -1}).count()
        }



    return NextResponse.json( {total, products, msg, success: true});
}