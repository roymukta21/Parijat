import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { RiArrowLeftLine, RiCheckLine, RiBankCardLine, RiSmartphoneLine, RiBankLine } from 'react-icons/ri'
import { useCart } from '../context/CartContext'

const paymentMethods = [
  { id: 'card', label: 'Credit / Debit Card', icon: RiBankCardLine },
  { id: 'mobile', label: 'Mobile Banking (bKash / Nagad)', icon: RiSmartphoneLine },
  { id: 'bank', label: 'Bank Transfer', icon: RiBankLine },
]

export default function CheckoutPage() {
  const { cart, total, dispatch } = useCart()
  const [payment, setPayment] = useState('card')
  const [step, setStep] = useState(1)
  const [placed, setPlaced] = useState(false)
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', phone:'', address:'', city:'', zip:'', country:'Bangladesh', cardNumber:'', expiry:'', cvv:'', cardName:'' })
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const shipping = total >= 3000 ? 0 : 150
  const grandTotal = total + shipping

  if (placed) return (
    <main className="pt-[73px] min-h-screen flex items-center justify-center">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md mx-auto px-6">
        <div className="w-16 h-16 rounded-full bg-dark flex items-center justify-center mx-auto mb-6">
          <RiCheckLine className="text-cream text-2xl" />
        </div>
        <h2 className="font-cormorant text-4xl font-light text-dark mb-4">Order Placed!</h2>
        <p className="text-sm text-muted leading-relaxed mb-8">Thank you for your order. We will confirm via email shortly.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-dark text-cream px-8 py-4 text-[10px] tracking-[0.25em] uppercase hover:bg-accent transition-colors">
          <RiArrowLeftLine /> Back to Home
        </Link>
      </motion.div>
    </main>
  )

  return (
    <main className="pt-[73px] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="mb-10">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-2">Checkout</p>
          <h1 className="font-cormorant text-5xl font-light text-dark">Complete Your <em className="italic text-accent">Order</em></h1>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-3 mb-12">
          {['Customer Info','Shipping','Payment'].map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <button onClick={() => i + 1 < step && setStep(i + 1)} className="flex items-center gap-2">
                <div className={`w-7 h-7 flex items-center justify-center text-[11px] transition-colors ${step >= i + 1 ? 'bg-dark text-cream' : 'border border-taupe text-muted'}`}>
                  {step > i + 1 ? <RiCheckLine /> : i + 1}
                </div>
                <span className={`text-[10px] tracking-[0.15em] uppercase hidden md:block ${step === i + 1 ? 'text-dark' : 'text-muted'}`}>{s}</span>
              </button>
              {i < 2 && <div className="w-8 h-px bg-taupe" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-14">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-cormorant text-2xl text-dark mb-6">Customer Information</h2>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    {[['firstName','First Name'],['lastName','Last Name']].map(([name,label]) => (
                      <div key={name}>
                        <label className="text-[10px] tracking-[0.2em] uppercase text-muted block mb-2">{label}</label>
                        <input name={name} value={form[name]} onChange={handleChange} className="w-full border border-taupe bg-transparent px-4 py-3 text-sm text-dark outline-none focus:border-dark transition-colors" />
                      </div>
                    ))}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {[['email','Email Address'],['phone','Phone Number']].map(([name,label]) => (
                      <div key={name}>
                        <label className="text-[10px] tracking-[0.2em] uppercase text-muted block mb-2">{label}</label>
                        <input name={name} value={form[name]} onChange={handleChange} className="w-full border border-taupe bg-transparent px-4 py-3 text-sm text-dark outline-none focus:border-dark transition-colors" />
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setStep(2)} className="bg-dark text-cream px-10 py-4 text-[10px] tracking-[0.25em] uppercase hover:bg-accent transition-colors">
                    Continue to Shipping
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-cormorant text-2xl text-dark mb-6">Shipping Address</h2>
                  <div className="mb-4">
                    <label className="text-[10px] tracking-[0.2em] uppercase text-muted block mb-2">Street Address</label>
                    <input name="address" value={form.address} onChange={handleChange} className="w-full border border-taupe bg-transparent px-4 py-3 text-sm text-dark outline-none focus:border-dark transition-colors" />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    {[['city','City'],['zip','ZIP Code']].map(([name,label]) => (
                      <div key={name}>
                        <label className="text-[10px] tracking-[0.2em] uppercase text-muted block mb-2">{label}</label>
                        <input name={name} value={form[name]} onChange={handleChange} className="w-full border border-taupe bg-transparent px-4 py-3 text-sm text-dark outline-none focus:border-dark transition-colors" />
                      </div>
                    ))}
                    <div>
                      <label className="text-[10px] tracking-[0.2em] uppercase text-muted block mb-2">Country</label>
                      <select name="country" value={form.country} onChange={handleChange} className="w-full border border-taupe bg-cream px-4 py-3 text-sm text-dark outline-none focus:border-dark">
                        <option>Bangladesh</option><option>India</option><option>Pakistan</option><option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="border border-taupe text-muted px-8 py-4 text-[10px] tracking-[0.2em] uppercase hover:border-dark hover:text-dark transition-colors">Back</button>
                    <button onClick={() => setStep(3)} className="bg-dark text-cream px-10 py-4 text-[10px] tracking-[0.25em] uppercase hover:bg-accent transition-colors">Continue to Payment</button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-cormorant text-2xl text-dark mb-6">Payment Method</h2>
                  <div className="flex flex-col gap-3 mb-8">
                    {paymentMethods.map(pm => {
                      const Icon = pm.icon
                      return (
                        <button key={pm.id} onClick={() => setPayment(pm.id)}
                          className={`flex items-center gap-4 p-4 border text-left transition-all ${payment === pm.id ? 'border-dark bg-beige' : 'border-taupe hover:border-dark'}`}>
                          <Icon className={`text-xl ${payment === pm.id ? 'text-dark' : 'text-muted'}`} />
                          <span className={`text-sm flex-1 ${payment === pm.id ? 'text-dark' : 'text-muted'}`}>{pm.label}</span>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${payment === pm.id ? 'border-dark' : 'border-taupe'}`}>
                            {payment === pm.id && <div className="w-2 h-2 rounded-full bg-dark" />}
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {payment === 'card' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
                      <div className="mb-4">
                        <label className="text-[10px] tracking-[0.2em] uppercase text-muted block mb-2">Card Number</label>
                        <input name="cardNumber" placeholder="0000 0000 0000 0000" value={form.cardNumber} onChange={handleChange} className="w-full border border-taupe bg-transparent px-4 py-3 text-sm text-dark outline-none focus:border-dark" />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {[['expiry','Expiry','MM/YY'],['cvv','CVV','•••'],['cardName','Name on Card','']].map(([name,label,ph]) => (
                          <div key={name}>
                            <label className="text-[10px] tracking-[0.2em] uppercase text-muted block mb-2">{label}</label>
                            <input name={name} placeholder={ph} value={form[name]} onChange={handleChange} className="w-full border border-taupe bg-transparent px-4 py-3 text-sm text-dark outline-none focus:border-dark" />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {payment === 'mobile' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-beige p-5 mb-8 text-sm text-muted leading-relaxed">
                      Send payment to <strong className="text-dark">01XXXXXXXXX</strong> (bKash/Nagad Personal).<br />Use your Order ID as reference. We will confirm within 24 hours.
                    </motion.div>
                  )}
                  {payment === 'bank' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-beige p-5 mb-8 text-sm text-muted space-y-1">
                      <p><span className="text-dark">Bank:</span> Dutch-Bangla Bank Ltd</p>
                      <p><span className="text-dark">Account:</span> 1234-5678-9012</p>
                      <p><span className="text-dark">Branch:</span> Gulshan, Dhaka</p>
                    </motion.div>
                  )}

                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="border border-taupe text-muted px-8 py-4 text-[10px] tracking-[0.2em] uppercase hover:border-dark hover:text-dark transition-colors">Back</button>
                    <button onClick={() => { setPlaced(true); dispatch({ type: 'CLEAR_CART' }) }}
                      className="flex-1 bg-dark text-cream py-4 text-[10px] tracking-[0.25em] uppercase hover:bg-accent transition-colors duration-300">
                      Place Order — ৳{grandTotal.toLocaleString()}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-beige p-8 sticky top-24">
              <h2 className="font-cormorant text-2xl font-light text-dark mb-6">Order Summary</h2>
              <div className="flex flex-col gap-4 mb-6 pb-6" style={{ borderBottom: '0.5px solid #D4C9B8' }}>
                {cart.map(item => (
                  <div key={item.id} className="flex gap-3 items-start">
                    <img src={item.image} alt={item.name} className="w-14 h-16 object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-cormorant text-dark text-sm leading-tight truncate">{item.name}</p>
                      <p className="text-[10px] text-muted mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-cormorant text-dark text-sm flex-shrink-0">৳{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3 pb-4 mb-4" style={{ borderBottom: '0.5px solid #D4C9B8' }}>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-cormorant text-dark">৳{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Shipping</span>
                  <span className="font-cormorant text-dark">{shipping === 0 ? 'Free' : `৳${shipping}`}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] tracking-[0.2em] uppercase text-dark">Total</span>
                <span className="font-cormorant text-2xl text-dark">৳{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
