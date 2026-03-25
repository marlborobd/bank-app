import { useState, useEffect } from 'react'

const CATEGORIES = ['Shopping', 'Food & Dining', 'Income', 'Entertainment', 'Transfer', 'Bills & Utilities', 'Travel', 'Health', 'Other']

export default function ReportProblemModal({ tx, onClose, onEdit, onDelete }) {
  const [description, setDescription] = useState(tx.description)
  const [amount, setAmount] = useState(String(Math.abs(tx.amount)))
  const [type, setType] = useState(tx.amount >= 0 ? 'credit' : 'debit')
  const [date, setDate] = useState(tx.date)
  const [category, setCategory] = useState(tx.type || 'Other')
  const [notes, setNotes] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleSave = () => {
    const amountNum = parseFloat(amount) || 0
    const finalAmount = type === 'debit' ? -amountNum : amountNum
    onEdit({ ...tx, description, amount: finalAmount, date, type: category })
    onClose()
  }

  const handleDelete = () => {
    onDelete(tx.id)
    onClose()
  }

  return (
    <div className="modal-overlay rp-overlay" onClick={onClose}>
      <div className="rp-sheet" onClick={e => e.stopPropagation()}>
        <div className="txd-header">
          <span className="txd-header__title">Report a Problem</span>
          <button className="txd-header__close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <p className="rp-subtitle">
          Edit or remove this transaction. Changes will update your account balance automatically.
        </p>

        <div className="rp-section-title">✏ Edit Transaction</div>

        <div className="rp-field">
          <label className="rp-label">Description</label>
          <input className="rp-input" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="rp-field">
          <label className="rp-label">Amount</label>
          <div className="rp-amount-wrap">
            <span className="rp-dollar">$</span>
            <input className="rp-input rp-input--amount" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
        </div>
        <div className="rp-field">
          <label className="rp-label">Type</label>
          <div className="rp-radio-group">
            <label className="rp-radio-label">
              <input type="radio" value="debit" checked={type === 'debit'} onChange={() => setType('debit')} />
              {' '}Debit (money out)
            </label>
            <label className="rp-radio-label">
              <input type="radio" value="credit" checked={type === 'credit'} onChange={() => setType('credit')} />
              {' '}Credit (money in)
            </label>
          </div>
        </div>
        <div className="rp-field">
          <label className="rp-label">Date</label>
          <input type="date" className="rp-input" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div className="rp-field">
          <label className="rp-label">Category</label>
          <select className="rp-input rp-select" value={category} onChange={e => setCategory(e.target.value)}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="rp-field">
          <label className="rp-label">Notes (optional)</label>
          <textarea
            className="rp-input rp-textarea"
            value={notes}
            onChange={e => setNotes(e.target.value.slice(0, 200))}
            maxLength={200}
            rows={3}
          />
          <div className="rp-char-count">{notes.length}/200</div>
        </div>

        <button className="rp-save-btn" onClick={handleSave}>Save Changes</button>

        <div className="rp-section-divider" />

        <div className="rp-section-title">🗑 Remove Transaction</div>
        <div className="rp-warning-box">
          ⚠ Removing this transaction will permanently delete it and adjust your account balance accordingly.
        </div>

        {!confirmDelete ? (
          <button className="rp-delete-btn" onClick={() => setConfirmDelete(true)}>Delete Transaction</button>
        ) : (
          <div className="rp-confirm">
            <p className="rp-confirm__text">Are you sure? This cannot be undone.</p>
            <div className="rp-confirm__btns">
              <button className="rp-confirm__yes" onClick={handleDelete}>Yes, delete</button>
              <button className="rp-confirm__cancel" onClick={() => setConfirmDelete(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
