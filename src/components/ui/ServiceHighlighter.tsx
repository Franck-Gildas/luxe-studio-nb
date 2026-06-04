'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MARKER_HEIGHT = 28
const TRIGGER_LINE = 0.55

function getSpinePositions(index: number, total: number, trackHeight: number) {
  if (total <= 0 || trackHeight <= 0) {
    return { markerY: 0, fillTo: 0 }
  }
  const t = (index + 0.5) / total
  const fillTo = t * trackHeight
  const markerY = Math.min(
    Math.max(0, fillTo - MARKER_HEIGHT / 2),
    Math.max(0, trackHeight - MARKER_HEIGHT)
  )
  return { markerY, fillTo }
}

function progressToMarker(fillTo: number, trackH: number) {
  const markerY = Math.min(
    Math.max(0, fillTo - MARKER_HEIGHT / 2),
    Math.max(0, trackH - MARKER_HEIGHT)
  )
  return { markerY, fillTo }
}

/**
 * Smooth 0→1 progress: reading line travels from first treatment center to last.
 * Monotonic while scrolling — no discrete item jumping.
 */
function getSmoothMenuProgress(items: HTMLElement[]) {
  if (items.length === 0) {
    return { t: 0, markerY: 0, fillTo: 0 }
  }

  if (items.length === 1) {
    return { t: 1, markerY: 0, fillTo: 0 }
  }

  const line = window.innerHeight * TRIGGER_LINE
  const first = items[0].getBoundingClientRect()
  const last = items[items.length - 1].getBoundingClientRect()
  const start = first.top + first.height / 2
  const end = last.top + last.height / 2
  const span = end - start

  const t = span <= 0 ? 1 : Math.min(1, Math.max(0, (line - start) / span))

  return { t, markerY: 0, fillTo: 0 }
}

function itemIndexForProgress(t: number, count: number) {
  if (count <= 1) return 0
  return Math.min(count - 1, Math.max(0, Math.floor(t * count)))
}

function syncMenuTrackHeights() {
  document.querySelectorAll<HTMLElement>('.service-menu-scroll').forEach((wrap) => {
    const list = wrap.querySelector<HTMLElement>('.service-list')
    const trackWrap = wrap.querySelector<HTMLElement>('.menu-ritual-track-wrap')
    if (list && trackWrap) {
      trackWrap.style.height = `${list.offsetHeight}px`
    }
  })
}

type SpineElements = {
  spine: HTMLElement
  fill: HTMLElement
  marker: HTMLElement
  glow: HTMLElement | null
  trackWrap: HTMLElement
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
        const items = Array.from(
          list?.querySelectorAll<HTMLElement>('.service-item') ?? []
        )

        const copy: SpineElements | null =
          section.querySelector('.copy-ritual-spine') &&
          section.querySelector('.copy-ritual-fill') &&
          section.querySelector('.copy-ritual-marker') &&
          section.querySelector('.copy-ritual-track-wrap')
            ? {
                spine: section.querySelector('.copy-ritual-spine')!,
                fill: section.querySelector('.copy-ritual-fill')!,
                marker: section.querySelector('.copy-ritual-marker')!,
                glow: section.querySelector('.copy-ritual-glow'),
                trackWrap: section.querySelector('.copy-ritual-track-wrap')!,
              }
            : null

        const menu: SpineElements | null =
          section.querySelector('.menu-ritual-spine') &&
          section.querySelector('.menu-ritual-fill') &&
          section.querySelector('.menu-ritual-marker') &&
          section.querySelector('.menu-ritual-track-wrap')
            ? {
                spine: section.querySelector('.menu-ritual-spine')!,
                fill: section.querySelector('.menu-ritual-fill')!,
                marker: section.querySelector('.menu-ritual-marker')!,
                glow: section.querySelector('.menu-ritual-glow'),
                trackWrap: section.querySelector('.menu-ritual-track-wrap')!,
              }
            : null

        const menuQuick = menu
          ? {
              fill: gsap.quickTo(menu.fill, 'height', {
                duration: 0.12,
                ease: 'power2.out',
              }),
              marker: gsap.quickTo(menu.marker, 'top', {
                duration: 0.12,
                ease: 'power2.out',
              }),
              glow: menu.glow
                ? gsap.quickTo(menu.glow, 'top', {
                    duration: 0.12,
                    ease: 'power2.out',
                  })
                : null,
            }
          : null

        const setActiveItem = (index: number) => {
          items.forEach((el, i) => {
            el.classList.toggle('active', i === index)
          })
        }

        const applyCopyForIndex = (index: number) => {
          if (!copy || items.length === 0) return
          const { markerY, fillTo } = getSpinePositions(
            index,
            items.length,
            copy.trackWrap.offsetHeight
          )
          gsap.set(copy.marker, { opacity: 1, top: markerY })
          gsap.set(copy.fill, { height: fillTo })
          if (copy.glow) {
            gsap.set(copy.glow, { opacity: 0.9, top: Math.max(0, fillTo - 3) })
          }
        }

        const updateFromScroll = () => {
          if (items.length === 0) return

          const { t } = getSmoothMenuProgress(items)
          const index = itemIndexForProgress(t, items.length)
          setActiveItem(index)
          applyCopyForIndex(index)

          if (!menu || !menuQuick) return

          const trackH = menu.trackWrap.offsetHeight
          if (trackH <= 0) return

          const { markerY, fillTo } = progressToMarker(t * trackH, trackH)
          gsap.set(menu.marker, { opacity: 1 })
          menuQuick.fill(fillTo)
          menuQuick.marker(markerY)
          if (menuQuick.glow && menu.glow) {
            gsap.set(menu.glow, { opacity: 0.9 })
            menuQuick.glow(Math.max(0, fillTo - 3))
          }
        }

        const initSpine = (spine: SpineElements) => {
          gsap.set(spine.fill, { height: 0 })
          gsap.set(spine.marker, { opacity: 0, top: 0 })
          if (spine.glow) gsap.set(spine.glow, { opacity: 0, top: 0 })
        }

        if (copy) {
          gsap.set(copy.spine, { opacity: 0 })
          initSpine(copy)
        }

        if (menu) {
          gsap.set(menu.spine, { opacity: 1 })
          initSpine(menu)
        }

        const showSectionSpines = () => {
          if (copy) {
            gsap.to(copy.spine, { opacity: 1, duration: 0.65, ease: 'power2.out' })
          }
          updateFromScroll()
        }

        const hideCopySpine = () => {
          if (!copy) return
          gsap.to(copy.spine, { opacity: 0, duration: 0.4 })
          gsap.to(copy.marker, { opacity: 0, duration: 0.3 })
        }

        if (copy || menu) {
          ScrollTrigger.create({
            trigger: section,
            start: 'top 78%',
            end: 'bottom 22%',
            onEnter: showSectionSpines,
            onEnterBack: showSectionSpines,
            onLeave: hideCopySpine,
            onLeaveBack: hideCopySpine,
          })
        }

        if (items.length > 0 && list) {
          ScrollTrigger.create({
            trigger: list,
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: updateFromScroll,
          })

          ScrollTrigger.create({
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: updateFromScroll,
          })
        }
      })
    })

    const refresh = () => {
      syncMenuTrackHeights()
      requestAnimationFrame(() => ScrollTrigger.refresh())
    }
    refresh()
    const t1 = window.setTimeout(refresh, 400)
    const t2 = window.setTimeout(refresh, 1200)
    window.addEventListener('load', refresh)

    const onResize = () => {
      refresh()
      sections.forEach((section) => {
        const items = Array.from(
          section.querySelectorAll<HTMLElement>('.service-item')
        )
        if (items.length === 0) return

        const { t } = getSmoothMenuProgress(items)
        const index = itemIndexForProgress(t, items.length)

        const copyTrackWrap = section.querySelector<HTMLElement>(
          '.copy-ritual-track-wrap'
        )
        const copyMarker = section.querySelector<HTMLElement>('.copy-ritual-marker')
        const copyFill = section.querySelector<HTMLElement>('.copy-ritual-fill')
        const copyGlow = section.querySelector<HTMLElement>('.copy-ritual-glow')
        const menuTrackWrap = section.querySelector<HTMLElement>(
          '.menu-ritual-track-wrap'
        )
        const menuMarker = section.querySelector<HTMLElement>('.menu-ritual-marker')
        const menuFill = section.querySelector<HTMLElement>('.menu-ritual-fill')
        const menuGlow = section.querySelector<HTMLElement>('.menu-ritual-glow')

        items.forEach((el, i) => el.classList.toggle('active', i === index))

        if (copyTrackWrap && copyMarker && copyFill) {
          const { markerY, fillTo } = getSpinePositions(
            index,
            items.length,
            copyTrackWrap.offsetHeight
          )
          gsap.set(copyMarker, { opacity: 1, top: markerY })
          gsap.set(copyFill, { height: fillTo })
          if (copyGlow) {
            gsap.set(copyGlow, { opacity: 0.9, top: Math.max(0, fillTo - 3) })
          }
        }

        if (menuTrackWrap && menuMarker && menuFill) {
          const trackH = menuTrackWrap.offsetHeight
          const { markerY, fillTo } = progressToMarker(t * trackH, trackH)
          gsap.set(menuMarker, { opacity: 1, top: markerY })
          gsap.set(menuFill, { height: fillTo })
          if (menuGlow) {
            gsap.set(menuGlow, { opacity: 0.9, top: Math.max(0, fillTo - 3) })
          }
        }
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
