import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export const revalidate = 1;
export async function POST(req) {
  const body = await req.json()
  const { paramsToSign } = body;

  try {
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET,
      process.env.CLOUDINARY_API_KEY
    );
    return NextResponse.json({
      signature,
    }, {status: 200});
  } catch (error) {
    return NextResponse.json({
      error: e.message,
    }, {status: 500});
  }
}