import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Check if the path starts with /home
  if (path.startsWith('/home')) {
    // Get the token from cookies (since middleware runs on server)
    const token = request.cookies.get('authToken')?.value

    // If no token is found, redirect to login
    if (!token) {
      const loginUrl = new URL('/auth/signin', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Check if user is trying to access login page while already authenticated
  if (path === '/auth/signin' || path === '/auth/signup') {
    const token = request.cookies.get('authToken')?.value

    // If token exists, redirect to dashboard
    if (token) {
      const dashboardUrl = new URL('/home/dashboard', request.url)
      return NextResponse.redirect(dashboardUrl)
    }
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
