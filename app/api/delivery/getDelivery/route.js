import connectDB from "@/libs/db";
import deliveryModel from "@/models/deliveryModel";
import { NextResponse } from "next/server"



export const revalidate = 1;
export async function GET(request){

    try{
        connectDB();

        const {searchParams} = new URL(request.url);
        const uId = searchParams.get("uId")

        const shipping = await deliveryModel.findOne({uId})

        return NextResponse.json({success: true, msg: "Posted", shipping}, {status: 200})


    }catch(err){
        // console.log(err)
        return NextResponse.json({success: false, msg: err}, {status: 500});
    }
}