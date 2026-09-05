import { NextResponse } from 'next/server';

const defaultLocale = 'id';
const locales = ['id', 'en', 'ms', 'zh'];
const nonDefaultLocales = ['en', 'ms', 'zh'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Exclude static files, api, _next, favicon, and service worker
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

  // 1. Single-Hop Apex Collapse: If request hits apex domain directly, collapse to www in 1 hop
  const host = request.headers.get('host') || '';
  const isApex = host === 'visitbanjarmasin.id';
  if (isApex) {
    let cleanPath = pathname;
    if (cleanPath === '/id' || cleanPath === '/id/') {
      cleanPath = '/';
    } else if (cleanPath.startsWith('/id/')) {
      cleanPath = cleanPath.replace(/^\/id/, '') || '/';
    }
    const targetUrl = new URL(cleanPath + request.nextUrl.search, 'https://www.visitbanjarmasin.id');
    return NextResponse.redirect(targetUrl, 308);
  }

  // 2. Redirect /id or /id/* to clean URL without /id prefix on primary domain
  if (pathname === '/id' || pathname === '/id/') {
    return NextResponse.redirect(new URL('/', request.url), 308);
  }
  if (pathname.startsWith('/id/')) {
    const cleanPath = pathname.replace(/^\/id/, '') || '/';
    return NextResponse.redirect(new URL(cleanPath, request.url), 308);
  }

  // 2. Allow non-default locales (/en, /ms, /zh)
  const pathnameHasNonDefaultLocale = nonDefaultLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasNonDefaultLocale) {
    return NextResponse.next();
  }

  // 3. Unprefixed URLs -> Internally rewrite to /id route handler
  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = `/id${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
  ],
};
