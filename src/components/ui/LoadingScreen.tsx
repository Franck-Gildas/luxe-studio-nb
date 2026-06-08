'use client'
import { useLayoutEffect, useRef, useState } from 'react'

function finishIntro() {
  document.documentElement.classList.remove('luxe-intro-pending')
  sessionStorage.setItem('luxe-loaded', '1')
}

export default function LoadingScreen() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const [fading, setFading] = useState(false)

  useLayoutEffect(() => {
    const el = overlayRef.current
    if (!document.documentElement.classList.contains('luxe-intro-pending') || !el) {
      return
    }

    el.style.display = 'flex'

    const fadeTimer = window.setTimeout(() => {
      setFading(true)
    }, 1600)

    const hideTimer = window.setTimeout(() => {
      finishIntro()
      el.style.display = 'none'
    }, 2200)

    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  return (
    <div
      ref={overlayRef}
      style={{
        display: 'none',
        position: 'fixed',
        inset: 0,
        background: 'var(--obsidian)',
        zIndex: 10000,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1)',
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
      }}>
        <div className="loading-dot" />
        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: '11px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--brass)',
          opacity: 0.6,
        }}>
          Luxe Studio NB
        </p>
      </div>
    </div>
  )
}
