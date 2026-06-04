import type { ReactNode } from 'react'

type IconProps = {
  className?: string
  size?: number
}

type IconBaseProps = IconProps & {
  children: ReactNode
  viewBox?: string
}

function IconBase({
  className,
  size = 18,
  children,
  viewBox = '0 0 24 24',
}: IconBaseProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {children}
    </svg>
  )
}

export function IconPhone({ className, size = 18 }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <path
        d="M5.5 4h3l1.2 4.5-2.2 1.2a13 13 0 006 6l1.2-2.2L19 14.5V17.5a1 1 0 01-1 1C10.2 18.5 5.5 13.8 4.5 6a1 1 0 011-2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  )
}

export function IconMail({ className, size = 18 }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <path
        d="M4 7.5A2.5 2.5 0 016.5 5h11A2.5 2.5 0 0120 7.5v9A2.5 2.5 0 0117.5 19h-11A2.5 2.5 0 014 16.5v-9z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M5 8l7 5 7-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  )
}

export function IconMessage({ className, size = 18 }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <path
        d="M5 6.5A2.5 2.5 0 017.5 4h9A2.5 2.5 0 0119 6.5v7A2.5 2.5 0 0116.5 16H9l-4 3v-3H7.5A2.5 2.5 0 015 13.5v-7z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 9h7M8.5 12h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </IconBase>
  )
}

export function IconChevronDown({ className, size = 16 }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  )
}

export function IconSearch({ className, size = 18 }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M16 16l4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </IconBase>
  )
}

export function IconCalendar({ className, size = 18 }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <path
        d="M6 5.5V4M18 5.5V4M5 9h14M6.5 5.5h11A1.5 1.5 0 0119 7v10.5A1.5 1.5 0 0117.5 19h-11A1.5 1.5 0 015 17.5V7a1.5 1.5 0 011.5-1.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  )
}

export function IconExport({ className, size = 18 }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <path
        d="M12 4v10M8.5 10.5L12 14l3.5-3.5M6 18h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  )
}

export function IconFilter({ className, size = 18 }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <path
        d="M5 7h14M8 12h8M10.5 17h3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </IconBase>
  )
}

export function IconExternal({ className, size = 18 }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <path
        d="M14 5h5v5M10 14l9-9M19 14v5H5V5h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  )
}

export function IconHome({ className, size = 18 }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <path
        d="M5 11.5V19h5v-5h4v5h5v-7.5M5.5 10.5L12 5l6.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  )
}

export function IconRefresh({ className, size = 18 }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <path
        d="M20 12a8 8 0 10-2.3 5.6M20 12V7M20 12h-4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  )
}

export function IconChevronLeft({ className, size = 18 }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <path
        d="M14 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  )
}

export function IconChevronRight({ className, size = 18 }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <path
        d="M10 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  )
}

export function IconBell({ className, size = 18 }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <path
        d="M12 4.5a4 4 0 00-4 4v2.2c0 .6-.2 1.2-.6 1.7L6 14.5h12l-1.4-2.1c-.4-.5-.6-1.1-.6-1.7V8.5a4 4 0 00-4-4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 17a2 2 0 004 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </IconBase>
  )
}
