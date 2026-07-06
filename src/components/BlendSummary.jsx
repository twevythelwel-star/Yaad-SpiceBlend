import { useState, useEffect } from 'react'
import HeatMeter from './HeatMeter.jsx'
import { heatLabel, blendPersonality } from '../data/spices.js'

// A name should just be letters, spaces, hyphens, or apostrophes (e.g. "Mary-Jane O'Brien").
const NAME_PATTERN = /^[A-Za-z' -]{2,60}$/
// A very simple "does this look like an email" check: something@something.something
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Adds up price × quantity for every item in the blend.
function calcTotal(items) {
  let total = 0
  for (const item of items) {
    total += item.price * item.qty
  }
  return total
}

// Adds up heat × quantity for every item in the blend.
function calcHeat(items) {
  let heat = 0
  for (const item of items) {
    heat += item.heat * item.qty
  }
  return heat
}

// Returns an error message for the name field, or '' if it's valid.
function checkName(name) {
  const trimmed = name.trim()
  if (trimmed === '') return 'Name is required.'
  if (!NAME_PATTERN.test(trimmed)) return 'Enter a valid name (letters only).'
  return ''
}

// Returns an error message for the phone field, or '' if it's valid.
function checkPhone(phone) {
  const trimmed = phone.trim()
  if (trimmed === '') return 'Phone number is required.'
  const digitsOnly = phone.replace(/\D/g, '')
  if (digitsOnly.length < 7 || digitsOnly.length > 15) return 'Enter a valid phone number.'
  return ''
}

// Returns an error message for the email field, or '' if it's valid.
function checkEmail(email) {
  const trimmed = email.trim()
  if (trimmed === '') return 'Email is required.'
  if (!EMAIL_PATTERN.test(trimmed)) return 'Enter a valid email address.'
  return ''
}

// Picks the confirmation message based on how the order will be received.
function confirmationMessage(method) {
  if (method === 'delivery') {
    return 'Your order is complete — you’ll get a link to confirm payment once the verified item is shipped'
  }
  return 'Your order is complete — you’ll get a link to confirm payment once the verified location for pickup will be sent'
}

// Composes HeatMeter and renders the live line items, total, and order flow.
export default function BlendSummary({ items, onOrder, ordered }) {
  const [formOpen, setFormOpen] = useState(false)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [method, setMethod] = useState('pickup')

  const [nameError, setNameError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [emailError, setEmailError] = useState('')

  // Remembers which method the *last placed* order used, so the confirmation
  // message stays correct even after the form resets back to "pickup".
  const [orderedMethod, setOrderedMethod] = useState('pickup')

  const total = calcTotal(items)
  const heat = calcHeat(items)
  const personality = blendPersonality(items)
  const empty = items.length === 0

  // Close the form if the blend empties mid-fill-in — an empty blend can't be ordered.
  useEffect(() => {
    if (empty) setFormOpen(false)
  }, [empty])

  function submitOrder(e) {
    e.preventDefault()

    const nameProblem = checkName(name)
    const phoneProblem = checkPhone(phone)
    const emailProblem = checkEmail(email)

    setNameError(nameProblem)
    setPhoneError(phoneProblem)
    setEmailError(emailProblem)

    // Stop here if any field failed validation, so the user can fix them.
    if (nameProblem || phoneProblem || emailProblem) return

    setOrderedMethod(method)
    onOrder()

    // Reset the form for next time.
    setFormOpen(false)
    setName('')
    setPhone('')
    setEmail('')
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
        <form className="order-form" onSubmit={submitOrder} noValidate>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setNameError('')
              }}
              aria-invalid={Boolean(nameError)}
              aria-describedby={nameError ? 'name-error' : undefined}
            />
            {nameError ? (
              <span className="field-error" id="name-error">
                {nameError}
              </span>
            ) : null}
          </label>

          <label>
            Phone
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
                setPhoneError('')
              }}
              aria-invalid={Boolean(phoneError)}
              aria-describedby={phoneError ? 'phone-error' : undefined}
            />
            {phoneError ? (
              <span className="field-error" id="phone-error">
                {phoneError}
              </span>
            ) : null}
          </label>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setEmailError('')
              }}
              aria-invalid={Boolean(emailError)}
              aria-describedby={emailError ? 'email-error' : undefined}
            />
            {emailError ? (
              <span className="field-error" id="email-error">
                {emailError}
              </span>
            ) : null}
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
        <p className="toast">{confirmationMessage(orderedMethod)}</p>
      ) : (
        <button className="order-btn" onClick={() => setFormOpen(true)} disabled={empty}>
          {empty ? 'Add a spice first' : 'Add blend to order'}
        </button>
      )}
    </aside>
  )
}
