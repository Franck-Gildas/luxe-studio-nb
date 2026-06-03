import type { ReactNode } from 'react'

type Props = {
  href: string
  label: string
  children: ReactNode
  variant?: 'compact' | 'action'
}

export function AdminIconButton({ href, label, children, variant = 'compact' }: Props) {
  return (
    <a
      className={`admin-icon-btn admin-icon-btn--${variant}`}
      href={href}
      title={label}
      aria-label={label}
    >
      {children}
    </a>
  )
}
