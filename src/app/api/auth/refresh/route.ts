import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('REFRESH_TOKEN')?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: 'No refresh token' }, { status: 401 });
  }

  try {
    const user = jwt.verify(refreshToken, process.env.JWT_SECRET!);
    const newAccessToken = jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: '15m' });

    return NextResponse.json({ accessToken: newAccessToken }, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Invalid refresh token' }, { status: 403 });
  }
}
