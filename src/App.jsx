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
  { id: 4,  description: 'INTERNATIONAL WIRE TRANSFER - DUBAI',     type: 'Transfer', amount: -245000.00, date: '2026-03-08' },
  { id: 5,  description: 'ONLINE US DOLLAR WIRE FEE',               type: 'Fee',      amount: -55000.00,  date: '2026-03-08' },
  { id: 6,  description: 'SWIFT TRANSFER - LONDON BARCLAYS',        type: 'Transfer', amount: -820000.00, date: '2026-03-07' },
  { id: 7,  description: 'INCOMING WIRE PROCESSING FEE',            type: 'Fee',      amount: -35000.00,  date: '2026-03-07' },
  { id: 8,  description: 'OUTBOUND WIRE - HONG KONG HSBC',          type: 'Transfer', amount: -670000.00, date: '2026-03-07' },
  { id: 9,  description: 'INTERNATIONAL TRANSFER - SINGAPORE',      type: 'Transfer', amount: -490000.00, date: '2026-03-06' },
  { id: 10, description: 'WIRE TRANSFER FEE - OVERSEAS',            type: 'Fee',      amount: -42000.00,  date: '2026-03-06' },
  { id: 11, description: 'ACH TRANSFER - DEUTSCHE BANK',            type: 'Transfer', amount: -310000.00, date: '2026-03-05' },
  { id: 12, description: 'OUTGOING WIRE - ZURICH UBS',              type: 'Transfer', amount: -755000.00, date: '2026-03-05' },
  { id: 13, description: 'WIRE PROCESSING CHARGE',                  type: 'Fee',      amount: -38000.00,  date: '2026-03-05' },
  { id: 14, description: 'INTERNATIONAL WIRE - TOKYO',              type: 'Transfer', amount: -920000.00, date: '2026-03-04' },
  { id: 15, description: 'SWIFT FEE - OUTBOUND',                    type: 'Fee',      amount: -47000.00,  date: '2026-03-04' },
  { id: 16, description: 'WIRE TRANSFER - AMSTERDAM ABN',           type: 'Transfer', amount: -580000.00, date: '2026-03-03' },
  { id: 17, description: 'DOMESTIC WIRE FEE',                       type: 'Fee',      amount: -33000.00,  date: '2026-03-03' },
  { id: 18, description: 'OUTBOUND TRANSFER - PARIS BNP',           type: 'Transfer', amount: -440000.00, date: '2026-03-03' },
  { id: 19, description: 'INTERNATIONAL WIRE - SYDNEY',             type: 'Transfer', amount: -615000.00, date: '2026-03-02' },
  { id: 20, description: 'WIRE SERVICE FEE',                        type: 'Fee',      amount: -52000.00,  date: '2026-03-02' },
  { id: 21, description: 'SWIFT TRANSFER - TORONTO RBC',            type: 'Transfer', amount: -380000.00, date: '2026-03-01' },
  { id: 22, description: 'OUTGOING INTERNATIONAL WIRE FEE',         type: 'Fee',      amount: -44000.00,  date: '2026-03-01' },
  { id: 23, description: 'WIRE TRANSFER - MILAN UNICREDIT',         type: 'Transfer', amount: -730000.00, date: '2026-03-01' },
  { id: 24, description: 'INTERNATIONAL WIRE - FRANKFURT',          type: 'Transfer', amount: -510000.00, date: '2026-02-28' },
  { id: 25, description: 'OUTBOUND WIRE PROCESSING FEE',            type: 'Fee',      amount: -39000.00,  date: '2026-02-28' },
  { id: 26, description: 'SWIFT TRANSFER - SEOUL KOOKMIN',          type: 'Transfer', amount: -860000.00, date: '2026-02-27' },
  { id: 27, description: 'WIRE TRANSFER FEE DOMESTIC',              type: 'Fee',      amount: -31000.00,  date: '2026-02-27' },
  { id: 28, description: 'OUTGOING WIRE - MUMBAI HDFC',             type: 'Transfer', amount: -420000.00, date: '2026-02-26' },
  { id: 29, description: 'INTERNATIONAL PROCESSING FEE',            type: 'Fee',      amount: -58000.00,  date: '2026-02-26' },
  { id: 30, description: 'WIRE TRANSFER - BEIJING ICBC',            type: 'Transfer', amount: -975000.00, date: '2026-02-26' },
  { id: 31, description: 'SWIFT OUTBOUND FEE',                      type: 'Fee',      amount: -36000.00,  date: '2026-02-25' },
  { id: 32, description: 'INTERNATIONAL WIRE - CAPE TOWN',          type: 'Transfer', amount: -290000.00, date: '2026-02-25' },
  { id: 33, description: 'ACH OUTBOUND TRANSFER FEE',               type: 'Fee',      amount: -43000.00,  date: '2026-02-24' },
  { id: 34, description: 'WIRE TRANSFER - MEXICO CITY BBVA',        type: 'Transfer', amount: -640000.00, date: '2026-02-24' },
  { id: 35, description: 'OUTGOING WIRE - SAO PAULO',               type: 'Transfer', amount: -385000.00, date: '2026-02-24' },
  { id: 36, description: 'INTERNATIONAL WIRE FEE',                  type: 'Fee',      amount: -48000.00,  date: '2026-02-23' },
  { id: 37, description: 'SWIFT TRANSFER - STOCKHOLM SEB',          type: 'Transfer', amount: -520000.00, date: '2026-02-23' },
  { id: 38, description: 'WIRE TRANSFER - WARSAW PEKAO',            type: 'Transfer', amount: -175000.00, date: '2026-02-22' },
  { id: 39, description: 'OUTBOUND SWIFT FEE',                      type: 'Fee',      amount: -34000.00,  date: '2026-02-22' },
  { id: 40, description: 'INTERNATIONAL WIRE - OSLO DNB',           type: 'Transfer', amount: -810000.00, date: '2026-02-21' },
  { id: 41, description: 'WIRE PROCESSING FEE INTL',                type: 'Fee',      amount: -56000.00,  date: '2026-02-21' },
  { id: 42, description: 'SWIFT TRANSFER - BRUSSELS ING',           type: 'Transfer', amount: -460000.00, date: '2026-02-20' },
  { id: 43, description: 'OUTGOING WIRE - VIENNA ERSTE',            type: 'Transfer', amount: -330000.00, date: '2026-02-20' },
  { id: 44, description: 'DOMESTIC WIRE PROCESSING FEE',            type: 'Fee',      amount: -41000.00,  date: '2026-02-19' },
  { id: 45, description: 'INTERNATIONAL WIRE - LISBON CGD',         type: 'Transfer', amount: -595000.00, date: '2026-02-19' },
  { id: 46, description: 'SWIFT FEE OUTBOUND INTL',                 type: 'Fee',      amount: -37000.00,  date: '2026-02-18' },
  { id: 47, description: 'WIRE TRANSFER - ATHENS ALPHA',            type: 'Transfer', amount: -265000.00, date: '2026-02-18' },
  { id: 48, description: 'OUTGOING INTERNATIONAL TRANSFER',         type: 'Transfer', amount: -710000.00, date: '2026-02-18' },
  { id: 49, description: 'WIRE SERVICE CHARGE INTL',                type: 'Fee',      amount: -53000.00,  date: '2026-02-17' },
  { id: 50, description: 'SWIFT TRANSFER - BUDAPEST OTP',           type: 'Transfer', amount: -195000.00, date: '2026-02-17' },
  { id: 51, description: 'INTERNATIONAL WIRE - PRAGUE KB',          type: 'Transfer', amount: -445000.00, date: '2026-02-16' },
  { id: 52, description: 'OUTBOUND WIRE FEE DOMESTIC',              type: 'Fee',      amount: -32000.00,  date: '2026-02-16' },
  { id: 53, description: 'WIRE TRANSFER - BUCHAREST BCR',           type: 'Transfer', amount: -880000.00, date: '2026-02-15' },
  { id: 54, description: 'SWIFT OUTBOUND PROCESSING FEE',           type: 'Fee',      amount: -46000.00,  date: '2026-02-15' },
  { id: 55, description: 'INTERNATIONAL WIRE - KIEV PUMB',          type: 'Transfer', amount: -320000.00, date: '2026-02-14' },
  { id: 56, description: 'WIRE TRANSFER FEE OUTBOUND',              type: 'Fee',      amount: -39000.00,  date: '2026-02-14' },
  { id: 57, description: 'OUTGOING WIRE - HELSINKI OP',             type: 'Transfer', amount: -555000.00, date: '2026-02-13' },
  { id: 58, description: 'SWIFT TRANSFER - RIGA SWEDBANK',          type: 'Transfer', amount: -240000.00, date: '2026-02-13' },
  { id: 59, description: 'INTERNATIONAL PROCESSING CHARGE',         type: 'Fee',      amount: -51000.00,  date: '2026-02-12' },
  { id: 60, description: 'WIRE TRANSFER - TALLINN LHV',             type: 'Transfer', amount: -415000.00, date: '2026-02-12' },
  { id: 61, description: 'OUTBOUND INTERNATIONAL WIRE FEE',         type: 'Fee',      amount: -35000.00,  date: '2026-02-11' },
  { id: 62, description: 'SWIFT TRANSFER - VILNIUS SEB',            type: 'Transfer', amount: -690000.00, date: '2026-02-11' },
  { id: 63, description: 'WIRE TRANSFER - NICOSIA HELLENIC',        type: 'Transfer', amount: -158000.00, date: '2026-01-15' },
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
