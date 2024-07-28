

import connectDB from "@/libs/db";
import productModel from "@/models/productModel";
import { NextResponse } from "next/server";
import slugify from "slugify";

import {v2 as cloudinary} from 'cloudinary'
import {writeFile} from 'fs/promises'
import fs from 'fs'
import testModel from "@/models/testModel";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const revalidate = 1;
export async function POST( request ){

    try{

        connectDB();

        // const formData = await request.formData()

        // const title = formData.get("title");
        // const price = formData.get("price");
        // const width = formData.get("width");
        // const description = formData.get("description");
        // const height = formData.get("height");
        // const tag = formData.get("tag");
        // const stock = formData.get("stock");
        // const category = formData.get("category");

        const data = await request.json();
        const slug = slugify(data.title.toLowerCase(), "-");

        // await productModel.create(newData);

        // const file = formData.get('image')
        // const bytes = await file.arrayBuffer();
        // const buffer = Buffer.from(bytes)
        // const path = `./public/uploads/${file.name}`
        // await writeFile(path, buffer)

        // const result = await cloudinary.uploader.upload(path, {upload_preset: "bfurn_preset"}, (err, result)=>{
        //     if(err){
        //         console.log(err)
        //     }
        // })

        // fs.unlink(path, (err)=>{
        //     if(err){
        //         console.log(err)
        //     }
        // })

        // const image = result.secure_url;

        // let product = {title, image, slug, price, description, stock, width, height, tag, category }

        const product = await productModel.create({...data, slug});
        // await testModel.create(product);

        

        return NextResponse.json({ success: true, msg: "Product Added Successfully", product});

    } catch (err){
        // console.log(err);
        return NextResponse.json({success: false, msg: err}, {status: 500})
    }


}