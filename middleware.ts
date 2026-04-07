import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-production'
)

// Public API routes yang tidak butuh auth
const PUBLIC_API = ['/api/auth', '/api/settings/public']

const loginAttempts = new Map<string, { count: number; resetAt: number }>()
function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000
  const maxAttempts = 10
  const record = loginAttempts.get(ip)
  if (!record || now > record.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + windowMs })
    return false
  }
  if (record.count >= maxAttempts) return true
  record.count++
  return false
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1'

  // Pass pathname ke layout via header (untuk detect admin route)
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  // Rate limit login
  if (pathname === '/api/auth' && request.method === 'POST') {
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Terlalu banyak percobaan. Coba lagi dalam 15 menit.' },
        { status: 429 }
      )
    }
  }

  // Protect API routes (kecuali yang public)
  if (pathname.startsWith('/api/') && !PUBLIC_API.some(p => pathname.startsWith(p))) {
    const token = request.cookies.get('cms_auth')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    try {
      await jwtVerify(token, JWT_SECRET)
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
  }

  // Protect /admin (kecuali login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('cms_auth')?.value
    if (!token) return NextResponse.redirect(new URL('/admin/login', request.url))
    try {
      await jwtVerify(token, JWT_SECRET)
    } catch {
      const res = NextResponse.redirect(new URL('/admin/login', request.url))
      res.cookies.delete('cms_auth')
      return res
    }
  }

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|fonts|robots.txt).*)'],
}
