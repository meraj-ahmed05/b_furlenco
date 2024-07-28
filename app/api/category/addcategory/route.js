import connectDB from "@/libs/db";
import categoryModel from "@/models/categoryModel"
import { NextResponse } from "next/server"


export const revalidate = 1;
export async function POST(request){
    try{

        connectDB()
        const data = await request.json();

        const category = (data.category).toLowerCase();
        const existingCategory = await categoryModel.findOne({category});

        if(existingCategory){
            return NextResponse.json({success: false, msg: "Category Already Exists"})
        }

        const newCategory = await categoryModel.create({category});

        return NextResponse.json({success: true, newCategory})

    } catch (err){
        // console.log(err)
        return NextResponse.json({success: false, msg: err}, {status: 500})
    }
}