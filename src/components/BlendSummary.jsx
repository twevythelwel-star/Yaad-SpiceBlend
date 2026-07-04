import { useState, useEffect } from 'react'
import HeatMeter from './HeatMeter.jsx'
import { heatLabel, blendPersonality } from '../data/spices.js'

// COMPONENT 5: BlendSummary
// Composes the HeatMeter and reacts to the lifted blend state. Shows the
// live line items, total, and the order flow. Demonstrates a parent
// component (App) feeding derived data into nested children.
export default function BlendSummary({ items, onOrder, ordered }) {
  const [formOpen, setFormOpen] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [method, setMethod] = useState('pickup')

  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  const heat = items.reduce((s, i) => s + i.heat * i.qty, 0)
  const personality = blendPersonality(items)
  const empty = items.length === 0

  // If the blend empties out while the form is open (e.g. the user removes
  // the last spice mid-fill-in), close it — an empty blend can't be ordered.
  useEffect(() => {
    if (empty) setFormOpen(false)
  }, [empty])

  function submitOrder(e) {
    e.preventDefault()
    onOrder()
    setFormOpen(false)
    setName('')
    setPhone('')
    setMethod('pickup')
  }

  return (
    <aside className="summary" aria-live="polite">
      <h3>Your blend</h3>
      <p className="personality">{personality ? `“${personality}”` : 'Unnamed so far'}</p>

      <HeatMeter score={heat} label={heatLabel(heat)} />

      {empty ? (
        <p className="empty">Pick at least one spice to start your blend.</p>
      ) : (
        <ul className="lines">
          {items.map((i) => (
            <li key={i.id}>
              <span>
                <b>{i.name}</b> ×{i.qty}
              </span>
              <span className="ln-price">JMD {i.price * i.qty}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="total">
        <span>Total</span>
        <b>JMD {total}</b>
      </div>

      {formOpen && !empty ? (
        <form className="order-form" onSubmit={submitOrder}>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Phone
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
          <fieldset className="method">
            <legend>Delivery or pickup?</legend>
            <label>
              <input
                type="radio"
                name="method"
                checked={method === 'pickup'}
                onChange={() => setMethod('pickup')}
              />
              Pickup
            </label>
            <label>
              <input
                type="radio"
                name="method"
                checked={method === 'delivery'}
                onChange={() => setMethod('delivery')}
              />
              Delivery
            </label>
          </fieldset>
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => setFormOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="order-btn">
              Place order
            </button>
          </div>
        </form>
      ) : ordered ? (
        <p className="toast">Your order is complete — you’ll get an update once it ships.</p>
      ) : (
        <button className="order-btn" onClick={() => setFormOpen(true)} disabled={empty}>
          {empty ? 'Add a spice first' : 'Add blend to order'}
        </button>
      )}
    </aside>
  )
}
