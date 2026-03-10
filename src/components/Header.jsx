/* Chase-style dark navy header */
export default function Header({ onSignOut }) {
  return (
    <header className="chase-header">
      {/* Hamburger */}
      <button className="chase-header__btn" aria-label="Menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Chase Logo */}
      <div className="chase-logo">
        <img
          src="/logo1.png"
          alt="Logo"
          style={{
            height: '32px',
            width: '32px',
            objectFit: 'contain',
            borderRadius: '6px',
            background: 'transparent',
            mixBlendMode: 'normal'
          }}
        />
      </div>

      {/* Sign out */}
      <button className="chase-header__signout" onClick={onSignOut}>
        Sign out
      </button>
    </header>
  )
}
