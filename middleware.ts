import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Maintenance mode check is now handled in layout/page level
  // Middleware only handles admin route protection

  // Admin route protection
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Redirect from /admin/login if already logged in
  if (path === '/admin/login') {
    const token = request.cookies.get('admin-token')?.value
    
    if (token) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

