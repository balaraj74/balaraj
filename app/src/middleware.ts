import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = (request.headers.get('host') || '').toLowerCase();

  // Redirect www.balaraj.me or balaraj.vercel.app directly to canonical domain balaraj.me
  if (host === 'www.balaraj.me' || host === 'balaraj.vercel.app') {
    const url = request.nextUrl.clone();
    url.protocol = 'https';
    url.host = 'balaraj.me';
    url.port = '';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, icon.png, apple-icon.png, robots.txt, sitemap.xml
     */
    '/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|robots.txt|sitemap.xml).*)',
  ],
};
