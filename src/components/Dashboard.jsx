import { useState } from 'react'
import Header from './Header'
import BottomNav from './BottomNav'
import AddTransactionModal from './AddTransactionModal'
import TransferModal from './TransferModal'

function fmt(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatAmount(n) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n)
}

// SVG Icons
const PayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="5" width="20" height="14" rx="2.5" stroke="#003087" strokeWidth="2"/>
    <path d="M2 10h20" stroke="#003087" strokeWidth="2"/>
    <path d="M6 15h4" stroke="#003087" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)
const TransferIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M5 8h14M5 8l3-3M5 8l3 3" stroke="#003087" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 16H5M19 16l-3-3M19 16l-3 3" stroke="#003087" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const AcceptIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#003087" strokeWidth="2"/>
    <path d="M8 12l3 3 5-5" stroke="#003087" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const MoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="5" cy="12" r="1.8" fill="#003087"/>
    <circle cx="12" cy="12" r="1.8" fill="#003087"/>
    <circle cx="19" cy="12" r="1.8" fill="#003087"/>
  </svg>
)
const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M9 18l6-6-6-6" stroke="#003087" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const QuestionIcon = () => (
  <span className="balance-row__icon">?</span>
)

export default function Dashboard({ transactions, currentBalance, onLogout, onViewAll, onAddTransaction }) {
  const [showDetails, setShowDetails] = useState(false)
  const [modal, setModal] = useState(null) // 'pay' | 'transfer'

  // Last 2 transactions (most recent first)
  const recent = [...transactions].reverse().slice(0, 2)

  return (
    <div className="app">
      <div className="shell">
        <Header onSignOut={onLogout} />

        <div className="page-scroll">
          {/* Balance card */}
          <div className="card" style={{ margin: '12px 16px' }}>
            <div className="balance-card">
              <div className="balance-card__top">
                <div>
                  <div className="balance-card__label">BUS COMP... (...9193)</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>Checking account</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="balance-card__label">Available balance</div>
                  <div className="balance-card__amount">{formatAmount(currentBalance)}</div>
                </div>
              </div>

              <hr className="balance-card__divider" />

              <div className="balance-row">
                <span className="balance-row__label">Available balance</span>
                <div className="balance-row__right">
                  <span className="balance-row__amount">{formatAmount(currentBalance)}</span>
                  <QuestionIcon />
                </div>
              </div>
              <div className="balance-row">
                <span className="balance-row__label">Present balance</span>
                <div className="balance-row__right">
                  <span className="balance-row__amount">{formatAmount(currentBalance)}</span>
                  <QuestionIcon />
                </div>
              </div>

              {showDetails && (
                <div style={{ marginTop: 8 }}>
                  <div className="balance-row" style={{ borderTop: '1px solid #eaeef5', paddingTop: 10 }}>
                    <span className="balance-row__label">Total transactions</span>
                    <span className="balance-row__amount">231</span>
                  </div>
                  <div className="balance-row">
                    <span className="balance-row__label">Account type</span>
                    <span className="balance-row__amount">Business Checking</span>
                  </div>
                  <div className="balance-row">
                    <span className="balance-row__label">Account number</span>
                    <span className="balance-row__amount">••••9193</span>
                  </div>
                </div>
              )}

              <button
                className="show-details-btn"
                onClick={() => setShowDetails(p => !p)}
              >
                {showDetails ? 'Hide details ∧' : 'Show details ∨'}
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="card">
            <div className="action-row">
              <button className="action-btn" onClick={() => setModal('pay')}>
                <div className="action-btn__circle"><PayIcon /></div>
                <span className="action-btn__label">Pay</span>
              </button>
              <button className="action-btn" onClick={() => setModal('transfer')}>
                <div className="action-btn__circle"><TransferIcon /></div>
                <span className="action-btn__label">Transfer</span>
              </button>
              <button className="action-btn" disabled>
                <div className="action-btn__circle"><AcceptIcon /></div>
                <span className="action-btn__label">Accept</span>
              </button>
              <button className="action-btn" disabled>
                <div className="action-btn__circle"><MoreIcon /></div>
                <span className="action-btn__label">More</span>
              </button>
            </div>
          </div>

          {/* Manage account */}
          <div className="card">
            <div className="manage-card">
              <div>
                <div className="manage-card__title">Manage account</div>
                <div className="manage-card__sub">Access tools &amp; services for your account</div>
              </div>
              <ChevronRight />
            </div>
          </div>

          {/* Transactions preview */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="txn-card__header">
              <span className="txn-card__title">Recent transactions</span>
              <button className="txn-card__see-all" onClick={onViewAll}>
                See all transactions <ChevronRight />
              </button>
            </div>

            {recent.length === 0 && (
              <div style={{ padding: '16px 18px', color: '#999', fontSize: 13 }}>No transactions yet.</div>
            )}

            {recent.map(tx => (
              <div key={tx.id} className="txn-preview-row">
                <div className="txn-preview-row__left">
                  <div className="txn-preview-row__title">{tx.description}</div>
                  <div className="txn-preview-row__date">{fmt(tx.date)}</div>
                  <div className="txn-preview-row__bal">Bal: {formatAmount(tx.balance)}</div>
                </div>
                <div className={`txn-preview-row__amount${tx.amount >= 0 ? ' txn-preview-row__amount--credit' : ''}`}>
                  {tx.amount >= 0 ? '+' : ''}{formatAmount(Math.abs(tx.amount))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <BottomNav onBack={onLogout} />
      </div>

      {modal === 'pay' && (
        <AddTransactionModal onClose={() => setModal(null)} onAdd={onAddTransaction} />
      )}
      {modal === 'transfer' && (
        <TransferModal onClose={() => setModal(null)} onAdd={onAddTransaction} />
      )}
    </div>
  )
}
