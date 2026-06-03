import type { Metadata, Viewport } from 'next'
import '@/styles/admin.css'

export const metadata: Metadata = {
  title: 'Admin',
  robots: 'noindex, nofollow',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
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
