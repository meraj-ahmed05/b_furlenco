import connectDB from "@/libs/db";
import categoryModel from "@/models/categoryModel"
import { NextResponse } from "next/server"

export const revalidate = 1;
export async function GET(request){
    try{
        connectDB()
        const categories = await categoryModel.find({}).select("category");

        return NextResponse.json({success: true, categories})

    } catch (err){
        // console.log(err)
        return NextResponse.json({success: false, msg: err}, {status: 500})
    }
}