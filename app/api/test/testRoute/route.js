import connectDB from "@/libs/db";
import deliveryModel from "@/models/deliveryModel";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server"



export const revalidate = 1;
export async function GET(request){

    try{
        connectDB();

        const {searchParams} = new URL(request.url);
        const uId = searchParams.get("uId")

        const shipping = await deliveryModel.findOne({uId})

        return NextResponse.json({success: true, msg: "Posted", shipping}, {status: 400})

        


    }catch(err){
        // console.log(err)
        return NextResponse.json({success: false, msg: err}, {status: 500});
    }



}

export async function PUT(request){

    try{
        connectDB();

        const {searchParams} = new URL(request.url);
        const uId = searchParams.get("uId")

        const data = await request.json();


        let shipping = await deliveryModel.findOne({uId})


        if(!shipping){
            shipping = await deliveryModel.create({...data, uId: uId});
        } else{
            shipping = await deliveryModel.findByIdAndUpdate(shipping._id, data);
        }


        return NextResponse.json({success: true, msg: "Posted", shipping}, {status: 200})

        


    }catch(err){
        // console.log(err)
        return NextResponse.json({success: false, msg: err}, {status: 500});
    }

}