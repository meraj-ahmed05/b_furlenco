import connectDB from "@/libs/db"
import userModel from "@/models/userModel"
import { NextResponse } from "next/server"



export const revalidate = 1;
export async function PUT(request){
    const {searchParams} = new URL(request.url)
    const uId = searchParams.get('uId')

    const json = await request.json()

    connectDB()
    await userModel.findByIdAndUpdate(uId, json)

    const user = await userModel.findById(uId)

    return NextResponse.json({user: user})

}