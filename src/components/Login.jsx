import { useState } from 'react'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === 'admin' && password === '1234') {
      onLogin()
    } else {
      setError('The username or password you entered is incorrect.')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Logo + title */}
        <div className="login-logo-wrap">
          <div className="login-logo">
            <svg width="42" height="42" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" fill="#003087"/>
              <path
                d="M20 4 L34 10 L36 24 L27 36 L13 36 L4 24 L6 10 Z"
                fill="none" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round"
              />
              <text x="20" y="26" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="system-ui">C</text>
            </svg>
          </div>
          <div className="login-title">Business Account</div>
          <div className="login-sub">Sign in to continue</div>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="login-label">Username</label>
          <input
            className="login-input"
            type="text"
            placeholder="admin"
            value={username}
            onChange={e => { setUsername(e.target.value); setError('') }}
            autoComplete="username"
          />

          <label className="login-label">Password</label>
          <input
            className="login-input"
            type="password"
            placeholder="1234"
            value={password}
            onChange={e => { setPassword(e.target.value); setError('') }}
            autoComplete="current-password"
          />

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-btn">Sign In</button>
        </form>
      </div>
    </div>
  )
}
