'use client'
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem('luxe-loaded')
    if (seen) return
    
    setVisible(true)
    
    const fadeTimer = setTimeout(() => {
      setFading(true)
    }, 1600)
    
    const hideTimer = setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem('luxe-loaded', '1')
    }, 2200)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'var(--obsidian)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: fading ? 0 : 1,
      transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1)',
      pointerEvents: fading ? 'none' : 'all',
    }}>
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
