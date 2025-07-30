import { connectDB } from '@/lib/mongodb';
import Ecomuser from '@/models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, password, ...rest } = body;

    const existing = await Ecomuser.findOne({ email });
    if (existing) return NextResponse.json({ message: 'Email already use' }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Ecomuser.create({ email, password: hashedPassword, ...rest });
    return NextResponse.json({ message: 'User registered successfully', user }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
