// lib/auth.ts
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-production'
)

const ADMIN_EMAIL    = process.env.ADMIN_EMAIL    || ''
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || ''
const COOKIE_NAME    = 'cms_auth'

// Constant-time string comparison to prevent timing attacks
function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    // Still do the comparison to maintain constant time
    let diff = 0
    for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ (b.charCodeAt(i % b.length) || 0)
    return false
  }
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function signIn(email: string, password: string): Promise<boolean> {
  // Validate env vars are set
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('ADMIN_EMAIL or ADMIN_PASSWORD not set in environment variables')
    return false
  }

  // Constant-time comparison to prevent timing attacks
  const emailOk    = safeCompare(email, ADMIN_EMAIL)
  const passwordOk = safeCompare(password, ADMIN_PASSWORD)

  if (!emailOk || !passwordOk) return false

  const token = await new SignJWT({ email, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,                                      // Not accessible via JS
    secure: process.env.NODE_ENV === 'production',       // HTTPS only in prod
    sameSite: 'lax',                                     // CSRF protection
    maxAge: 60 * 60 * 24 * 7,                           // 7 days
    path: '/',
  })

  return true
}

export async function signOut() {
  cookies().set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })
  redirect('/admin/login')
}

export async function getSession() {
  try {
    const token = cookies().get(COOKIE_NAME)?.value
    if (!token) return null
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch {
    return null
  }
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) redirect('/admin/login')
  return session
}
