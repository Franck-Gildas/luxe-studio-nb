'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SectionProgress() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) return

    const sections = document.querySelectorAll<HTMLElement>('.cat')

    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        const progress = section.querySelector<HTMLElement>('.section-progress')
        if (!progress) return

        gsap.set(progress, { height: '0%', opacity: 0 })

        ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
          onUpdate: (self) => {
            gsap.set(progress, { height: `${self.progress * 100}%` })
          },
          onEnter: () => {
            gsap.to(progress, {
              opacity: 1,
              duration: 0.4,
              ease: 'power2.out',
            })
          },
          onLeave: () => {
            gsap.to(progress, { opacity: 0, duration: 0.4 })
          },
          onEnterBack: () => {
            gsap.to(progress, {
              opacity: 1,
              duration: 0.4,
              ease: 'power2.out',
            })
          },
          onLeaveBack: () => {
            gsap.to(progress, { opacity: 0, duration: 0.4 })
          },
        })
      })
    })

    const refresh = () => requestAnimationFrame(() => ScrollTrigger.refresh())
    refresh()
    const t1 = window.setTimeout(refresh, 400)
    const t2 = window.setTimeout(refresh, 1200)
    window.addEventListener('load', refresh)
    window.addEventListener('resize', refresh)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      window.removeEventListener('load', refresh)
      window.removeEventListener('resize', refresh)
      ctx.revert()
    }
  }, [])

  return null
}
