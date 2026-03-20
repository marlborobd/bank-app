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

  // Last 5 transactions (most recent date first)
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  })

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="app">
      <div className="shell">
        <Header onSignOut={onLogout} />

        {/* Welcome bar */}
        <div className="welcome-bar">
          <div className="welcome-bar__inner">
            <span className="welcome-bar__greeting">{greeting}, Repo EQUIP</span>
            <span className="welcome-bar__date">{today}</span>
          </div>
        </div>

        <div className="page-scroll">
          <div className="dashboard-body">

            {/* ── Left Sidebar ── */}
            <div className="dashboard-sidebar">

              {/* Account summary card */}
              <div className="card">
                <div className="account-card">
                  <div className="account-card__name">BUS COMP... (...9193)</div>
                  <div className="account-card__type">Business Checking</div>
                  <div className="account-card__balance-label">Available Balance</div>
                  <div className="account-card__balance">{formatAmount(currentBalance)}</div>
                  <div className="account-card__actions">
                    <button className="account-card__btn account-card__btn--primary" onClick={() => setModal('pay')}>Pay</button>
                    <button className="account-card__btn account-card__btn--secondary" onClick={onViewAll}>View activity</button>
                  </div>
                </div>

                <div className="balance-details">
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
                    <>
                      <div className="balance-row">
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
                    </>
                  )}

                  <button
                    className="show-details-btn"
                    onClick={() => setShowDetails(p => !p)}
                  >
                    {showDetails ? 'Hide details ∧' : 'Show details ∨'}
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

            </div>

            {/* ── Main Content ── */}
            <div className="dashboard-main">

              {/* Quick Actions */}
              <div className="card">
                <div className="card-header">
                  <span className="card-header__title">Quick Actions</span>
                </div>
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
                    <span className="action-btn__label">Deposit</span>
                  </button>
                  <button className="action-btn" disabled>
                    <div className="action-btn__circle"><MoreIcon /></div>
                    <span className="action-btn__label">Statements</span>
                  </button>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="card">
                <div className="card-header">
                  <span className="card-header__title">Recent Transactions</span>
                  <button className="card-link" onClick={onViewAll}>
                    See all transactions <ChevronRight />
                  </button>
                </div>

                <table className="txn-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent.length === 0 && (
                      <tr className="txn-empty-row">
                        <td colSpan="4">No transactions yet.</td>
                      </tr>
                    )}
                    {recent.map(tx => (
                      <tr key={tx.id}>
                        <td>{fmt(tx.date)}</td>
                        <td className="txn-desc">{tx.description}</td>
                        <td className={tx.amount >= 0 ? 'txn-amount--credit' : 'txn-amount--debit'}>
                          {tx.amount >= 0 ? '+' : ''}{formatAmount(Math.abs(tx.amount))}
                        </td>
                        <td>{formatAmount(tx.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>

        <BottomNav onBack={onLogout} />
      </div>

      {modal === 'pay' && (
        <AddTransactionModal onClose={() => setModal(null)} onAdd={onAddTransaction} />
      )}
      {modal === 'transfer' && (
        <TransferModal onClose={() => setModal(null)} onAdd={onAddTransaction} currentBalance={currentBalance} />
      )}
    </div>
  )
}
