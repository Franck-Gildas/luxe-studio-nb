'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated } from '@/lib/admin/auth'

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/admin')
      return
    }
    setReady(true)
  }, [router])

  if (!ready) return null

  return <>{children}</>
}
