export default function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="shell footer-inner">
        <div>
          <div className="brand">
            <span className="dot" aria-hidden="true" /> YAAD SPICE CO.
          </div>
          <p style={{ maxWidth: '38ch', marginTop: '10px' }}>
            Your own personalized spice bench out of Montego Bay Jamaica. first of its kind Jamaican spices,
            made to order and mixed by you.
          </p>
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
            A component-based web app
            <br />
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
