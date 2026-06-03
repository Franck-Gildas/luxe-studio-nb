import type { SelectHTMLAttributes } from 'react'
import { IconChevronDown } from '@/components/admin/AdminIcons'

type AdminSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  variant?: 'filter' | 'status' | 'modal'
}

export function AdminSelect({
  variant = 'filter',
  className = '',
  children,
  ...props
}: AdminSelectProps) {
  return (
    <div className={`admin-select-wrap admin-select-wrap--${variant}`}>
      <select
        className={`admin-select admin-select--${variant} ${className}`.trim()}
        {...props}
      >
        {children}
      </select>
      <span className="admin-select-chevron" aria-hidden>
        <IconChevronDown size={14} />
      </span>
    </div>
  )
}
