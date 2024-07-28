import connectDB from "@/libs/db";
import productModel from "@/models/productModel";
import { NextResponse } from "next/server";



export const revalidate = 1;
export async function DELETE( request){

    try{
        connectDB();
        
        const {searchParams} = new URL(request.url);
        const pId = searchParams.get("pId");

        await productModel.findByIdAndDelete(pId)

        return NextResponse.json({success: true, msg: "Deleted Successfully"});

    } catch (err){
        // console.log(err);
        return NextResponse.json({success: false, msg: err})
    }
}