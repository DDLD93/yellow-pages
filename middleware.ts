import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = process.env.ADMIN_SESSION_SECRET || 'default_secret_key_change_me';
const encodedKey = new TextEncoder().encode(secretKey);

export async function middleware(request: NextRequest) {
  // Only run on /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // Allow access to login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    const session = request.cookies.get('admin_session')?.value;

    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await jwtVerify(session, encodedKey, {
        algorithms: ['HS256'],
      });
      return NextResponse.next();
    } catch (error) {
      // Invalid token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

