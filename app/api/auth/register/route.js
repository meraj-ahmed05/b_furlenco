import connectDB from "@/libs/db"
import userModel from "@/models/userModel";
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'


export const revalidate = 1;
export async function POST(request){

    try{

        connectDB();

        const user = await request.json()

        const existingUser = await userModel.findOne({email: user.email});

        if(existingUser){
            return NextResponse.json({success: false, msg: "User Already Exist. Please Sign in"}, {status: 200})
        }

        const password = await bcrypt.hash(user.password, 10);

        await userModel.create({...user, password});

        return NextResponse.json({success: true, msg: "Registered Successfully"}, {status: 200})

    } catch(err){
        // console.log(err)
        return NextResponse.json({success: false, msg: err}, {status: 500})
    }


}