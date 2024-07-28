import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import userModel from '@/models/userModel';

export const revalidate = 1;
export async function GET(request) {
  try {
    const body = await request.headers;

    const token = body.get('auth-token');

    const data = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await userModel.findById(data.id).select('role');

    if (!admin || !admin.role) {
      return NextResponse.json(
        { msg: 'UnAuthorized Access', access: 0 },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { msg: 'Authorized Access', access: 1 },
      { status: 200 }
    );
  } catch (err) {
    // console.log(err);
    return NextResponse.json(
      { msg: 'Check Auth Error', access: 0 },
      { status: 500 }
    );
  }
}
