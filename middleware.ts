import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-production'
)

// Simple in-memory rate limiter for login attempts
// For production, use Redis/Upstash
const loginAttempts = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
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
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 
             '127.0.0.1'

  // ── Rate limit login endpoint ────────────────────────────
  if (pathname === '/api/auth' && request.method === 'POST') {
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Terlalu banyak percobaan. Coba lagi dalam 15 menit.' },
        { status: 429 }
      )
    }
  }

  // ── Block direct access to API routes without auth ───────
  if (pathname.startsWith('/api/') && pathname !== '/api/auth') {
    const token = request.cookies.get('cms_auth')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    try {
      await jwtVerify(token, JWT_SECRET)
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
  }

  // ── Protect /admin routes (except login) ─────────────────
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('cms_auth')?.value
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    try {
      await jwtVerify(token, JWT_SECRET)
    } catch {
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.delete('cms_auth')
      return response
    }
  }

  // ── Security: block sensitive file access ─────────────────
  const blockedPaths = ['/.env', '/.git', '/wrangler.toml', '/package.json']
  if (blockedPaths.some(p => pathname === p)) {
    return new NextResponse(null, { status: 404 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*',
    '/.env',
    '/.git/:path*',
  ],
}
