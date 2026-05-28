import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pull Up a Chair · Approchez-vous',
}

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
