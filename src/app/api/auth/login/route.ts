import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { validateUser } from '@/lib/common-server-side';

import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();
    console.log('may email before login action ::', email);
    console.log('may password before login action ::', password);

    const user = await validateUser(email, password);
    console.log('user object after validateUser()', user);
    if (!user) {
      return NextResponse.json({ message: 'invalid User' }, { status: 201 });
    }

    // Mock token (for now, until JWT is used)
    /*const token = `${user._id}-${Date.now()}`;
    const userPayload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      age: user.age,
      dob: user.dob,
      status: user.status,
      type: user.type,
    };*/

    // Create JWT payload
    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
      age: user.age,
      type: user.type,
      status: user.status,
    };

    // Sign JWT
    /*const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    });*/

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' });

    const response = NextResponse.json({ accessToken, user: payload }, { status: 200 });

    //Set refreshToken in secure cookie
    response.cookies.set('REFRESH_TOKEN', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
