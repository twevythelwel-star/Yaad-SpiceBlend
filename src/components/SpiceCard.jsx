// COMPONENT 3: SpiceCard (the reusable workhorse)
// Rendered once per spice. Receives all data + state through PROPS and
// communicates back up through EVENT CALLBACKS — the core of the
// component-based architecture: data down, events up.
function HeatPips({ heat }) {
  // Show 5 pips; light them based on the spice's heat weight.
  const lit = Math.min(5, Math.round(heat / 2))
  return (
    <div className="heat-pips" aria-label={`Heat level ${lit} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={'pip' + (i < lit ? (heat >= 8 ? ' hot' : ' on') : '')}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export default function SpiceCard({ spice, selected, qty, onToggle, onQty }) {
  return (
    <article className={'card' + (selected ? ' selected' : '')}>
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
          className={'toggle' + (selected ? ' added' : '')}
          onClick={() => onToggle(spice.id)}
          aria-pressed={selected}
        >
          {selected ? 'Remove' : 'Add'}
        </button>
      </div>
    </article>
  )
}
