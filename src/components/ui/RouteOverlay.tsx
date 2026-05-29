'use client'
import { useLayoutEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

const HOLD_MS = 180
const FADE_MS = 400

export default function RouteOverlay() {
  const pathname = usePathname()
  const [opacity, setOpacity] = useState(0)
  const [animate, setAnimate] = useState(false)
  const isFirst = useRef(true)

  useLayoutEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }

    setAnimate(false)
    setOpacity(1)

    const holdTimer = setTimeout(() => {
      setAnimate(true)
      setOpacity(0)
    }, HOLD_MS)

    return () => clearTimeout(holdTimer)
  }, [pathname])

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--obsidian)',
        zIndex: 500,
        pointerEvents: 'none',
        opacity,
        transition: animate
          ? `opacity ${FADE_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`
          : 'none',
      }}
    />
  )
}
