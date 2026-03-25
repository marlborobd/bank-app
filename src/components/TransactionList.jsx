import { useState } from 'react'
import { jsPDF } from 'jspdf'
import Header from './Header'
import BottomNav from './BottomNav'

const FILTER_OPTIONS = ['All transactions', 'Fee', 'Transfer', 'Deposit', 'Withdrawal', 'Payment']

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

// ── SVG Icons ──────────────────────────────────────────
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="#003087" strokeWidth="2.2"/>
    <path d="M20 20l-3.5-3.5" stroke="#003087" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
)
const PrintIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="2" width="14" height="8" rx="1" stroke="#003087" strokeWidth="2"/>
    <rect x="3" y="10" width="18" height="10" rx="1" stroke="#003087" strokeWidth="2"/>
    <path d="M7 15h10M7 18h6" stroke="#003087" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M7 10V7" stroke="#003087" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)
const DownloadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 3v13M7 12l5 5 5-5" stroke="#003087" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 19h18" stroke="#003087" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
)

// ── Delete Confirmation Modal ──────────────────────────
function DeleteModal({ tx, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Delete Transaction?</span>
          <button className="modal-close" onClick={onCancel}>✕</button>
        </div>

        <div className="del-info">
          <div className="del-info__row">
            <span className="del-info__key">Description</span>
            <span className="del-info__val">{tx.description}</span>
          </div>
          <div className="del-info__row">
            <span className="del-info__key">Date</span>
            <span className="del-info__val">{fmt(tx.date)}</span>
          </div>
          <div className="del-info__row">
            <span className="del-info__key">Amount</span>
            <span className={`del-info__val ${tx.amount >= 0 ? 'txn-block__val--green' : 'txn-block__val--red'}`}>
              {tx.amount >= 0 ? '+' : ''}{formatAmount(tx.amount)}
            </span>
          </div>
        </div>

        <div className="del-modal-btns">
          <button className="del-cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="del-confirm-btn" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────
export default function TransactionList({
  transactions,
  currentBalance,
  onBack,
  onLogout,
  onDeleteTransaction,
  seedBalance,
}) {
  const [filter, setFilter] = useState('All transactions')
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchText, setSearchText] = useState('')
  // Feature 2: sort direction
  const [sortDesc, setSortDesc] = useState(true)
  // Feature 1: selected transaction for delete modal
  const [selectedTx, setSelectedTx] = useState(null)

  // Build chronological balance map (oldest → newest)
  const chronological = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date))
  let running = seedBalance
  const balanceMap = {}
  chronological.forEach(tx => {
    running = parseFloat((running + tx.amount).toFixed(2))
    balanceMap[tx.id] = running
  })

  // Feature 2: sort for display
  const sorted = [...transactions].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return sortDesc ? dateB - dateA : dateA - dateB
  })

  const visible = sorted.filter(tx => {
    const matchesType = filter === 'All transactions' || tx.type === filter
    const matchesSearch = !searchText || tx.description.toLowerCase().includes(searchText.toLowerCase())
    return matchesType && matchesSearch
  })

  // Feature 1: handle delete confirm
  const handleDeleteConfirm = () => {
    onDeleteTransaction(selectedTx.id)
    setSelectedTx(null)
  }

  const exportPDF = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' })
    const pageW = doc.internal.pageSize.getWidth()
    const margin = 40
    let y = 50

    // Header bar
    doc.setFillColor(0, 48, 135)
    doc.rect(0, 0, pageW, 38, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(15)
    doc.setTextColor(255, 255, 255)
    doc.text('CHASE BUSINESS ACCOUNT', margin, 25)

    y = 60
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.setTextColor(60, 60, 60)
    doc.text(`Account: REPO EQUIP LLC (...9193)`, margin, y); y += 16
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    doc.text(`Export Date: ${today}`, margin, y); y += 24

    // Table header
    const cols = { date: 40, desc: 120, type: 310, amount: 380, balance: 460 }
    doc.setFillColor(0, 48, 135)
    doc.rect(margin - 4, y - 14, pageW - margin * 2 + 8, 20, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(255, 255, 255)
    doc.text('Date', cols.date, y)
    doc.text('Description', cols.desc, y)
    doc.text('Type', cols.type, y)
    doc.text('Amount', cols.amount, y)
    doc.text('Balance', cols.balance, y)
    y += 14

    // Rows (oldest first for PDF) — use chronological balanceMap
    const pdfRows = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date))
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    pdfRows.forEach((tx, i) => {
      if (y > 760) { doc.addPage(); y = 50 }
      if (i % 2 === 0) {
        doc.setFillColor(240, 244, 252)
        doc.rect(margin - 4, y - 12, pageW - margin * 2 + 8, 16, 'F')
      }
      doc.setTextColor(50, 50, 50)
      doc.text(fmt(tx.date), cols.date, y)
      const descClipped = tx.description.length > 25 ? tx.description.slice(0, 23) + '…' : tx.description
      doc.text(descClipped, cols.desc, y)
      doc.text(tx.type || '', cols.type, y)
      const amtStr = (tx.amount >= 0 ? '+' : '') + formatAmount(tx.amount)
      doc.setTextColor(tx.amount >= 0 ? 46 : 200, tx.amount >= 0 ? 125 : 50, tx.amount >= 0 ? 50 : 50)
      doc.text(amtStr, cols.amount, y)
      doc.setTextColor(50, 50, 50)
      doc.text(formatAmount(balanceMap[tx.id] ?? 0), cols.balance, y)
      y += 18
    })

    // Current balance footer
    y += 10
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(0, 48, 135)
    doc.text(`Current Balance: ${formatAmount(currentBalance)}`, margin, y)

    y += 30
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(9)
    doc.setTextColor(150, 150, 150)
    doc.text('Generated by Chase Business Banking', margin, y)

    doc.save(`chase_statement_${Date.now()}.pdf`)
  }

  return (
    <div className="app">
      <div className="shell">
        <Header onSignOut={onLogout} />

        <div className="page-scroll">
          <div className="txns-page-title">Transactions</div>

          <div className="txns-content">
            <div className="card">
              {/* Toolbar */}
              <div className="txns-toolbar">
                <div className="txns-toolbar__left">
                  <span>Showing</span>
                  <div className="filter-dropdown">
                    <button
                      className="txns-toolbar__dropdown"
                      onClick={() => setShowFilterMenu(p => !p)}
                    >
                      {filter} ∨
                    </button>
                    {showFilterMenu && (
                      <div className="filter-dropdown__menu">
                        {FILTER_OPTIONS.map(opt => (
                          <button
                            key={opt}
                            className={`filter-dropdown__item${filter === opt ? ' filter-dropdown__item--selected' : ''}`}
                            onClick={() => { setFilter(opt); setShowFilterMenu(false) }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    className="sort-toggle-btn"
                    onClick={() => setSortDesc(p => !p)}
                  >
                    {sortDesc ? '↓ Newest First' : '↑ Oldest First'}
                  </button>
                </div>

                <div className="txns-toolbar__icons">
                  <button
                    className="txns-toolbar__icon-btn"
                    title="Search"
                    onClick={() => setShowSearch(p => !p)}
                  >
                    <SearchIcon />
                  </button>
                  <button
                    className="txns-toolbar__icon-btn"
                    title="Print"
                    onClick={() => window.print()}
                  >
                    <PrintIcon />
                  </button>
                  <button
                    className="txns-toolbar__icon-btn"
                    title="Export PDF"
                    onClick={exportPDF}
                  >
                    <DownloadIcon />
                  </button>
                </div>
              </div>

              {/* Search bar */}
              {showSearch && (
                <div className="txns-search-bar">
                  <input
                    className="txns-search-input"
                    placeholder="Search by description…"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    autoFocus
                  />
                </div>
              )}

              {/* Transaction table */}
              <div className="txns-table-wrap">
                <table className="txn-full-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visible.length === 0 && (
                      <tr className="txn-empty-row">
                        <td colSpan="5">No transactions found.</td>
                      </tr>
                    )}
                    {visible.map(tx => (
                      <tr
                        key={tx.id}
                        className="txn-block--clickable"
                        onClick={() => setSelectedTx(tx)}
                      >
                        <td>{fmt(tx.date)}</td>
                        <td className="txn-desc txn-block__val--bold">{tx.description}</td>
                        <td>{tx.type}</td>
                        <td className={tx.amount >= 0 ? 'txn-block__val--green' : 'txn-block__val--red'}>
                          {tx.amount >= 0 ? '+' : ''}{formatAmount(tx.amount)}
                        </td>
                        <td>{formatAmount(balanceMap[tx.id] ?? 0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <BottomNav onBack={onBack} />
      </div>

      {/* Feature 1: Delete confirmation modal */}
      {selectedTx && (
        <DeleteModal
          tx={selectedTx}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setSelectedTx(null)}
        />
      )}
    </div>
  )
}
