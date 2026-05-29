'use client'
import { useLayoutEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const HOLD_MS = 180
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

export default function PageTransition({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)
  const isFirst = useRef(true)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    if (isFirst.current) {
      isFirst.current = false
      el.style.transition = 'none'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
      return
    }

    el.style.transition = 'none'
    el.style.opacity = '0'
    el.style.transform = 'translateY(12px)'

    const timer = setTimeout(() => {
      el.style.transition = `opacity 0.7s ${EASE}, transform 0.7s ${EASE}`
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }, HOLD_MS)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div ref={ref} style={{ willChange: 'opacity, transform' }}>
      {children}
    </div>
  )
}
