import type { Metadata } from 'next'
import '@/styles/admin.css'

export const metadata: Metadata = {
  title: 'Admin',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="admin-root">
      <div className="grain" aria-hidden="true" />
      {children}
    </div>
  )
}
