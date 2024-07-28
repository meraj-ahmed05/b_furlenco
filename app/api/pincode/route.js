import { NextResponse } from "next/server"

const pincodes = {
  ['341505']:
  {
    pin: '341505',
    state: "Rajasthan",
    city: "Makrana"
  }
  
}

export const revalidate = 1;
export async function GET( req ) {

    try{

      const pins = await req.headers;
      const pin = pins.get('pin')

      const addr = pincodes[pin]
       
      return NextResponse.json({success: true, address: addr })

    } catch (err){
      console.log(err)
        return NextResponse.json({success: false, msg: err})

    }
}