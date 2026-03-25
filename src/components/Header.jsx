export default function Header({ onSignOut }) {
  return (
    <header className="cc-header">
      {/* Top bar — dark navy */}
      <div className="cc-header__top">
        <div className="cc-header__top-inner">
          <div className="cc-header__logo">
            <span className="cc-header__hamburger">☰</span>
            <span className="cc-header__brand">CHASE CONNECT™</span>
          </div>
          <div className="cc-header__right">
            <button className="cc-icon-btn" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21"/>
              </svg>
            </button>
            <button className="cc-icon-btn" aria-label="Notifications">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </button>
            <button className="cc-icon-btn cc-icon-btn--profile" aria-label="Profile">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </button>
            <button className="cc-header__open-btn">Open an account</button>
            <button className="cc-header__signout" onClick={onSignOut}>Sign out</button>
          </div>
        </div>
      </div>

      {/* Second nav bar — white */}
      <div className="cc-header__nav">
        <div className="cc-header__nav-inner">
          <span className="cc-nav__link">Accounts</span>
          <span className="cc-nav__link cc-nav__link--active">Pay &amp; transfer</span>
          <span className="cc-nav__link">Collect &amp; deposit</span>
          <span className="cc-nav__link">Access &amp; security</span>
        </div>
      </div>
    </header>
  )
}
