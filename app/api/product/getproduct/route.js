import connectDB from "@/libs/db";
import productModel from "@/models/productModel";
import { NextResponse } from "next/server"

export const revalidate = 1;
export async function GET( request ){

    try{
        
        connectDB();

        const products = await productModel
                        .find({})
                        .sort({updatedAt: -1});

        return NextResponse.json( {success: true, msg: "Products Fetched Successfully", products});
    } catch (err){
        // console.log(err)
        return NextResponse.json({success: false, msg: err}, {status: 500})
    }

}