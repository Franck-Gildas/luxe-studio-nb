'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MARKER_HEIGHT = 28

function getCopyMarkerY(trackWrap: HTMLElement, item: HTMLElement) {
  const wrapRect = trackWrap.getBoundingClientRect()
  const itemRect = item.getBoundingClientRect()
  const itemCenter = itemRect.top + itemRect.height / 2 - wrapRect.top
  return Math.max(0, itemCenter - MARKER_HEIGHT / 2)
}

export default function ServiceHighlighter() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) return

    const sections = document.querySelectorAll<HTMLElement>('.cat')

    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        const list = section.querySelector<HTMLElement>('.service-list')
        const copySpine = section.querySelector<HTMLElement>('.copy-ritual-spine')
        const copyFill = section.querySelector<HTMLElement>('.copy-ritual-fill')
        const copyGlow = section.querySelector<HTMLElement>('.copy-ritual-glow')
        const copyMarker = section.querySelector<HTMLElement>(
          '.copy-ritual-marker'
        )
        const copyTrack = section.querySelector<HTMLElement>('.copy-ritual-track')
        const copyTrackWrap = section.querySelector<HTMLElement>(
          '.copy-ritual-track-wrap'
        )
        const items = list?.querySelectorAll<HTMLElement>('.service-item') ?? []

        if (copySpine && copyFill && copyTrack && copyTrackWrap) {
          gsap.set(copySpine, { opacity: 0 })
          gsap.set(copyFill, { height: 0 })
          if (copyGlow) gsap.set(copyGlow, { opacity: 0, top: 0 })
          if (copyMarker) gsap.set(copyMarker, { opacity: 0, top: 0 })

          ScrollTrigger.create({
            trigger: section,
            start: 'top 78%',
            end: 'bottom 22%',
            scrub: 1.2,
            onEnter: () => {
              gsap.to(copySpine, {
                opacity: 1,
                duration: 0.65,
                ease: 'power2.out',
              })
            },
            onLeave: () => {
              gsap.to(copySpine, { opacity: 0, duration: 0.4 })
              if (copyMarker) gsap.to(copyMarker, { opacity: 0, duration: 0.3 })
            },
            onEnterBack: () => {
              gsap.to(copySpine, {
                opacity: 1,
                duration: 0.65,
                ease: 'power2.out',
              })
            },
            onLeaveBack: () => {
              gsap.to(copySpine, { opacity: 0, duration: 0.4 })
            },
          })
        }

        if (items.length > 0 && copyTrackWrap && copyMarker) {
          const activate = (item: HTMLElement) => {
            const markerY = getCopyMarkerY(copyTrackWrap, item)
            const wrapRect = copyTrackWrap.getBoundingClientRect()
            const itemRect = item.getBoundingClientRect()
            const fillTo = Math.max(
              0,
              itemRect.top + itemRect.height / 2 - wrapRect.top
            )

            gsap.to(copyMarker, {
              opacity: 1,
              top: markerY,
              duration: 0.55,
              ease: 'power2.out',
            })

            gsap.to(copyFill, {
              height: fillTo,
              duration: 0.55,
              ease: 'power2.out',
            })

            if (copyGlow) {
              gsap.to(copyGlow, {
                opacity: 0.9,
                top: Math.max(0, fillTo - 3),
                duration: 0.55,
                ease: 'power2.out',
              })
            }

            items.forEach((el) => el.classList.remove('active'))
            item.classList.add('active')
          }

          items.forEach((item) => {
            ScrollTrigger.create({
              trigger: item,
              start: 'top 55%',
              end: 'bottom 55%',
              onEnter: () => activate(item),
              onEnterBack: () => activate(item),
            })
          })
        } else if (items.length > 0) {
          items.forEach((item) => {
            ScrollTrigger.create({
              trigger: item,
              start: 'top 55%',
              end: 'bottom 55%',
              onEnter: () => {
                items.forEach((el) => el.classList.remove('active'))
                item.classList.add('active')
              },
              onEnterBack: () => {
                items.forEach((el) => el.classList.remove('active'))
                item.classList.add('active')
              },
            })
          })
        }
      })
    })

    const refresh = () => requestAnimationFrame(() => ScrollTrigger.refresh())
    refresh()
    const t1 = window.setTimeout(refresh, 400)
    const t2 = window.setTimeout(refresh, 1200)
    window.addEventListener('load', refresh)

    const onResize = () => {
      refresh()
      sections.forEach((section) => {
        const active = section.querySelector<HTMLElement>('.service-item.active')
        const copyTrackWrap = section.querySelector<HTMLElement>(
          '.copy-ritual-track-wrap'
        )
        const copyMarker = section.querySelector<HTMLElement>(
          '.copy-ritual-marker'
        )
        const copyFill = section.querySelector<HTMLElement>('.copy-ritual-fill')
        if (!active || !copyTrackWrap || !copyMarker || !copyFill) return
        gsap.set(copyMarker, { top: getCopyMarkerY(copyTrackWrap, active) })
        const wrapRect = copyTrackWrap.getBoundingClientRect()
        const itemRect = active.getBoundingClientRect()
        gsap.set(copyFill, {
          height: Math.max(
            0,
            itemRect.top + itemRect.height / 2 - wrapRect.top
          ),
        })
      })
    }
    window.addEventListener('resize', onResize)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      window.removeEventListener('load', refresh)
      window.removeEventListener('resize', onResize)
      ctx.revert()
    }
  }, [])

  return null
}
