import { useState } from 'react'

const TODAY = new Date().toISOString().split('T')[0]

export default function TransferModal({ onClose, onAdd }) {
  const [tab, setTab] = useState('deposit')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const raw = parseFloat(amount)
    if (isNaN(raw) || raw <= 0) return setError('Enter a valid positive amount.')
    const finalAmount = tab === 'deposit' ? Math.abs(raw) : -Math.abs(raw)
    onAdd({
      description: note.trim() || (tab === 'deposit' ? 'Deposit' : 'Withdrawal'),
      type: tab === 'deposit' ? 'Deposit' : 'Withdrawal',
      amount: finalAmount,
      date: TODAY,
    })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Transfer</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div className="modal-tabs">
          {['deposit', 'withdraw'].map(t => (
            <button
              key={t}
              className={`modal-tab${tab === t ? ' modal-tab--active' : ''}`}
              onClick={() => { setTab(t); setError('') }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <label className="modal-label">Amount ($)</label>
          <input
            className="modal-input"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={e => { setAmount(e.target.value); setError('') }}
          />

          <label className="modal-label">Note (optional)</label>
          <input
            className="modal-input"
            placeholder={tab === 'deposit' ? 'e.g. Payroll deposit' : 'e.g. Bill payment'}
            value={note}
            onChange={e => setNote(e.target.value)}
          />

          {error && <div className="modal-error">{error}</div>}

          <button
            type="submit"
            className="modal-submit"
            style={{ background: tab === 'deposit' ? '#2e7d32' : '#003087' }}
          >
            {tab === 'deposit' ? 'Deposit Funds' : 'Withdraw Funds'}
          </button>
        </form>
      </div>
    </div>
  )
}
