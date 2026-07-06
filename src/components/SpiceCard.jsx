const PIP_COUNT = 5
const PIP_INDEXES = [0, 1, 2, 3, 4]

// Works out the CSS class for a single pip based on how many pips are lit
// and whether this spice is hot enough to use the "hot" color.
function pipClass(index, litCount, heat) {
  if (index >= litCount) return 'pip'
  if (heat >= 8) return 'pip hot'
  return 'pip on'
}

// Rendered once per spice; receives data via props and reports back via callbacks.
function HeatPips({ heat }) {
  // Show 5 pips; light them based on the spice's heat weight.
  const litCount = Math.min(PIP_COUNT, Math.round(heat / 2))
  return (
    <div className="heat-pips" aria-label={`Heat level ${litCount} of 5`}>
      {PIP_INDEXES.map((index) => (
        <span key={index} className={pipClass(index, litCount, heat)} aria-hidden="true" />
      ))}
    </div>
  )
}

function cardClass(selected) {
  return selected ? 'card selected' : 'card'
}

function toggleClass(selected) {
  return selected ? 'toggle added' : 'toggle'
}

export default function SpiceCard({ spice, selected, qty, onToggle, onQty }) {
  return (
    <article className={cardClass(selected)}>
      <div className="card-top">
        <h3 className="card-name">{spice.name}</h3>
        <HeatPips heat={spice.heat} />
      </div>
      <p className="card-note">{spice.note}</p>

      <div className="card-bottom">
        <span className="price">JMD {spice.price}/scoop</span>

        {selected ? (
          <div className="qty" aria-label={`Quantity of ${spice.name}`}>
            <button onClick={() => onQty(spice.id, -1)} aria-label={`Less ${spice.name}`}>
              −
            </button>
            <span>{qty}</span>
            <button onClick={() => onQty(spice.id, 1)} aria-label={`More ${spice.name}`}>
              +
            </button>
          </div>
        ) : null}

        <button
          className={toggleClass(selected)}
          onClick={() => onToggle(spice.id)}
          aria-pressed={selected}
        >
          {selected ? 'Remove' : 'Add'}
        </button>
      </div>
    </article>
  )
}
