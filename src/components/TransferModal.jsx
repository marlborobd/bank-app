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

const US_STATES = [
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }, { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' }, { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' }, { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' }, { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' }, { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' }, { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' }, { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' }, { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' }, { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' }, { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' }, { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' }, { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' }, { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' }, { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' }, { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' }, { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' },
]

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

const SPEEDS = [
  { value: 'instant',  label: 'Instant Transfer',    desc: 'Available immediately'              },
  { value: 'sameday',  label: 'Same Day',             desc: 'By end of business day'             },
  { value: 'nextday',  label: 'Next Business Day',    desc: 'By 9:00 PM next business day'       },
  { value: 'standard', label: 'Standard',             desc: '1-3 business days'                  },
]

function deliveryMsg(speed) {
  switch (speed) {
    case 'instant':  return 'Funds delivered immediately'
    case 'sameday':  return 'Expected delivery: today by 6:00 PM'
    case 'nextday':  return 'Expected delivery: next business day by 9:00 PM'
    case 'standard': return 'Expected delivery: 1-3 business days'
    default:         return ''
  }
}

function speedLabel(speed) {
  return SPEEDS.find(s => s.value === speed)?.label || speed
}

// ── Helpers ──────────────────────────────────────────────────────────
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

function lookupBank(digits) {
  if (digits.length < 3) return null
  const prefix = digits.slice(0, 3)
  const map = { '021': 'JPMorgan Chase', '026': 'Bank of America', '071': 'US Bank National Association', '322': 'Wells Fargo Bank', '267': 'Citibank' }
  return map[prefix] || null
}

function formatRoutingNumber(val) {
  const digits = val.replace(/\D/g, '').slice(0, 9)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
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

  // Wire screen: 'landing'|'step1'|'step2'|'step3'|'review'|'done'
  const [wireScreen, setWireScreen] = useState('landing')
  const [wireRef, setWireRef] = useState('')

  // Step 1 — Bank account details
  const [bankCountry, setBankCountry] = useState('US')
  const [routingNumber, setRoutingNumber] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [confirmAccount, setConfirmAccount] = useState('')
  const [showOtherRouting, setShowOtherRouting] = useState(false)

  // Step 1 — Bank institution details (optional)
  const [bankName, setBankName] = useState('')
  const [swiftCode, setSwiftCode] = useState('')
  const [bankAddress, setBankAddress] = useState('')
  const [bankCity, setBankCity] = useState('')
  const [bankState, setBankState] = useState('')
  const [bankZip, setBankZip] = useState('')

  // Step 2 — Recipient details
  const [recipientName, setRecipientName] = useState('')
  const [nickname, setNickname] = useState('')
  const [recipientCountry, setRecipientCountry] = useState('US')
  const [address, setAddress] = useState('')
  const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('')
  const [recipientState, setRecipientState] = useState('')
  const [zipCode, setZipCode] = useState('')

  // Step 3 — Wire details
  const [wireAmount, setWireAmount] = useState('')
  const [wireDate, setWireDate] = useState(TODAY)
  const [repeating, setRepeating] = useState(false)
  const [additionalRoutingInfo, setAdditionalRoutingInfo] = useState('')
  const [messageToRecipient, setMessageToRecipient] = useState('')
  const [memo, setMemo] = useState('')
  const [showAdditional, setShowAdditional] = useState(true)

  // Validation errors
  const [wireErrors, setWireErrors] = useState({})

  // Computed
  const amountNum = parseFloat(wireAmount) || 0
  const routingDigits = routingNumber.replace(/\D/g, '')
  const routingValid = routingDigits.length === 9
  const lookedUpBank = lookupBank(routingDigits)
  const accountLast4 = accountNumber.slice(-4)
  const swiftLen = swiftCode.replace(/\s/g, '').length
  const swiftValid = swiftLen === 8 || swiftLen === 11

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

  // ── Wire step validations ─────────────────────────────────────────
  const validateStep1 = () => {
    const errs = {}
    if (routingDigits.length !== 9) errs.routingNumber = 'Routing number must be exactly 9 digits'
    if (!accountNumber.trim()) errs.accountNumber = 'Required'
    if (accountNumber !== confirmAccount) errs.confirmAccount = 'Account numbers do not match'
    setWireErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateStep2 = () => {
    const errs = {}
    if (!recipientName.trim()) errs.recipientName = 'Required'
    setWireErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateStep3 = () => {
    const errs = {}
    if (!wireAmount || amountNum <= 0) errs.wireAmount = 'Enter a valid amount'
    setWireErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleWireConfirm = () => {
    const ref = `WIRE-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`
    setWireRef(ref)
    const bd = {}
    if (bankName.trim())    bd.bankName    = bankName.trim()
    if (swiftCode.trim())   bd.swiftCode   = swiftCode.trim()
    if (bankAddress.trim()) bd.bankAddress = bankAddress.trim()
    if (bankCity.trim())    bd.bankCity    = bankCity.trim()
    if (bankState)          bd.bankState   = bankState
    if (bankZip.trim())     bd.bankZip     = bankZip.trim()
    onAdd({
      description: `NAT TRANSFER - ${recipientName.toUpperCase()}`,
      type: 'Transfer',
      amount: -amountNum,
      date: TODAY,
      ...(Object.keys(bd).length > 0 ? { bankDetails: bd } : {}),
    })
    setWireScreen('done')
  }

  const resetTab = (t) => {
    setTab(t)
    setError('')
    setWireScreen('landing')
    setWireErrors({})
  }

  // ── Render ───────────────────────────────────────────────────────
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-sheet${tab === 'wire' ? ' modal-sheet--xl' : ''}`}
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
              {t === 'wire' ? 'National Transfer' : t.charAt(0).toUpperCase() + t.slice(1)}
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

        {/* ── National Transfer ── */}
        {tab === 'wire' && (
          <>
            {/* Sub-navigation */}
            <div className="cc-wire-subnav">
              <button className="cc-wire-subnav__tab cc-wire-subnav__tab--active">Wires &amp; global transfers</button>
              <button className="cc-wire-subnav__tab">Send money</button>
              <button className="cc-wire-subnav__tab">Payment activity</button>
              <button className="cc-wire-subnav__tab">Manage recipients</button>
              <button className="cc-wire-subnav__tab">Help &amp; support ▾</button>
            </div>

            {/* ════════ SCREEN 0: LANDING ════════ */}
            {wireScreen === 'landing' && (
              <div className="cc-wire-landing">
                <div className="cc-wire-landing__icon">≡$</div>
                <div className="cc-wire-landing__title">Send money safely for the payments that matter most</div>
                <div className="cc-wire-landing__subtabs">
                  <button className="cc-wire-landing__subtab cc-wire-landing__subtab--active">Domestic (U.S.)</button>
                  <button className="cc-wire-landing__subtab">International</button>
                </div>
                <div className="cc-wire-info-grid">
                  <div className="cc-wire-info-card">
                    <div className="cc-wire-info-card__title">📋 What to have ready</div>
                    <ul className="cc-wire-info-card__list">
                      <li>Recipient full name or business name</li>
                      <li>Recipient account and routing numbers</li>
                      <li>Recipient address</li>
                      <li>Mobile device for verification</li>
                    </ul>
                    <button className="cc-wire-info-card__link">Learn more about what to have ready &gt;</button>
                  </div>
                  <div className="cc-wire-info-card">
                    <div className="cc-wire-info-card__title">⏱ Delivery time</div>
                    <div className="cc-wire-info-card__body">
                      Most domestic wires arrive within 1 business day. You can check your status on the "Payment activity" page.
                    </div>
                    <button className="cc-wire-info-card__link">Learn more about delivery time &gt;</button>
                  </div>
                  <div className="cc-wire-info-card">
                    <div className="cc-wire-info-card__title">📅 Daily limit</div>
                    <div className="cc-wire-info-card__body">
                      Your daily online wire limit is $10,000. If you need to send more, contact a member of your Relationship Team.
                    </div>
                  </div>
                  <div className="cc-wire-info-card">
                    <div className="cc-wire-info-card__title">💲 Domestic fees</div>
                    <div className="cc-wire-info-card__body">
                      When you enter your wire info, you'll see the applicable Chase wire transfer fee. Note, your recipient may have charges from their bank that could impact the amount they receive.
                    </div>
                  </div>
                </div>
                <div className="cc-wire-landing__btns">
                  <button className="cc-wire-btn-outline" onClick={() => setWireScreen('step1')}>Add a recipient</button>
                  <button className="cc-wire-btn-primary" onClick={() => setWireScreen('step1')}>Schedule a wire</button>
                </div>
              </div>
            )}

            {/* ════════ STEP 1: BANK DETAILS ════════ */}
            {wireScreen === 'step1' && (
              <>
                <div className="cc-wire-step-indicator">Step 1 of 3</div>
                <div className="cc-wire-step-head">
                  <div className="cc-wire-step-head__icon">👤</div>
                  <div className="cc-wire-step-head__title">Add recipient bank details</div>
                  <div className="cc-wire-step-head__sub">Make sure these details match your recipient's bank records.</div>
                </div>

                <div className="cc-wire-grid-2">
                  <div>
                    <div className="cc-wire-field">
                      <label className="cc-wire-label">Bank country</label>
                      <select className="cc-wire-select" value={bankCountry} onChange={e => setBankCountry(e.target.value)}>
                        {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <div className="cc-wire-field">
                      <label className="cc-wire-label">Wire routing number</label>
                      <div className="cc-wire-input-wrap">
                        <input
                          className={`cc-wire-input${wireErrors.routingNumber ? ' cc-wire-input--error' : ''}`}
                          value={routingNumber}
                          placeholder=""
                          maxLength={11}
                          onChange={e => {
                            setRoutingNumber(formatRoutingNumber(e.target.value))
                            setWireErrors(p => ({ ...p, routingNumber: '' }))
                          }}
                          onBlur={() => {
                            if (routingNumber && routingDigits.length !== 9)
                              setWireErrors(p => ({ ...p, routingNumber: 'Routing number must be exactly 9 digits' }))
                          }}
                        />
                        {routingValid && <span style={{ color: '#006600', fontWeight: 700, flexShrink: 0 }}>✓</span>}
                      </div>
                      <div className="cc-wire-helper">For Chase recipients the routing number is 021000021.</div>
                      {wireErrors.routingNumber && <div className="cc-wire-error-text">{wireErrors.routingNumber}</div>}
                      {routingValid && lookedUpBank && (
                        <div className="cc-wire-bank-box">
                          <div className="cc-wire-bank-box__icon">🏦</div>
                          <div className="cc-wire-bank-box__text">
                            The wire routing number you entered is registered with:<br/>
                            <span className="cc-wire-bank-box__name">{lookedUpBank}</span><br/>
                            If this bank doesn't match the bank on your wire instructions, confirm with your recipient.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="cc-wire-grid-2">
                  <div className="cc-wire-field">
                    <label className="cc-wire-label">Account number</label>
                    <input
                      className={`cc-wire-input${wireErrors.accountNumber ? ' cc-wire-input--error' : ''}`}
                      value={accountNumber}
                      onChange={e => { setAccountNumber(e.target.value); setWireErrors(p => ({ ...p, accountNumber: '' })) }}
                    />
                    <div className="cc-wire-helper">Should not contain spaces or hyphens</div>
                    {wireErrors.accountNumber && <div className="cc-wire-error-text">{wireErrors.accountNumber}</div>}
                  </div>
                  <div className="cc-wire-field">
                    <label className="cc-wire-label">Verify account number</label>
                    <div className="cc-wire-input-wrap">
                      <input
                        className={`cc-wire-input${wireErrors.confirmAccount ? ' cc-wire-input--error' : ''}`}
                        value={confirmAccount}
                        onChange={e => { setConfirmAccount(e.target.value); setWireErrors(p => ({ ...p, confirmAccount: '' })) }}
                      />
                      {confirmAccount && confirmAccount === accountNumber && <span style={{ color: '#006600', fontWeight: 700, flexShrink: 0 }}>✓</span>}
                    </div>
                    {wireErrors.confirmAccount && <div className="cc-wire-error-text">{wireErrors.confirmAccount}</div>}
                  </div>
                </div>

                <button className="cc-wire-collapsible-link" onClick={() => setShowOtherRouting(p => !p)}>
                  {showOtherRouting ? '⊖' : '⊕'} Add other routing instructions (optional)
                </button>
                {showOtherRouting && (
                  <div className="cc-wire-field" style={{ background: '#F8F9FA', padding: '14px', borderRadius: 4, border: '1px solid #D8D8D8', marginBottom: 16 }}>
                    <label className="cc-wire-label">Additional routing instructions</label>
                    <input className="cc-wire-input" placeholder="e.g. intermediary bank information" />
                  </div>
                )}

                {/* Bank Details section */}
                <div style={{ borderTop: '1px solid #D8D8D8', margin: '16px 0 14px' }} />
                <div className="cc-wire-step-head__title" style={{ marginBottom: 14 }}>Bank Details</div>

                <div className="cc-wire-grid-2">
                  <div className="cc-wire-field">
                    <label className="cc-wire-label">Bank Name</label>
                    <input
                      className="cc-wire-input"
                      value={bankName}
                      placeholder="e.g. JPMorgan Chase Bank"
                      onChange={e => setBankName(e.target.value)}
                    />
                  </div>
                  <div className="cc-wire-field">
                    <label className="cc-wire-label">SWIFT / BIC Code</label>
                    <div className="cc-wire-input-wrap">
                      <input
                        className="cc-wire-input"
                        value={swiftCode}
                        placeholder="e.g. CHASUS33"
                        maxLength={11}
                        onChange={e => setSwiftCode(e.target.value.toUpperCase().replace(/\s/g, ''))}
                      />
                      {swiftValid && <span style={{ color: '#006600', fontWeight: 700, flexShrink: 0 }}>✓</span>}
                    </div>
                    <div className="cc-wire-helper">8 or 11 characters, e.g. CHASUS33 or CHASUS33XXX</div>
                  </div>
                </div>

                <div className="cc-wire-grid-2">
                  <div className="cc-wire-field">
                    <label className="cc-wire-label">Bank Address</label>
                    <input
                      className="cc-wire-input"
                      value={bankAddress}
                      placeholder="e.g. 270 Park Avenue"
                      onChange={e => setBankAddress(e.target.value)}
                    />
                  </div>
                  <div className="cc-wire-field">
                    <label className="cc-wire-label">Bank City</label>
                    <input
                      className="cc-wire-input"
                      value={bankCity}
                      placeholder="e.g. New York"
                      onChange={e => setBankCity(e.target.value)}
                    />
                  </div>
                </div>

                <div className="cc-wire-grid-2">
                  <div className="cc-wire-field">
                    <label className="cc-wire-label">Bank State</label>
                    <select className="cc-wire-select" value={bankState} onChange={e => setBankState(e.target.value)}>
                      <option value="">Select state</option>
                      {US_STATES.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
                    </select>
                  </div>
                  <div className="cc-wire-field" style={{ maxWidth: 200 }}>
                    <label className="cc-wire-label">Bank Zip</label>
                    <input
                      className="cc-wire-input"
                      value={bankZip}
                      maxLength={5}
                      placeholder="e.g. 10017"
                      onChange={e => setBankZip(e.target.value.replace(/\D/g, ''))}
                    />
                  </div>
                </div>

                <div className="cc-wire-btns">
                  <button className="cc-wire-btn-cancel" onClick={onClose}>Cancel</button>
                  <button className="cc-wire-btn-next" onClick={() => { if (validateStep1()) setWireScreen('step2') }}>Next</button>
                </div>
              </>
            )}

            {/* ════════ STEP 2: RECIPIENT DETAILS ════════ */}
            {wireScreen === 'step2' && (
              <>
                <div className="cc-wire-step-indicator">Step 2 of 3</div>
                <div className="cc-wire-step-head">
                  <div className="cc-wire-step-head__icon">👤</div>
                  <div className="cc-wire-step-head__title">Add your recipient details</div>
                  <div className="cc-wire-step-head__sub">If the name and address don't match the recipient's bank records, the bank may still deposit the funds to the account number you've entered.</div>
                </div>

                <div className="cc-wire-field">
                  <label className="cc-wire-label">Recipient name</label>
                  <input
                    className={`cc-wire-input${wireErrors.recipientName ? ' cc-wire-input--error' : ''}`}
                    value={recipientName} maxLength={35}
                    onChange={e => { setRecipientName(e.target.value); setWireErrors(p => ({ ...p, recipientName: '' })) }}
                  />
                  <div className="cc-wire-char-counter">{35 - recipientName.length} of 35 characters remaining</div>
                  {wireErrors.recipientName && <div className="cc-wire-error-text">{wireErrors.recipientName}</div>}
                </div>

                <div className="cc-wire-field">
                  <label className="cc-wire-label">Nickname</label>
                  <input className="cc-wire-input" value={nickname} maxLength={35} onChange={e => setNickname(e.target.value)} />
                  <div className="cc-wire-char-counter">{35 - nickname.length} of 35 characters remaining</div>
                </div>

                <div className="cc-wire-field">
                  <label className="cc-wire-label">Recipient country</label>
                  <select className="cc-wire-select" value={recipientCountry} onChange={e => setRecipientCountry(e.target.value)}>
                    {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
                  </select>
                </div>

                <div className="cc-wire-grid-2">
                  <div className="cc-wire-field">
                    <label className="cc-wire-label">Address</label>
                    <div className="cc-wire-input-wrap">
                      <input className="cc-wire-input" value={address} onChange={e => setAddress(e.target.value)} />
                      <span className="cc-wire-input-search-icon">🔍</span>
                    </div>
                  </div>
                  <div className="cc-wire-field">
                    <label className="cc-wire-label">Address line 2 (optional)</label>
                    <input className="cc-wire-input" value={address2} onChange={e => setAddress2(e.target.value)} />
                  </div>
                </div>

                <div className="cc-wire-grid-2">
                  <div className="cc-wire-field">
                    <label className="cc-wire-label">City</label>
                    <input className="cc-wire-input" value={city} onChange={e => setCity(e.target.value)} />
                  </div>
                  <div className="cc-wire-field">
                    <label className="cc-wire-label">State</label>
                    <select className="cc-wire-select" value={recipientState} onChange={e => setRecipientState(e.target.value)}>
                      <option value="">Select state</option>
                      {US_STATES.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="cc-wire-field" style={{ maxWidth: 200 }}>
                  <label className="cc-wire-label">Zip code</label>
                  <input className="cc-wire-input" value={zipCode} maxLength={5} onChange={e => setZipCode(e.target.value.replace(/\D/g, ''))} />
                </div>

                <div className="cc-wire-field">
                  <label className="cc-wire-label">Recipient group (optional)</label>
                  <select className="cc-wire-select" defaultValue="">
                    <option value="">Create group</option>
                  </select>
                  <button className="cc-wire-collapsible-link" style={{ marginTop: 6 }}>⊕ Create group</button>
                </div>

                <div className="cc-wire-btns">
                  <button className="cc-wire-btn-cancel" onClick={onClose}>Cancel</button>
                  <button className="cc-wire-btn-back" onClick={() => setWireScreen('step1')}>Back</button>
                  <button className="cc-wire-btn-next" onClick={() => { if (validateStep2()) setWireScreen('step3') }}>Next</button>
                </div>
              </>
            )}

            {/* ════════ STEP 3: SCHEDULE THE WIRE ════════ */}
            {wireScreen === 'step3' && (
              <div className="cc-wire-step3-layout">
                <div>
                  <div className="cc-wire-field">
                    <label className="cc-wire-label">Wire to</label>
                    <select className="cc-wire-select">
                      <option>{recipientName} (...{accountLast4 || '????'})</option>
                    </select>
                    <button className="cc-wire-collapsible-link" style={{ marginTop: 6 }}>⊕ Add a recipient</button>
                  </div>

                  <div className="cc-wire-recipient-card">
                    <div className="cc-wire-recipient-card__row"><span>Recipient name</span><span>{recipientName}</span></div>
                    <div className="cc-wire-recipient-card__row"><span>Bank name</span><span>{lookedUpBank || '—'}</span></div>
                    <div className="cc-wire-recipient-card__row"><span>Wire routing number</span><span>{routingNumber}</span></div>
                    <div className="cc-wire-recipient-card__row">
                      <span>Account number</span>
                      <span>{'•'.repeat(Math.max(0, accountNumber.length - 4))}{accountLast4}</span>
                    </div>
                  </div>

                  <div className="cc-wire-field">
                    <label className="cc-wire-label">Wire from</label>
                    <select className="cc-wire-select">
                      <option>REPO EQUIP LLC (...9193): {fmtUSD(currentBalance ?? 0)}</option>
                    </select>
                  </div>

                  <div className="cc-wire-field">
                    <label className="cc-wire-label">Wire amount</label>
                    <div className="cc-wire-input-wrap">
                      <span style={{ color: '#666', marginRight: 4, fontSize: 15, flexShrink: 0 }}>$</span>
                      <input
                        className={`cc-wire-input${wireErrors.wireAmount ? ' cc-wire-input--error' : ''}`}
                        type="number" min="0.01" step="0.01" placeholder="0.00"
                        value={wireAmount}
                        onChange={e => { setWireAmount(e.target.value); setWireErrors(p => ({ ...p, wireAmount: '' })) }}
                      />
                    </div>
                    {wireErrors.wireAmount && <div className="cc-wire-error-text">{wireErrors.wireAmount}</div>}
                  </div>

                  <div className="cc-wire-field">
                    <label className="cc-wire-label">Wire date</label>
                    <input className="cc-wire-input" type="date" value={wireDate} onChange={e => setWireDate(e.target.value)} />
                  </div>

                  <div className="cc-wire-toggle-row">
                    <span className="cc-wire-toggle-label">Make this a repeating wire</span>
                    <label className="cc-wire-toggle-switch">
                      <input type="checkbox" checked={repeating} onChange={e => setRepeating(e.target.checked)} />
                      <span className="cc-wire-toggle-slider"></span>
                    </label>
                  </div>

                  <div className="cc-wire-additional-header" onClick={() => setShowAdditional(p => !p)}>
                    <span className="cc-wire-additional-title">Additional information</span>
                    <span style={{ color: '#666', fontSize: 12 }}>{showAdditional ? '▲' : '▼'}</span>
                  </div>
                  {showAdditional && (
                    <>
                      <div className="cc-wire-field">
                        <label className="cc-wire-label">Additional routing info</label>
                        <input className="cc-wire-input" value={additionalRoutingInfo} placeholder="None" onChange={e => setAdditionalRoutingInfo(e.target.value)} />
                      </div>
                      <div className="cc-wire-field">
                        <label className="cc-wire-label">Message to recipient</label>
                        <textarea className="cc-wire-input" style={{ resize: 'vertical', minHeight: 56 }} value={messageToRecipient} maxLength={140} placeholder="Maximum 140 characters. (optional)" onChange={e => setMessageToRecipient(e.target.value)} />
                        <div className="cc-wire-char-counter">{messageToRecipient.length}/140</div>
                      </div>
                      <div className="cc-wire-field">
                        <label className="cc-wire-label">Memo</label>
                        <textarea className="cc-wire-input" style={{ resize: 'vertical', minHeight: 56 }} value={memo} maxLength={100} placeholder="Your recipient won't see this; it's for your records only. Maximum 100 characters (optional)" onChange={e => setMemo(e.target.value)} />
                        <div className="cc-wire-char-counter">{memo.length}/100</div>
                      </div>
                    </>
                  )}

                  <div style={{ fontSize: 13, color: '#666', marginBottom: 16, lineHeight: 1.5 }}>
                    After you have requested a wire transfer, we will send a status update to the primary email address that we have on file for your username.
                  </div>

                  <div className="cc-wire-btns">
                    <button className="cc-wire-btn-cancel" onClick={onClose}>Cancel</button>
                    <button className="cc-wire-btn-back" onClick={() => setWireScreen('step2')}>Back</button>
                    <button className="cc-wire-btn-next" onClick={() => { if (validateStep3()) setWireScreen('review') }}>Next</button>
                  </div>
                </div>

                {/* Wire Summary Panel */}
                <div className="cc-wire-summary">
                  <div className="cc-wire-summary__title">Wire Summary</div>
                  <div className="cc-wire-summary__row">
                    <span>Wire amount</span>
                    <span>{amountNum > 0 ? fmtUSD(amountNum) : '—'} USD</span>
                  </div>
                  <div className="cc-wire-summary__row">
                    <span>Wire transfer fee <span className="cc-wire-fee-info">ⓘ</span></span>
                    <span style={{ fontSize: 12, color: '#555' }}>See analysis statement</span>
                  </div>
                  <hr className="cc-wire-summary__divider" />
                  <div className="cc-wire-summary__total">
                    <span>Total</span>
                    <span>{amountNum > 0 ? fmtUSD(amountNum) : '—'} USD</span>
                  </div>
                </div>
              </div>
            )}

            {/* ════════ REVIEW ════════ */}
            {wireScreen === 'review' && (
              <>
                <div className="cc-wire-review-title">Does everything look OK?</div>

                <div className="cc-wire-review-section">
                  <div className="cc-wire-review-section__title">Account details</div>
                  <div className="cc-wire-review-row">
                    <span className="cc-wire-review-row__key">Wire to</span>
                    <span className="cc-wire-review-row__val">{recipientName} (...{accountLast4})</span>
                  </div>
                  <div className="cc-wire-review-row">
                    <span className="cc-wire-review-row__key">Wire from</span>
                    <span className="cc-wire-review-row__val">REPO EQUIP LLC (...9193)</span>
                  </div>
                </div>

                <div className="cc-wire-review-section">
                  <div className="cc-wire-review-section__title">Sender information</div>
                  <div className="cc-wire-review-row">
                    <span className="cc-wire-review-row__key">Wire date</span>
                    <span className="cc-wire-review-row__val">{wireDate}</span>
                  </div>
                  <div className="cc-wire-review-row">
                    <span className="cc-wire-review-row__key">Wire amount</span>
                    <span className="cc-wire-review-row__val">{fmtUSD(amountNum)} USD (U.S. Dollars)</span>
                  </div>
                  <div className="cc-wire-review-row">
                    <span className="cc-wire-review-row__key">Outgoing wire transfer fee <span className="cc-wire-fee-info">ⓘ</span></span>
                    <span className="cc-wire-review-row__val">See analysis statement</span>
                  </div>
                  <div style={{ borderTop: '1px solid #D8D8D8', paddingTop: 10, marginTop: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 700, color: '#1A1A1A', padding: '6px 0' }}>
                      <span>Total</span>
                      <span>{fmtUSD(amountNum)} USD (U.S. Dollars)</span>
                    </div>
                  </div>
                  <div className="cc-wire-review-note">Your account activity will show separate charges for wire amount and wire transfer fee.</div>
                </div>

                <div className="cc-wire-review-section">
                  <div className="cc-wire-review-section__title">Additional information</div>
                  <div className="cc-wire-review-row">
                    <span className="cc-wire-review-row__key">Additional routing info</span>
                    <span className="cc-wire-review-row__val">{additionalRoutingInfo || 'None'}</span>
                  </div>
                  <div className="cc-wire-review-row">
                    <span className="cc-wire-review-row__key">Message to recipient</span>
                    <span className="cc-wire-review-row__val">{messageToRecipient || 'None'}</span>
                  </div>
                  <div className="cc-wire-review-row">
                    <span className="cc-wire-review-row__key">Memo</span>
                    <span className="cc-wire-review-row__val">{memo || 'None'}</span>
                  </div>
                </div>

                {(bankName || swiftCode || bankAddress || bankCity || bankState || bankZip) && (
                  <div className="cc-wire-review-section">
                    <div className="cc-wire-review-section__title">Bank Details</div>
                    {bankName && (
                      <div className="cc-wire-review-row">
                        <span className="cc-wire-review-row__key">Bank Name</span>
                        <span className="cc-wire-review-row__val">{bankName}</span>
                      </div>
                    )}
                    {swiftCode && (
                      <div className="cc-wire-review-row">
                        <span className="cc-wire-review-row__key">SWIFT / BIC</span>
                        <span className="cc-wire-review-row__val">{swiftCode}</span>
                      </div>
                    )}
                    {bankAddress && (
                      <div className="cc-wire-review-row">
                        <span className="cc-wire-review-row__key">Bank Address</span>
                        <span className="cc-wire-review-row__val">{bankAddress}</span>
                      </div>
                    )}
                    {(bankCity || bankState || bankZip) && (
                      <div className="cc-wire-review-row">
                        <span className="cc-wire-review-row__key">Bank City / State / Zip</span>
                        <span className="cc-wire-review-row__val">{[bankCity, bankState, bankZip].filter(Boolean).join(', ')}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="cc-wire-btns">
                  <button className="cc-wire-btn-cancel" onClick={onClose}>Cancel</button>
                  <button className="cc-wire-btn-back" onClick={() => setWireScreen('step3')}>Back</button>
                  <button className="cc-wire-btn-next" onClick={handleWireConfirm}>Schedule Wire</button>
                </div>
              </>
            )}

            {/* ════════ CONFIRMATION ════════ */}
            {wireScreen === 'done' && (
              <div className="cc-wire-done">
                <div className="cc-wire-done__icon">✓</div>
                <div className="cc-wire-done__title">Wire Transfer Scheduled</div>
                <div className="cc-wire-done__ref">{wireRef}</div>
                <div className="cc-wire-done__summary">
                  <div className="cc-wire-review-row">
                    <span className="cc-wire-review-row__key">Wire to</span>
                    <span className="cc-wire-review-row__val">{recipientName} (...{accountLast4})</span>
                  </div>
                  <div className="cc-wire-review-row">
                    <span className="cc-wire-review-row__key">Bank</span>
                    <span className="cc-wire-review-row__val">{lookedUpBank || '—'}</span>
                  </div>
                  <div className="cc-wire-review-row">
                    <span className="cc-wire-review-row__key">Routing number</span>
                    <span className="cc-wire-review-row__val">{routingNumber}</span>
                  </div>
                  <div className="cc-wire-review-row">
                    <span className="cc-wire-review-row__key">Wire amount</span>
                    <span className="cc-wire-review-row__val">{fmtUSD(amountNum)} USD</span>
                  </div>
                  <div className="cc-wire-review-row">
                    <span className="cc-wire-review-row__key">Wire date</span>
                    <span className="cc-wire-review-row__val">{wireDate}</span>
                  </div>
                  {bankName && (
                    <div className="cc-wire-review-row">
                      <span className="cc-wire-review-row__key">Bank Name</span>
                      <span className="cc-wire-review-row__val">{bankName}</span>
                    </div>
                  )}
                  {swiftCode && (
                    <div className="cc-wire-review-row">
                      <span className="cc-wire-review-row__key">SWIFT / BIC</span>
                      <span className="cc-wire-review-row__val">{swiftCode}</span>
                    </div>
                  )}
                  {currentBalance != null && (
                    <div className="cc-wire-review-row">
                      <span className="cc-wire-review-row__key">New available balance</span>
                      <span className="cc-wire-review-row__val" style={{ color: '#003087', fontWeight: 700 }}>{fmtUSD(currentBalance)}</span>
                    </div>
                  )}
                </div>
                <div className="cc-wire-done__btns">
                  <button className="cc-wire-btn-outline" onClick={() => resetTab('wire')}>Schedule another wire</button>
                  <button className="cc-wire-btn-primary" onClick={onClose}>Return to Dashboard</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
