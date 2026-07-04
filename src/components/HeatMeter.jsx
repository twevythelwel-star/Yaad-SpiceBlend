// COMPONENT 4: HeatMeter (the signature element)
// Pure presentational component: takes a heat score + label and renders
// the ember bar. This is where the brand and the data viz are the same object.
export default function HeatMeter({ score, label }) {
  // Cap the visual fill at a sensible ceiling (30 => full bar).
  const pct = Math.min(100, Math.round((score / 30) * 100))
  // Rough, playful Scoville read-out so the number means something.
  const scoville = score * 1800
  return (
    <div className="heat-block">
      <div className="meter-label">
        <span>Heat</span>
        <b>{label}</b>
      </div>
      <div
        className="meter"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Blend heat level"
      >
        <div className="meter-fill" style={{ width: pct + '%' }} />
      </div>
      <p className="scoville">≈ {scoville.toLocaleString()} SHU on the tongue</p>
    </div>
  )
}
