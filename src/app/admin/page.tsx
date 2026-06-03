'use client'

import { useEffect, useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { checkPassword, isAuthenticated, login } from '@/lib/admin/auth'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/admin/dashboard')
      return
    }
    setReady(true)
  }, [router])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (checkPassword(password)) {
      login()
      router.push('/admin/dashboard')
    } else {
      setError('Incorrect password. Please try again.')
    }
  }

  if (!ready) return null

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <h1 className="admin-login-title">LUXE STUDIO NB · ADMIN</h1>
        <form onSubmit={handleSubmit}>
          <label className="admin-login-label" htmlFor="admin-password">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            className="admin-login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            autoFocus
          />
          <button type="submit" className="admin-login-btn">
            Enter the Atelier
          </button>
          {error && (
            <p className="admin-login-error" role="alert">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
