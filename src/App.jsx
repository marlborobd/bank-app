import { useState, useEffect } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import TransactionList from './components/TransactionList'
import './index.css'

const SEED_BALANCE = 322511800.60

const SEED_TRANSACTIONS = [
  {
    id: 1,
    description: 'ONLINE INTERNATIONAL WIRE TRANSFER A/C: SINGAPORE',
    type: 'Fee',
    amount: -40.00,
    date: '2026-03-09',
  },
  {
    id: 2,
    description: 'ONLINE US DOLLAR INTL WIRE FEE',
    type: 'Fee',
    amount: -40.00,
    date: '2026-03-09',
  },
  {
    id: 3,
    description: 'DOMESTIC INCOMING WIRE FEE',
    type: 'Fee',
    amount: -15.00,
    date: '2026-03-09',
  },
]

export function recalcBalances(txs, seedBalance) {
  let running = seedBalance
  return txs.map(tx => {
    running = parseFloat((running + tx.amount).toFixed(2))
    return { ...tx, balance: running }
  })
}

function loadSession() {
  try {
    const s = JSON.parse(localStorage.getItem('bankSession'))
    return s?.loggedIn === true
  } catch { return false }
}

function getSeedBalance() {
  localStorage.setItem('bankSeedBalance', String(SEED_BALANCE))
  return SEED_BALANCE
}

function loadTransactions(seedBal) {
  try {
    const stored = localStorage.getItem('bankTransactions')
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return recalcBalances(parsed, seedBal)
      }
    }
  } catch { /* ignore */ }
  return recalcBalances(SEED_TRANSACTIONS, seedBal)
}

export default function App() {
  const [seedBal] = useState(getSeedBalance)
  const [page, setPage] = useState(loadSession() ? 'dashboard' : 'login')
  const [transactions, setTransactions] = useState(() => loadTransactions(getSeedBalance()))

  useEffect(() => {
    localStorage.setItem('bankTransactions', JSON.stringify(transactions))
  }, [transactions])

  const currentBalance = transactions.length > 0
    ? transactions[transactions.length - 1].balance
    : seedBal

  const addTransaction = (tx) => {
    setTransactions(prev => recalcBalances([...prev, { ...tx, id: Date.now() }], seedBal))
  }

  const handleLogin = () => {
    localStorage.setItem('bankSession', JSON.stringify({ loggedIn: true }))
    setPage('dashboard')
  }

  const handleLogout = () => {
    localStorage.removeItem('bankSession')
    setPage('login')
  }

  if (page === 'login') return <Login onLogin={handleLogin} />
  if (page === 'transactions') return (
    <TransactionList
      transactions={transactions}
      currentBalance={currentBalance}
      onBack={() => setPage('dashboard')}
      onLogout={handleLogout}
    />
  )
  return (
    <Dashboard
      transactions={transactions}
      currentBalance={currentBalance}
      onLogout={handleLogout}
      onViewAll={() => setPage('transactions')}
      onAddTransaction={addTransaction}
    />
  )
}
