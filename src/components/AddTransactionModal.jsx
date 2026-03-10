import { useState } from 'react'

const TODAY = new Date().toISOString().split('T')[0]

export default function AddTransactionModal({ onClose, onAdd }) {
  const [description, setDescription] = useState('')
  const [type, setType] = useState('Fee')
  const [amount, setAmount] = useState('')
  const [direction, setDirection] = useState('debit')
  const [date, setDate] = useState(TODAY)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!description.trim()) return setError('Description is required.')
    const raw = parseFloat(amount)
    if (isNaN(raw) || raw <= 0) return setError('Enter a valid positive amount.')
    const finalAmount = direction === 'debit' ? -Math.abs(raw) : Math.abs(raw)
    onAdd({ description: description.trim(), type, amount: finalAmount, date })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Add Transaction</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="modal-label">Description</label>
          <input
            className="modal-input"
            placeholder="e.g. Wire Fee"
            value={description}
            onChange={e => { setDescription(e.target.value); setError('') }}
          />

          <label className="modal-label">Type</label>
          <select className="modal-select" value={type} onChange={e => setType(e.target.value)}>
            <option>Fee</option>
            <option>Transfer</option>
            <option>Deposit</option>
            <option>Withdrawal</option>
            <option>Payment</option>
          </select>

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

          <label className="modal-label">Direction</label>
          <div className="modal-radio-row">
            {[
              { val: 'debit', label: '− Debit' },
              { val: 'credit', label: '+ Credit' },
            ].map(({ val, label }) => (
              <div
                key={val}
                className={`modal-radio-opt${direction === val ? ' modal-radio-opt--selected' : ''}`}
                onClick={() => setDirection(val)}
              >
                <input
                  type="radio"
                  name="direction"
                  value={val}
                  checked={direction === val}
                  onChange={() => setDirection(val)}
                  style={{ accentColor: '#003087' }}
                />
                {label}
              </div>
            ))}
          </div>

          <label className="modal-label">Date</label>
          <input
            className="modal-input"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />

          {error && <div className="modal-error">{error}</div>}

          <button type="submit" className="modal-submit">Add Transaction</button>
        </form>
      </div>
    </div>
  )
}
