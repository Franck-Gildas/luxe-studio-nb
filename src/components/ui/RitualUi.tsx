type CopyRitualSpineProps = {
  index: string
  treatmentCount: number
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
