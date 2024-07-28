import connectDB from "@/libs/db"
import userModel from "@/models/userModel";
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const revalidate = 1;
export async function POST(request){

    try{

        connectDB();

        const user = await request.json()

        let existingUser = await userModel.findOne({email: user.email});

        if(!existingUser){
            return NextResponse.json({success: false, msg: "Invalid Credentials. Incorrect email or password"}, {status: 200})
        }

        const matchedPassword = await bcrypt.compare(user.password, existingUser.password)
        if(!matchedPassword){
            return NextResponse.json({success: false, msg: "Invalid Credentials. Incorrect email or password"}, {status: 200})
        }

        const data = {
            id: existingUser._id
        }

        const token = jwt.sign( data, process.env.JWT_SECRET, {expiresIn : "1d"} )
        
        const u = await userModel.findById(existingUser._id).select("name email")

        return NextResponse.json({success: true, msg: "login successful",user: u, token }, {status: 200})

    }catch(err){
        // console.log(err)
        return NextResponse.json({success: false, msg: err}, {status: 500})
    }


}