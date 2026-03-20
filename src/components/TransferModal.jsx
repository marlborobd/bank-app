import { useState } from 'react'

const TODAY = new Date().toISOString().split('T')[0]

// ── Data ─────────────────────────────────────────────────────────────
const CURRENCIES = [
  { code: 'EUR', flag: '🇪🇺', name: 'Euro',                  rate: 0.9234  },
  { code: 'GBP', flag: '🇬🇧', name: 'British Pound',         rate: 0.7891  },
  { code: 'RON', flag: '🇷🇴', name: 'Romanian Leu',           rate: 4.6012  },
  { code: 'CAD', flag: '🇨🇦', name: 'Canadian Dollar',        rate: 1.3645  },
  { code: 'AUD', flag: '🇦🇺', name: 'Australian Dollar',      rate: 1.5234  },
  { code: 'JPY', flag: '🇯🇵', name: 'Japanese Yen',           rate: 149.82  },
  { code: 'CHF', flag: '🇨🇭', name: 'Swiss Franc',            rate: 0.8943  },
  { code: 'SEK', flag: '🇸🇪', name: 'Swedish Krona',          rate: 10.4521 },
  { code: 'NOK', flag: '🇳🇴', name: 'Norwegian Krone',        rate: 10.6234 },
  { code: 'DKK', flag: '🇩🇰', name: 'Danish Krone',           rate: 6.8923  },
  { code: 'USD', flag: '🇺🇸', name: 'US Dollar',              rate: 1.0000  },
  { code: 'CNY', flag: '🇨🇳', name: 'Chinese Yuan',           rate: 7.2345  },
  { code: 'HKD', flag: '🇭🇰', name: 'Hong Kong Dollar',       rate: 7.8234  },
  { code: 'SGD', flag: '🇸🇬', name: 'Singapore Dollar',       rate: 1.3456  },
  { code: 'MXN', flag: '🇲🇽', name: 'Mexican Peso',           rate: 17.2345 },
  { code: 'BRL', flag: '🇧🇷', name: 'Brazilian Real',         rate: 5.1234  },
  { code: 'INR', flag: '🇮🇳', name: 'Indian Rupee',           rate: 83.4521 },
  { code: 'KRW', flag: '🇰🇷', name: 'South Korean Won',       rate: 1325.45 },
  { code: 'THB', flag: '🇹🇭', name: 'Thai Baht',              rate: 35.2134 },
  { code: 'AED', flag: '🇦🇪', name: 'UAE Dirham',             rate: 3.6725  },
  { code: 'SAR', flag: '🇸🇦', name: 'Saudi Riyal',            rate: 3.7500  },
  { code: 'NZD', flag: '🇳🇿', name: 'New Zealand Dollar',     rate: 1.6234  },
  { code: 'ZAR', flag: '🇿🇦', name: 'South African Rand',     rate: 18.7345 },
  { code: 'TRY', flag: '🇹🇷', name: 'Turkish Lira',           rate: 32.1456 },
  { code: 'PLN', flag: '🇵🇱', name: 'Polish Zloty',           rate: 4.0234  },
  { code: 'CZK', flag: '🇨🇿', name: 'Czech Koruna',           rate: 23.4521 },
  { code: 'HUF', flag: '🇭🇺', name: 'Hungarian Forint',       rate: 362.45  },
  { code: 'ILS', flag: '🇮🇱', name: 'Israeli Shekel',         rate: 3.7234  },
  { code: 'MYR', flag: '🇲🇾', name: 'Malaysian Ringgit',      rate: 4.6789  },
  { code: 'PHP', flag: '🇵🇭', name: 'Philippine Peso',        rate: 56.3412 },
]

const COUNTRIES = [
  { code: 'RO', flag: '🇷🇴', name: 'Romania'         },
  { code: 'DE', flag: '🇩🇪', name: 'Germany'          },
  { code: 'FR', flag: '🇫🇷', name: 'France'           },
  { code: 'GB', flag: '🇬🇧', name: 'United Kingdom'   },
  { code: 'IT', flag: '🇮🇹', name: 'Italy'            },
  { code: 'ES', flag: '🇪🇸', name: 'Spain'            },
  { code: 'US', flag: '🇺🇸', name: 'United States'    },
  { code: 'CA', flag: '🇨🇦', name: 'Canada'           },
  { code: 'AU', flag: '🇦🇺', name: 'Australia'        },
  { code: 'JP', flag: '🇯🇵', name: 'Japan'            },
  { code: 'CH', flag: '🇨🇭', name: 'Switzerland'      },
  { code: 'SE', flag: '🇸🇪', name: 'Sweden'           },
  { code: 'NO', flag: '🇳🇴', name: 'Norway'           },
  { code: 'DK', flag: '🇩🇰', name: 'Denmark'          },
  { code: 'NL', flag: '🇳🇱', name: 'Netherlands'      },
  { code: 'BE', flag: '🇧🇪', name: 'Belgium'          },
  { code: 'AT', flag: '🇦🇹', name: 'Austria'          },
  { code: 'PT', flag: '🇵🇹', name: 'Portugal'         },
  { code: 'PL', flag: '🇵🇱', name: 'Poland'           },
  { code: 'CZ', flag: '🇨🇿', name: 'Czech Republic'   },
  { code: 'HU', flag: '🇭🇺', name: 'Hungary'          },
  { code: 'GR', flag: '🇬🇷', name: 'Greece'           },
  { code: 'TR', flag: '🇹🇷', name: 'Turkey'           },
  { code: 'UA', flag: '🇺🇦', name: 'Ukraine'          },
  { code: 'CN', flag: '🇨🇳', name: 'China'            },
  { code: 'HK', flag: '🇭🇰', name: 'Hong Kong'        },
  { code: 'SG', flag: '🇸🇬', name: 'Singapore'        },
  { code: 'IN', flag: '🇮🇳', name: 'India'            },
  { code: 'KR', flag: '🇰🇷', name: 'South Korea'      },
  { code: 'AE', flag: '🇦🇪', name: 'UAE'              },
  { code: 'SA', flag: '🇸🇦', name: 'Saudi Arabia'     },
  { code: 'IL', flag: '🇮🇱', name: 'Israel'           },
  { code: 'MX', flag: '🇲🇽', name: 'Mexico'           },
  { code: 'BR', flag: '🇧🇷', name: 'Brazil'           },
  { code: 'AR', flag: '🇦🇷', name: 'Argentina'        },
  { code: 'CL', flag: '🇨🇱', name: 'Chile'            },
  { code: 'CO', flag: '🇨🇴', name: 'Colombia'         },
  { code: 'ZA', flag: '🇿🇦', name: 'South Africa'     },
  { code: 'NG', flag: '🇳🇬', name: 'Nigeria'          },
  { code: 'EG', flag: '🇪🇬', name: 'Egypt'            },
  { code: 'NZ', flag: '🇳🇿', name: 'New Zealand'      },
  { code: 'TH', flag: '🇹🇭', name: 'Thailand'         },
  { code: 'MY', flag: '🇲🇾', name: 'Malaysia'         },
  { code: 'PH', flag: '🇵🇭', name: 'Philippines'      },
  { code: 'ID', flag: '🇮🇩', name: 'Indonesia'        },
  { code: 'VN', flag: '🇻🇳', name: 'Vietnam'          },
  { code: 'PK', flag: '🇵🇰', name: 'Pakistan'         },
  { code: 'BD', flag: '🇧🇩', name: 'Bangladesh'       },
  { code: 'TW', flag: '🇹🇼', name: 'Taiwan'           },
]

const IBAN_LENGTHS = {
  AT: 20, BE: 16, BG: 22, HR: 21, CY: 28, CZ: 24,
  DK: 18, EE: 20, FI: 18, FR: 27, DE: 22, GR: 27,
  HU: 28, IE: 22, IT: 27, LV: 21, LT: 20, LU: 20,
  MT: 31, NL: 18, PL: 28, PT: 25, RO: 24, SK: 24,
  SI: 19, ES: 24, SE: 24, GB: 22, NO: 15, CH: 21,
  AE: 23, SA: 24, IL: 23,
}

const PURPOSES = [
  'Family Support / Personal',
  'Business Payment',
  'Invoice Payment',
  'Real Estate Purchase',
  'Education / Tuition',
  'Medical Expenses',
  'Travel & Tourism',
  'Investment',
  'Loan Repayment',
  'Other',
]

// ── Helpers ──────────────────────────────────────────────────────────
function nextBusinessDay() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

function fmtUSD(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(n)
}

function fmtForeign(n, code) {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: code, minimumFractionDigits: 2 }).format(n)
  } catch {
    return `${n.toFixed(2)} ${code}`
  }
}

function formatIBAN(str) {
  const stripped = str.replace(/\s/g, '').toUpperCase()
  return stripped.match(/.{1,4}/g)?.join(' ') || stripped
}

function validateSWIFT(code) {
  return /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(code.replace(/\s/g, ''))
}

function maskAccount(val) {
  const stripped = val.replace(/\s/g, '')
  if (stripped.length <= 4) return stripped
  return '•'.repeat(stripped.length - 4) + stripped.slice(-4)
}

// ── Searchable Select — defined OUTSIDE to prevent re-mount on parent re-render ──
function SearchableSelect({ options, value, onChange, placeholder, error }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const selected = options.find(o => o.code === value)
  const filtered = options.filter(o =>
    o.name.toLowerCase().includes(search.toLowerCase()) ||
    o.code.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div style={{ position: 'relative', marginBottom: 14 }}>
      <button
        type="button"
        className={`modal-input wire-select-btn${error ? ' wire-input--error' : ''}`}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, cursor: 'pointer', marginBottom: 0 }}
        onClick={() => { setOpen(o => !o); setSearch('') }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selected
            ? `${selected.flag}  ${selected.code} — ${selected.name}`
            : <span style={{ color: '#aaa' }}>{placeholder}</span>
          }
        </span>
        <span style={{ color: '#888', fontSize: 11, flexShrink: 0 }}>▾</span>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 200,
          background: '#fff', border: '1px solid var(--gray-border)', borderRadius: 4,
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)', maxHeight: 240, display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--gray-border)', flexShrink: 0 }}>
            <input
              autoFocus
              placeholder="Search…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', border: '1px solid var(--gray-border)', borderRadius: 4, padding: '5px 8px', fontSize: 13, outline: 'none' }}
            />
          </div>
          <div style={{ overflowY: 'auto' }}>
            {filtered.map(o => (
              <button
                key={o.code}
                type="button"
                style={{
                  width: '100%', textAlign: 'left', padding: '8px 12px', border: 'none',
                  background: o.code === value ? '#F0F4FB' : '#fff',
                  color: o.code === value ? 'var(--chase-blue)' : 'var(--text-dark)',
                  fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                }}
                onClick={() => { onChange(o.code); setOpen(false); setSearch('') }}
              >
                <span style={{ fontSize: 16, lineHeight: 1 }}>{o.flag}</span>
                <span style={{ fontWeight: 600 }}>{o.code}</span>
                <span style={{ color: '#666' }}>— {o.name}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <div style={{ padding: '12px', fontSize: 13, color: '#aaa', textAlign: 'center' }}>No results</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Progress Bar — defined OUTSIDE to prevent re-mount ───────────────
function WireProgress({ step }) {
  const steps = ['Fill Form', 'Review', 'Confirm', 'Done']
  const activeIdx = step === 'form' ? 0 : step === 'review' ? 1 : step === 'confirm' ? 2 : 3
  return (
    <div className="wire-progress">
      {steps.map((label, i) => (
        <div key={label} className="wire-progress__step">
          <div className={`wire-progress__circle${i < activeIdx ? ' wire-progress__circle--done' : i === activeIdx ? ' wire-progress__circle--active' : ''}`}>
            {i < activeIdx ? '✓' : i + 1}
          </div>
          <span className={`wire-progress__label${i < activeIdx ? ' wire-progress__label--done' : i === activeIdx ? ' wire-progress__label--active' : ''}`}>
            {label}
          </span>
          {i < steps.length - 1 && (
            <div className={`wire-progress__line${i < activeIdx ? ' wire-progress__line--done' : ''}`} />
          )}
        </div>
      ))}
    </div>
  )
}

// ── Field wrapper — defined OUTSIDE to prevent re-mount on every keystroke ──
function WireField({ label, children, err, tooltip }) {
  return (
    <div>
      <div className="wire-label-row">
        <span className="wire-label-text">{label}</span>
        {tooltip && (
          <span className="wire-tooltip" data-tip={tooltip}>?</span>
        )}
      </div>
      {children}
      {err && <div className="wire-error-text">{err}</div>}
    </div>
  )
}

// ── Main Export ───────────────────────────────────────────────────────
export default function TransferModal({ onClose, onAdd, currentBalance }) {
  const [tab, setTab] = useState('deposit')

  // Deposit / Withdraw state
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  // Wire step: 'form' | 'review' | 'done'
  const [wireStep, setWireStep] = useState('form')
  const [wireRef, setWireRef] = useState('')

  // Section 1 — Your Account
  const [wireAmount, setWireAmount] = useState('')
  const [wireCurrency, setWireCurrency] = useState('EUR')

  // Section 2 — Recipient Info
  const [recipientName, setRecipientName] = useState('')
  const [recipientAddr1, setRecipientAddr1] = useState('')
  const [recipientAddr2, setRecipientAddr2] = useState('')
  const [recipientCity, setRecipientCity] = useState('')
  const [recipientState, setRecipientState] = useState('')
  const [recipientPostal, setRecipientPostal] = useState('')
  const [recipientCountry, setRecipientCountry] = useState('')

  // Section 3 — Bank Details
  const [bankName, setBankName] = useState('')
  const [bankCountry, setBankCountry] = useState('')
  const [bankAddress, setBankAddress] = useState('')
  const [bankCity, setBankCity] = useState('')
  const [swiftCode, setSwiftCode] = useState('')
  const [accountType, setAccountType] = useState('iban')
  const [ibanValue, setIbanValue] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [confirmAccount, setConfirmAccount] = useState('')
  const [useIntermediary, setUseIntermediary] = useState(false)
  const [interBankName, setInterBankName] = useState('')
  const [interSwift, setInterSwift] = useState('')
  const [interAccount, setInterAccount] = useState('')

  // Section 4 — Transfer Details
  const [wireDate, setWireDate] = useState(nextBusinessDay)
  const [wirePurpose, setWirePurpose] = useState('')
  const [wireReference, setWireReference] = useState('')
  const [wireInternalRef, setWireInternalRef] = useState('')

  // Compliance (2 checkboxes — fee checkbox removed)
  const [chk1, setChk1] = useState(false)
  const [chk2, setChk2] = useState(false)

  // Validation errors
  const [wireErrors, setWireErrors] = useState({})

  // Computed
  const selCurrency = CURRENCIES.find(c => c.code === wireCurrency)
  const rate = selCurrency?.rate || 1
  const amountNum = parseFloat(wireAmount) || 0
  const recipientReceives = amountNum * rate

  const ibanStripped = ibanValue.replace(/\s/g, '')
  const expectedIbanLen = IBAN_LENGTHS[recipientCountry]
  const ibanValid = ibanStripped.length >= 15 && (!expectedIbanLen || ibanStripped.length === expectedIbanLen)
  const swiftValid = swiftCode.length >= 8 && validateSWIFT(swiftCode)

  const selRecipientCountry = COUNTRIES.find(c => c.code === recipientCountry)

  // ── Deposit / Withdraw submit ────────────────────────────────────
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

  // ── Wire validation ──────────────────────────────────────────────
  const validateWire = () => {
    const errs = {}
    if (!wireAmount || amountNum <= 0) errs.wireAmount = 'Enter a valid amount'
    if (!recipientName.trim()) errs.recipientName = 'Required'
    if (!recipientAddr1.trim()) errs.recipientAddr1 = 'Required'
    if (!recipientCity.trim()) errs.recipientCity = 'Required'
    if (!recipientCountry) errs.recipientCountry = 'Required'
    if (!bankName.trim()) errs.bankName = 'Required'
    if (!bankCountry) errs.bankCountry = 'Required'
    if (!swiftCode || !validateSWIFT(swiftCode)) errs.swiftCode = 'Invalid SWIFT/BIC — must be 8 or 11 characters'
    if (accountType === 'iban') {
      if (!ibanStripped) errs.ibanValue = 'Required'
      else if (expectedIbanLen && ibanStripped.length !== expectedIbanLen) {
        errs.ibanValue = `${recipientCountry} IBAN must be ${expectedIbanLen} characters (currently ${ibanStripped.length})`
      }
    } else {
      if (!accountNumber.trim()) errs.accountNumber = 'Required'
      if (accountNumber !== confirmAccount) errs.confirmAccount = 'Account numbers do not match'
    }
    if (!wirePurpose) errs.wirePurpose = 'Required'
    if (!chk1 || !chk2) errs.compliance = 'All checkboxes must be checked'
    setWireErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleWireReview = () => {
    if (validateWire()) setWireStep('review')
    else document.querySelector('.modal-sheet--wide')?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleWireConfirm = () => {
    const ref = `WIRE-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`
    setWireRef(ref)
    onAdd({
      description: `INTL WIRE - ${recipientName.toUpperCase()}`,
      type: 'Transfer',
      amount: -amountNum,
      date: wireDate,
    })
    setWireStep('done')
  }

  const resetTab = (t) => {
    setTab(t)
    setError('')
    setWireStep('form')
    setWireErrors({})
  }

  // ── Render ───────────────────────────────────────────────────────
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-sheet${tab === 'wire' ? ' modal-sheet--wide' : ''}`}
        onClick={e => e.stopPropagation()}
        style={tab === 'wire' ? { alignSelf: 'flex-start', marginTop: 20, marginBottom: 20 } : {}}
      >
        <div className="modal-header">
          <span className="modal-title">Transfer</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div className="modal-tabs">
          {['deposit', 'withdraw', 'wire'].map(t => (
            <button
              key={t}
              className={`modal-tab${tab === t ? ' modal-tab--active' : ''}`}
              onClick={() => resetTab(t)}
            >
              {t === 'wire' ? 'Intl Wire' : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* ── Deposit / Withdraw ── */}
        {(tab === 'deposit' || tab === 'withdraw') && (
          <form onSubmit={handleSubmit}>
            <label className="modal-label">Amount ($)</label>
            <input
              className="modal-input"
              type="number" min="0.01" step="0.01" placeholder="0.00"
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
        )}

        {/* ── International Wire Transfer ── */}
        {tab === 'wire' && (
          <>
            {/* Header banner */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-dark)', marginBottom: 4 }}>
                International Wire Transfer
              </div>
              <div style={{ fontSize: 13, color: 'var(--gray-text)', marginBottom: 14 }}>
                Send money worldwide — typically delivers in 1–5 business days
              </div>
              <div className="wire-warning-amber">
                ⚠ International wires cannot be cancelled once submitted. Please review all details carefully before submitting.
              </div>
            </div>

            <WireProgress step={wireStep} />

            {/* ════════ STEP 1: FORM ════════ */}
            {wireStep === 'form' && (
              <>
                {/* Section 1 — Your Account */}
                <div className="wire-section">
                  <div className="wire-section__header">
                    <div className="wire-section__title">1. Your Account</div>
                  </div>
                  <div className="wire-section__body">
                    <div style={{ marginBottom: 16 }}>
                      <div className="wire-label-text" style={{ marginBottom: 5 }}>From Account</div>
                      <div className="modal-input" style={{ background: 'var(--gray-bg)', color: 'var(--text-dark)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>BUS COMP... (...9193) — Business Checking</span>
                      </div>
                      {currentBalance != null && (
                        <div style={{ fontSize: 12, color: 'var(--gray-text)', marginTop: 5 }}>
                          Available balance: <strong>{fmtUSD(currentBalance)}</strong>
                        </div>
                      )}
                    </div>

                    <WireField label="Amount to Send ($)" err={wireErrors.wireAmount}>
                      <div className="wire-amount-row">
                        <input
                          className={`modal-input${wireErrors.wireAmount ? ' wire-input--error' : ''}`}
                          type="number" min="0.01" step="0.01" placeholder="0.00"
                          value={wireAmount}
                          onChange={e => { setWireAmount(e.target.value); setWireErrors(p => ({ ...p, wireAmount: '' })) }}
                        />
                        <span className="wire-currency-label">USD</span>
                      </div>
                      {currentBalance != null && (
                        <div style={{ fontSize: 12, color: 'var(--gray-text)', marginTop: -10, marginBottom: 10 }}>
                          Amount to send cannot exceed available balance ({fmtUSD(currentBalance)})
                        </div>
                      )}
                    </WireField>

                    <WireField label="Currency to Deliver" err={wireErrors.wireCurrency}>
                      <SearchableSelect
                        options={CURRENCIES}
                        value={wireCurrency}
                        onChange={v => setWireCurrency(v)}
                        placeholder="Select currency…"
                        error={wireErrors.wireCurrency}
                      />
                    </WireField>

                    {selCurrency && (
                      <div className="wire-rate-box">
                        ℹ️ &nbsp;1 USD = <strong>{selCurrency.rate} {selCurrency.code}</strong> — Rate valid for 30 minutes
                      </div>
                    )}

                    {amountNum > 0 && (
                      <div style={{ marginBottom: 14 }}>
                        <div className="wire-label-text" style={{ marginBottom: 5 }}>Recipient Receives (estimated)</div>
                        <input
                          className="modal-input"
                          readOnly
                          value={fmtForeign(recipientReceives, wireCurrency)}
                          style={{ background: 'var(--gray-bg)', color: 'var(--gray-text)' }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 2 — Recipient Information */}
                <div className="wire-section">
                  <div className="wire-section__header">
                    <div className="wire-section__title">2. Recipient Information</div>
                  </div>
                  <div className="wire-section__body">
                    <WireField label="Recipient Full Name (as it appears on bank account)" err={wireErrors.recipientName}>
                      <input
                        className={`modal-input${wireErrors.recipientName ? ' wire-input--error' : ''}`}
                        placeholder="Full legal name"
                        value={recipientName}
                        onChange={e => { setRecipientName(e.target.value); setWireErrors(p => ({ ...p, recipientName: '' })) }}
                      />
                    </WireField>

                    <WireField label="Address Line 1" err={wireErrors.recipientAddr1}>
                      <input
                        className={`modal-input${wireErrors.recipientAddr1 ? ' wire-input--error' : ''}`}
                        placeholder="Street address"
                        value={recipientAddr1}
                        onChange={e => { setRecipientAddr1(e.target.value); setWireErrors(p => ({ ...p, recipientAddr1: '' })) }}
                      />
                    </WireField>

                    <WireField label="Address Line 2 (optional)">
                      <input
                        className="modal-input"
                        placeholder="Apartment, suite, unit, etc."
                        value={recipientAddr2}
                        onChange={e => setRecipientAddr2(e.target.value)}
                      />
                    </WireField>

                    <div className="wire-grid-2">
                      <WireField label="City" err={wireErrors.recipientCity}>
                        <input
                          className={`modal-input${wireErrors.recipientCity ? ' wire-input--error' : ''}`}
                          placeholder="City"
                          value={recipientCity}
                          onChange={e => { setRecipientCity(e.target.value); setWireErrors(p => ({ ...p, recipientCity: '' })) }}
                        />
                      </WireField>
                      <WireField label="State / Province / Region">
                        <input
                          className="modal-input"
                          placeholder="State or region"
                          value={recipientState}
                          onChange={e => setRecipientState(e.target.value)}
                        />
                      </WireField>
                    </div>

                    <div className="wire-grid-2">
                      <WireField label="Postal Code">
                        <input
                          className="modal-input"
                          placeholder="Postal / ZIP code"
                          value={recipientPostal}
                          onChange={e => setRecipientPostal(e.target.value)}
                        />
                      </WireField>
                      <WireField label="Recipient Country" err={wireErrors.recipientCountry}>
                        <SearchableSelect
                          options={COUNTRIES}
                          value={recipientCountry}
                          onChange={v => { setRecipientCountry(v); setWireErrors(p => ({ ...p, recipientCountry: '' })) }}
                          placeholder="Select country…"
                          error={wireErrors.recipientCountry}
                        />
                      </WireField>
                    </div>
                  </div>
                </div>

                {/* Section 3 — Recipient Bank Details */}
                <div className="wire-section">
                  <div className="wire-section__header">
                    <div className="wire-section__title">3. Recipient Bank Details</div>
                  </div>
                  <div className="wire-section__body">
                    <div className="wire-grid-2">
                      <WireField label="Bank Name" err={wireErrors.bankName}>
                        <input
                          className={`modal-input${wireErrors.bankName ? ' wire-input--error' : ''}`}
                          placeholder="e.g. Deutsche Bank"
                          value={bankName}
                          onChange={e => { setBankName(e.target.value); setWireErrors(p => ({ ...p, bankName: '' })) }}
                        />
                      </WireField>
                      <WireField label="Bank Country" err={wireErrors.bankCountry}>
                        <SearchableSelect
                          options={COUNTRIES}
                          value={bankCountry}
                          onChange={v => { setBankCountry(v); setWireErrors(p => ({ ...p, bankCountry: '' })) }}
                          placeholder="Select country…"
                          error={wireErrors.bankCountry}
                        />
                      </WireField>
                    </div>

                    <div className="wire-grid-2">
                      <WireField label="Bank Address">
                        <input
                          className="modal-input"
                          placeholder="Bank street address"
                          value={bankAddress}
                          onChange={e => setBankAddress(e.target.value)}
                        />
                      </WireField>
                      <WireField label="Bank City">
                        <input
                          className="modal-input"
                          placeholder="Bank city"
                          value={bankCity}
                          onChange={e => setBankCity(e.target.value)}
                        />
                      </WireField>
                    </div>

                    <WireField
                      label="SWIFT / BIC Code"
                      err={wireErrors.swiftCode}
                      tooltip="The SWIFT/BIC code identifies your recipient's bank internationally. Find it on their bank statement or website."
                    >
                      <input
                        className={`modal-input${wireErrors.swiftCode ? ' wire-input--error' : ''}`}
                        placeholder="e.g. CHASUS33 or BTRLRO22"
                        value={swiftCode}
                        onChange={e => {
                          const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')
                          setSwiftCode(val)
                          setWireErrors(p => ({ ...p, swiftCode: '' }))
                        }}
                        maxLength={11}
                      />
                      <div className="wire-swift-hint">
                        Format: AAAABBCC or AAAABBCCXXX (8 or 11 characters)
                        {swiftValid && <span style={{ color: 'var(--success)', marginLeft: 8 }}>✓ Valid</span>}
                      </div>
                    </WireField>

                    {/* Account type toggle */}
                    <div style={{ marginBottom: 5 }}>
                      <div className="wire-label-text" style={{ marginBottom: 8 }}>Account Number / IBAN</div>
                      <div className="wire-account-toggle">
                        <button
                          type="button"
                          className={`wire-account-opt${accountType === 'iban' ? ' wire-account-opt--active' : ''}`}
                          onClick={() => setAccountType('iban')}
                        >
                          <input type="radio" readOnly checked={accountType === 'iban'} style={{ accentColor: 'var(--chase-blue)' }} />
                          IBAN <span style={{ fontSize: 11, fontWeight: 400 }}>(Europe, Middle East)</span>
                        </button>
                        <button
                          type="button"
                          className={`wire-account-opt${accountType === 'account' ? ' wire-account-opt--active' : ''}`}
                          onClick={() => setAccountType('account')}
                        >
                          <input type="radio" readOnly checked={accountType === 'account'} style={{ accentColor: 'var(--chase-blue)' }} />
                          Account Number <span style={{ fontSize: 11, fontWeight: 400 }}>(US, Asia)</span>
                        </button>
                      </div>
                    </div>

                    {accountType === 'iban' && (
                      <WireField label="" err={wireErrors.ibanValue}>
                        <div className="wire-iban-row">
                          <input
                            className={`modal-input${wireErrors.ibanValue ? ' wire-input--error' : ''}`}
                            style={{ flex: 1, marginBottom: 0 }}
                            placeholder="e.g. RO49 AAAA 1B31 0075 9384 0000"
                            value={ibanValue}
                            onChange={e => {
                              setIbanValue(formatIBAN(e.target.value))
                              setWireErrors(p => ({ ...p, ibanValue: '' }))
                            }}
                          />
                          {ibanValid && <span className="wire-iban-valid">✓</span>}
                        </div>
                        {expectedIbanLen && (
                          <div className="wire-swift-hint">
                            {recipientCountry} IBAN: {expectedIbanLen} characters
                            {ibanStripped.length > 0 && ` (${ibanStripped.length} entered)`}
                          </div>
                        )}
                      </WireField>
                    )}

                    {accountType === 'account' && (
                      <>
                        <WireField label="Account Number" err={wireErrors.accountNumber}>
                          <input
                            className={`modal-input${wireErrors.accountNumber ? ' wire-input--error' : ''}`}
                            placeholder="Account number"
                            value={accountNumber}
                            onChange={e => { setAccountNumber(e.target.value); setWireErrors(p => ({ ...p, accountNumber: '' })) }}
                          />
                        </WireField>
                        <WireField label="Confirm Account Number" err={wireErrors.confirmAccount}>
                          <input
                            className={`modal-input${wireErrors.confirmAccount ? ' wire-input--error' : ''}`}
                            placeholder="Re-enter account number"
                            value={confirmAccount}
                            onChange={e => { setConfirmAccount(e.target.value); setWireErrors(p => ({ ...p, confirmAccount: '' })) }}
                          />
                        </WireField>
                      </>
                    )}

                    {/* Intermediary Bank */}
                    <label className="wire-intermediary-toggle">
                      <input
                        type="checkbox"
                        checked={useIntermediary}
                        onChange={e => setUseIntermediary(e.target.checked)}
                        style={{ accentColor: 'var(--chase-blue)' }}
                      />
                      My recipient's bank requires an intermediary bank
                    </label>
                    {useIntermediary && (
                      <div className="wire-intermediary-body">
                        <WireField label="Intermediary Bank Name">
                          <input className="modal-input" placeholder="Bank name" value={interBankName} onChange={e => setInterBankName(e.target.value)} />
                        </WireField>
                        <WireField label="Intermediary SWIFT / BIC">
                          <input
                            className="modal-input"
                            placeholder="e.g. CHASUS33"
                            value={interSwift}
                            onChange={e => setInterSwift(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
                            maxLength={11}
                          />
                        </WireField>
                        <WireField label="Intermediary Account Number">
                          <input className="modal-input" placeholder="Account number" value={interAccount} onChange={e => setInterAccount(e.target.value)} />
                        </WireField>
                        <div className="wire-intermediary-note">
                          Some banks in certain countries require an intermediary (correspondent) bank to process international wires.
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 4 — Transfer Details */}
                <div className="wire-section">
                  <div className="wire-section__header">
                    <div className="wire-section__title">4. Transfer Details</div>
                  </div>
                  <div className="wire-section__body">
                    <div className="wire-grid-2">
                      <WireField label="Transfer Date">
                        <input
                          className="modal-input"
                          type="date"
                          min={nextBusinessDay()}
                          value={wireDate}
                          onChange={e => setWireDate(e.target.value)}
                        />
                      </WireField>
                      <WireField label="Purpose of Transfer (required by law)" err={wireErrors.wirePurpose}>
                        <select
                          className={`modal-select${wireErrors.wirePurpose ? ' wire-input--error' : ''}`}
                          value={wirePurpose}
                          onChange={e => { setWirePurpose(e.target.value); setWireErrors(p => ({ ...p, wirePurpose: '' })) }}
                        >
                          <option value="">Select purpose…</option>
                          {PURPOSES.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </WireField>
                    </div>

                    <WireField label="Reference / Message for Recipient">
                      <input
                        className="modal-input"
                        placeholder="This message will appear on the recipient's bank statement"
                        value={wireReference}
                        maxLength={140}
                        onChange={e => setWireReference(e.target.value)}
                      />
                      <div className="wire-char-counter">{wireReference.length}/140</div>
                    </WireField>

                    <WireField label="Your Reference (internal memo, optional)">
                      <input
                        className="modal-input"
                        placeholder="Internal reference number or note"
                        value={wireInternalRef}
                        onChange={e => setWireInternalRef(e.target.value)}
                      />
                    </WireField>
                  </div>
                </div>

                {/* Section 5 — Compliance */}
                <div className="wire-section">
                  <div className="wire-section__header">
                    <div className="wire-section__title">5. Compliance &amp; Legal</div>
                  </div>
                  <div className="wire-section__body">
                    <div className="wire-compliance-box">
                      Federal law requires us to collect information about international wire transfers over $1,000. This information may be reported to government agencies.
                    </div>

                    {wireErrors.compliance && (
                      <div className="modal-error">{wireErrors.compliance}</div>
                    )}

                    <label className="wire-checkbox-row">
                      <input type="checkbox" checked={chk1} onChange={e => { setChk1(e.target.checked); setWireErrors(p => ({ ...p, compliance: '' })) }} />
                      I confirm the recipient information is accurate and complete
                    </label>
                    <label className="wire-checkbox-row">
                      <input type="checkbox" checked={chk2} onChange={e => { setChk2(e.target.checked); setWireErrors(p => ({ ...p, compliance: '' })) }} />
                      I understand this transfer cannot be cancelled once submitted
                    </label>
                  </div>
                </div>

                <button type="button" className="modal-submit" onClick={handleWireReview}>
                  Review Transfer →
                </button>
              </>
            )}

            {/* ════════ STEP 2: REVIEW ════════ */}
            {wireStep === 'review' && (
              <>
                <div className="wire-review-grid">
                  <div className="wire-review-col">
                    <div className="wire-review-col__title">Transfer Details</div>
                    <div className="wire-review-row">
                      <span className="wire-review-row__key">Amount Sent</span>
                      <span className="wire-review-row__val">{fmtUSD(amountNum)} USD</span>
                    </div>
                    <div className="wire-review-row">
                      <span className="wire-review-row__key">Recipient Receives</span>
                      <span className="wire-review-row__val">{fmtForeign(recipientReceives, wireCurrency)} {wireCurrency}</span>
                    </div>
                    <div className="wire-review-row">
                      <span className="wire-review-row__key">Exchange Rate</span>
                      <span className="wire-review-row__val">1 USD = {rate} {wireCurrency}</span>
                    </div>
                    <div className="wire-review-row">
                      <span className="wire-review-row__key">Transfer Date</span>
                      <span className="wire-review-row__val">{wireDate}</span>
                    </div>
                    <div className="wire-review-row">
                      <span className="wire-review-row__key">Purpose</span>
                      <span className="wire-review-row__val">{wirePurpose}</span>
                    </div>
                  </div>

                  <div className="wire-review-col">
                    <div className="wire-review-col__title">Recipient Details</div>
                    <div className="wire-review-row">
                      <span className="wire-review-row__key">Name</span>
                      <span className="wire-review-row__val">{recipientName}</span>
                    </div>
                    <div className="wire-review-row">
                      <span className="wire-review-row__key">Bank</span>
                      <span className="wire-review-row__val">{bankName}</span>
                    </div>
                    <div className="wire-review-row">
                      <span className="wire-review-row__key">SWIFT / BIC</span>
                      <span className="wire-review-row__val">{swiftCode}</span>
                    </div>
                    <div className="wire-review-row">
                      <span className="wire-review-row__key">{accountType === 'iban' ? 'IBAN' : 'Account'}</span>
                      <span className="wire-review-row__val">
                        {maskAccount(accountType === 'iban' ? ibanStripped : accountNumber)}
                      </span>
                    </div>
                    <div className="wire-review-row">
                      <span className="wire-review-row__key">Country</span>
                      <span className="wire-review-row__val">
                        {selRecipientCountry ? `${selRecipientCountry.flag} ${selRecipientCountry.name}` : recipientCountry}
                      </span>
                    </div>
                    {wireReference && (
                      <div className="wire-review-row">
                        <span className="wire-review-row__key">Reference</span>
                        <span className="wire-review-row__val">{wireReference}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="wire-warning-red">
                  ⚠ Once submitted, international wire transfers cannot be reversed. Chase is not responsible for delays caused by the recipient's bank.
                </div>

                <div className="wire-review-btns">
                  <button type="button" className="wire-edit-btn" onClick={() => setWireStep('form')}>
                    ← Edit Details
                  </button>
                  <button type="button" className="wire-confirm-btn" onClick={handleWireConfirm}>
                    Confirm &amp; Submit Wire
                  </button>
                </div>
              </>
            )}

            {/* ════════ STEP 3: DONE ════════ */}
            {wireStep === 'done' && (
              <div className="wire-done">
                <div className="wire-done__icon">✓</div>
                <div className="wire-done__title">International Wire Transfer Submitted</div>
                <div className="wire-done__ref">{wireRef}</div>
                <div className="wire-done__delivery">⏱ Expected Delivery: 1–5 business days</div>
                <div className="wire-done__email">You will receive an email confirmation at a•••••n@example.com</div>

                <div className="wire-done__summary">
                  <div className="wire-review-row">
                    <span className="wire-review-row__key">Recipient</span>
                    <span className="wire-review-row__val">{recipientName}</span>
                  </div>
                  <div className="wire-review-row">
                    <span className="wire-review-row__key">Amount Sent</span>
                    <span className="wire-review-row__val">{fmtUSD(amountNum)}</span>
                  </div>
                  <div className="wire-review-row">
                    <span className="wire-review-row__key">Recipient Receives</span>
                    <span className="wire-review-row__val">{fmtForeign(recipientReceives, wireCurrency)} {wireCurrency}</span>
                  </div>
                  <div className="wire-review-row">
                    <span className="wire-review-row__key">Bank</span>
                    <span className="wire-review-row__val">{bankName}</span>
                  </div>
                  <div className="wire-review-row">
                    <span className="wire-review-row__key">SWIFT / BIC</span>
                    <span className="wire-review-row__val">{swiftCode}</span>
                  </div>
                  <div className="wire-review-row">
                    <span className="wire-review-row__key">Country</span>
                    <span className="wire-review-row__val">
                      {selRecipientCountry ? `${selRecipientCountry.flag} ${selRecipientCountry.name}` : recipientCountry}
                    </span>
                  </div>
                  <div className="wire-review-row">
                    <span className="wire-review-row__key">Transfer Date</span>
                    <span className="wire-review-row__val">{wireDate}</span>
                  </div>
                </div>

                <div className="wire-done__btns">
                  <button type="button" className="wire-done__btn-outline" onClick={onClose}>
                    Track this Transfer
                  </button>
                  <button type="button" className="wire-done__btn-primary" onClick={onClose}>
                    Return to Dashboard
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
