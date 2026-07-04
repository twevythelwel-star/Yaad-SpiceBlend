import { useState, useRef } from 'react'
import NavBar from './components/NavBar.jsx'
import Hero from './components/Hero.jsx'
import SpiceCard from './components/SpiceCard.jsx'
import BlendSummary from './components/BlendSummary.jsx'
import Footer from './components/Footer.jsx'
import { SPICES } from './data/spices.js'

const CONFIRMATION_MS = 5000

// App is the orchestrator. The blend lives here as lifted state and flows
// DOWN into SpiceCard / BlendSummary as props; their events flow UP to these
// handlers. That one-direction data flow is the whole point of the exercise.
export default function App() {
  const [selected, setSelected] = useState({}) // { spiceId: quantity }
  const [ordered, setOrdered] = useState(false)
  const orderTimeout = useRef(null)

  function clearOrder() {
    if (orderTimeout.current) {
      clearTimeout(orderTimeout.current)
      orderTimeout.current = null
    }
    setOrdered(false)
  }

  function placeOrder() {
    setOrdered(true)
    if (orderTimeout.current) clearTimeout(orderTimeout.current)
    orderTimeout.current = setTimeout(() => setOrdered(false), CONFIRMATION_MS)
  }

  function toggle(id) {
    clearOrder()
    setSelected((prev) => {
      const next = { ...prev }
      if (next[id]) delete next[id]
      else next[id] = 1
      return next
    })
  }

  function changeQty(id, delta) {
    clearOrder()
    setSelected((prev) => {
      const current = prev[id] || 0
      const qty = Math.max(1, current + delta)
      return { ...prev, [id]: qty }
    })
  }

  // Derive the line items handed to the summary.
  const items = SPICES.filter((s) => selected[s.id]).map((s) => ({
    ...s,
    qty: selected[s.id],
  }))

  return (
    <>
      <NavBar />
      <main>
        <Hero />

        <section className="builder" id="build">
          <div className="shell">
            <div className="section-head">
              <p className="eyebrow">The bench</p>
              <h2>Build your blend</h2>
              <p>
                Tap a spice to add it, then use − / + to set how much goes in. The meter and
                the total update as you go.
              </p>
            </div>

            <div className="builder-grid">
              <div className="spice-grid">
                {SPICES.map((spice) => (
                  <SpiceCard
                    key={spice.id}
                    spice={spice}
                    selected={Boolean(selected[spice.id])}
                    qty={selected[spice.id] || 0}
                    onToggle={toggle}
                    onQty={changeQty}
                  />
                ))}
              </div>

              <BlendSummary items={items} ordered={ordered} onOrder={placeOrder} />
            </div>
          </div>
        </section>

        <section className="builder" id="how" style={{ paddingTop: 0 }}>
          <div className="shell">
            <div className="section-head">
              <p className="eyebrow">How it works</p>
              <h2>Three steps</h2>
            </div>
            <div className="steps-grid">
              <div className="card">
                <h3 className="card-name">1 · Pick</h3>
                <p className="card-note">Add any of the eight single-origin spices to the bench.</p>
              </div>
              <div className="card">
                <h3 className="card-name">2 · Dial</h3>
                <p className="card-note">Set the amount of each. The ember meter shows your heat.</p>
              </div>
              <div className="card">
                <h3 className="card-name">3 · Order</h3>
                <p className="card-note">We grind it fresh and ship your one-of-a-kind blend.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
