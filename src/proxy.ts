/**
 * This is a middleware to verify the jwt and protect some routes
 *
 */

import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

export async function proxy(request: NextRequest) {
  let token = request.cookies.get('access_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    await jwtVerify(token, SECRET);
    return NextResponse.next();
  } catch (error) {
    console.error('Token verification failed');
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/home:path*'],
};
