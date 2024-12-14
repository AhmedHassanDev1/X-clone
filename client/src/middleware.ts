import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  let token = request.cookies.get('access_token')?.value


  if (token) {
    if (request.nextUrl.pathname === '/') return NextResponse.redirect(new URL('/home', request.url))
    return NextResponse.next();
  }
  
  if (!token) {
    if (request.nextUrl.pathname !== '/') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}


export const config = {
  matcher: ['/profile/:path*', '/home', '/bookmarks', '/notifications', '/messages', '/explore', '/'],
}