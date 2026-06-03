export const AUTH_KEY = 'luxe-admin-auth'

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem(AUTH_KEY) === 'true'
}

export function login(): void {
  sessionStorage.setItem(AUTH_KEY, 'true')
}

export function logout(): void {
  sessionStorage.removeItem(AUTH_KEY)
}

export function checkPassword(password: string): boolean {
  const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? ''
  return password === expected && expected.length > 0
}
