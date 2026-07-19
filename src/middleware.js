import { NextResponse } from 'next/server';

const defaultLocale = 'id';
const locales = ['id', 'en', 'ms', 'zh'];

export function middleware(request) {
  // Check if there is any supported locale in the pathname
  const { pathname, hostname } = request.nextUrl;
  
  // Exclude static files, api, _next, and admin
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') || 
    pathname === '/sw.js'
  ) {
    return NextResponse.next();
  }

  // Admin Dashboard Protection
  if (pathname.startsWith('/admin/dashboard')) {
    const token = request.cookies.get('admin_token');
    if (!token) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Cek cookie NEXT_LOCALE, atau fallback ke id
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  const preferredLocale = locales.includes(localeCookie) ? localeCookie : defaultLocale;

  // Redirect if there is no locale
  request.nextUrl.pathname = `/${preferredLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
  ],
};
