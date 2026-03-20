export default function Header({ onSignOut }) {
  return (
    <header className="chase-header">
      <div className="chase-header__inner">
        {/* Logo */}
        <div className="chase-logo-area">
          <img
            src="/logo1.png"
            alt="Chase"
            className="chase-logo-img"
          />
          <span className="chase-logo-text">CHASE ○</span>
        </div>

        {/* Nav Links */}
        <nav className="chase-nav">
          <span className="chase-nav__link chase-nav__link--active">Accounts</span>
          <span className="chase-nav__link">Pay &amp; Transfer</span>
          <span className="chase-nav__link">Cards</span>
          <span className="chase-nav__link">History</span>
          <span className="chase-nav__link">Settings</span>
        </nav>

        {/* Right side */}
        <div className="chase-header__right">
          <button className="chase-header__notif" aria-label="Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className="chase-header__user">Repo EQUIP</span>
          <button className="chase-header__signout" onClick={onSignOut}>Sign Out</button>
        </div>
      </div>
    </header>
  )
}
