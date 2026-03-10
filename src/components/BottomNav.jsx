export default function BottomNav({ onBack }) {
  return (
    <nav className="bottom-nav">
      {/* Back arrow */}
      <button className="bottom-nav__btn" onClick={onBack} aria-label="Back">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="#555" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Home circle */}
      <button className="bottom-nav__btn" aria-label="Home">
        <div className="bottom-nav__home-circle" />
      </button>

      {/* Recents grid */}
      <button className="bottom-nav__btn" aria-label="Recents">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="7" height="7" rx="1" stroke="#555" strokeWidth="2"/>
          <rect x="14" y="3" width="7" height="7" rx="1" stroke="#555" strokeWidth="2"/>
          <rect x="3" y="14" width="7" height="3" rx="1" stroke="#555" strokeWidth="2"/>
          <rect x="14" y="14" width="7" height="3" rx="1" stroke="#555" strokeWidth="2"/>
        </svg>
      </button>
    </nav>
  )
}
