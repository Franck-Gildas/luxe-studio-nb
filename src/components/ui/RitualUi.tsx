import type { ReactNode } from 'react'

type CopyRitualSpineProps = {
  index: string
  treatmentCount: number
}

export function MenuRitualSpine() {
  return (
    <div className="menu-ritual-spine" aria-hidden="true">
      <div className="menu-ritual-track-wrap">
        <div className="menu-ritual-track">
          <div className="menu-ritual-fill" />
          <div className="menu-ritual-marker" />
          <div className="menu-ritual-glow" />
        </div>
      </div>
    </div>
  )
}

type ServiceMenuScrollProps = {
  children: ReactNode
}

/** Menu column with scroll-synced ritual spine beside the service list. */
export function ServiceMenuScroll({ children }: ServiceMenuScrollProps) {
  return (
    <div className="service-menu-scroll">
      <MenuRitualSpine />
      <div className="service-menu-body">{children}</div>
    </div>
  )
}

export function CopyRitualSpine({ index, treatmentCount }: CopyRitualSpineProps) {
  return (
    <div className="copy-ritual-spine" aria-hidden="true">
      <span className="copy-ritual-watermark">{index}</span>
      <div className="copy-ritual-meta">
        <span className="copy-ritual-index">◇ {index}</span>
        <span className="copy-ritual-label">
          <span className="en-only">{treatmentCount} treatments</span>
          <span className="fr-block">{treatmentCount} soins</span>
        </span>
      </div>
      <div className="copy-ritual-track-wrap">
        <div className="copy-ritual-track">
          <div className="copy-ritual-fill" />
          <div className="copy-ritual-marker" />
          <div className="copy-ritual-glow" />
        </div>
      </div>
    </div>
  )
}
