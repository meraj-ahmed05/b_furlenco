import connectDB from "@/libs/db";
import deliveryModel from "@/models/deliveryModel";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";

export const revalidate = 100;
export async function GET(request){

    try{
  
      connectDB();
  
      const u = await userModel.find({}).select("name email");
      
      let users = [];
  
      for (let index = 0; index < u.length; index++) {
        const e = u[index];
        const d = await deliveryModel.findOne({uId: e._id}).select("-uId");
        const det = JSON.parse(JSON.stringify(d))
        const us = JSON.parse(JSON.stringify(e))
        
        users.push({...us, ...det})
      }

      return NextResponse.json({success: true, users});

    }catch(err){
        console.log(err)
        return NextResponse.json({success: false, msg: "Internal Server Error"}, {status: 500})
    }
  }