import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ message: 'Token missing' }, { status: 401 });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}
