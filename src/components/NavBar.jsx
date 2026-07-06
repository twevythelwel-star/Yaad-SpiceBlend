export default function NavBar() {
  return (
    <header className="nav">
      <div className="shell nav-inner">
        <a className="brand" href="#top" aria-label="Yaad Spice Co. home">
          <span className="dot" aria-hidden="true" />
          YAAD SPICE CO.
        </a>
        <nav className="nav-links" aria-label="Main">
          <a href="#build">Build</a>
          <a href="#how">How it works</a>
          <a href="#about">About</a>
          <a className="nav-cta" href="#build">Start mixing</a>
        </nav>
      </div>
    </header>
  )
}
