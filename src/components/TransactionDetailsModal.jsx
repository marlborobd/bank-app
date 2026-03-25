import { useEffect } from 'react'

function seededRand(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function getTxnId(id) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let r = 'TXN-'
  for (let i = 0; i < 10; i++) r += chars[Math.floor(seededRand(id * 31 + i) * chars.length)]
  return r
}

function getRefNum(id) {
  let r = 'REF-'
  for (let i = 0; i < 8; i++) r += Math.floor(seededRand(id * 17 + i + 100) * 10)
  return r
}

function getTime(id) {
  const totalMins = Math.floor(seededRand(id * 7) * 720) + 480
  const hour = Math.floor(totalMins / 60)
  const min = totalMins % 60
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const h = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${h}:${String(min).padStart(2, '0')} ${ampm}`
}

function fmtDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function formatAmount(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(n)
}

export default function TransactionDetailsModal({ tx, onClose, onReportProblem }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const txnId = getTxnId(tx.id)
  const refNum = getRefNum(tx.id)
  const time = getTime(tx.id)
  const isCredit = tx.amount >= 0

  const bd = tx.bankDetails || {}
  const rows = [
    { label: 'Status', value: <span className="txd-badge">Completed</span> },
    { label: 'Date', value: fmtDate(tx.date) },
    { label: 'Time', value: time },
    { label: 'Description', value: tx.description },
    { label: 'Category', value: tx.type || 'Other' },
    {
      label: 'Amount',
      value: (
        <span className={isCredit ? 'txd-amount--credit' : 'txd-amount--debit'}>
          {isCredit ? '+' : ''}{formatAmount(Math.abs(tx.amount))}
        </span>
      )
    },
    { label: 'Account', value: 'REPO EQUIP LLC (...9193)' },
    { label: 'Transaction ID', value: txnId },
    { label: 'Reference #', value: refNum },
    ...(bd.bankName    ? [{ label: 'Bank Name',    value: bd.bankName }]    : []),
    ...(bd.swiftCode   ? [{ label: 'SWIFT / BIC',  value: bd.swiftCode }]   : []),
    ...(bd.bankAddress ? [{ label: 'Bank Address', value: bd.bankAddress }] : []),
    ...((bd.bankCity || bd.bankState || bd.bankZip)
      ? [{ label: 'Bank Location', value: [bd.bankCity, bd.bankState, bd.bankZip].filter(Boolean).join(', ') }]
      : []),
  ]

  return (
    <div className="modal-overlay txd-overlay" onClick={onClose}>
      <div className="txd-sheet" onClick={e => e.stopPropagation()}>
        <div className="txd-header">
          <span className="txd-header__title">Transaction Details</span>
          <button className="txd-header__close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="txd-body">
          {rows.map((row, i) => (
            <div key={i}>
              <div className="txd-row">
                <span className="txd-row__label">{row.label}</span>
                <span className="txd-row__value">{row.value}</span>
              </div>
              {i < rows.length - 1 && <div className="txd-divider" />}
            </div>
          ))}
        </div>
        <div className="txd-footer">
          <button className="txd-report-link" onClick={onReportProblem}>Report a problem</button>
          <button className="txd-close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
