import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const protectedRoutes = ['/products/add-product', '/account/me', '/cart'];

export function middleware(request: NextRequest) {
  //const token = request.cookies.get('token')?.value;
  const token = request.headers.get('authorization')?.replace('Bearer ', '');

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL('/account/login', request.url));
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      console.log(err);
      return NextResponse.redirect(new URL('/account/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: protectedRoutes,
};
