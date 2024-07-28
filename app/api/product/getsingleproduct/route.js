import connectDB from "@/libs/db";
import productModel from "@/models/productModel";
import testModel from "@/models/testModel";
import { NextResponse } from "next/server";


export const revalidate = 1;
export async function GET(request){

    try{

    connectDB()
    const {searchParams} = new URL(request.url);

    const slug = searchParams.get("slug");

    
    const product = await productModel.findOne({slug})
    // const product = await testModel.findOne({slug})

    

    if(!product){
        return NextResponse.json({success: false, msg: "No Product Found"}, {status: 404});
    }

    return NextResponse.json({success:true, product})
        
    } catch (err){
        // console.log(err);
        return NextResponse.json({success: false, msg: err}, {status: 500})
    }

}