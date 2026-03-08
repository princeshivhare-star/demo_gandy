'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '../../components/CartContext'
import { Shield, Package, Bitcoin, ChevronRight, CheckCircle } from 'lucide-react'

const countries = [
  'United States', 'United Kingdom', 'Germany', 'France', 'Canada', 'Australia',
  'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Spain', 'Italy', 'Belgium',
  'Switzerland', 'Austria', 'Poland', 'Czech Republic', 'Portugal', 'Greece',
  'New Zealand', 'Japan', 'South Korea', 'Singapore', 'Brazil', 'Mexico',
  'Argentina', 'South Africa', 'India', 'Other'
]

function generateOrderId() {
  return 'IM' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase()
}

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart } = useCart()
  const router = useRouter()

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', country: '', address: '',
    city: '', zip: '', phone: '', notes: '', paymentMethod: 'bitcoin'
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const shipping = totalPrice > 150 ? 0 : 15
  const finalTotal = totalPrice + shipping

  const validate = () => {
    const errs = {}
    if (!form.firstName.trim()) errs.firstName = 'Required'
    if (!form.lastName.trim()) errs.lastName = 'Required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email required'
    if (!form.country) errs.country = 'Required'
    if (!form.address.trim()) errs.address = 'Required'
    if (!form.city.trim()) errs.city = 'Required'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setSubmitting(true)

    // Simulate order processing
    const orderId = generateOrderId()
    const orderData = {
      orderId,
      customer: form,
      items,
      subtotal: totalPrice,
      shipping,
      total: finalTotal,
      date: new Date().toISOString(),
      status: 'pending',
    }

    // Simulate saving order (in production: POST to API)
    console.log('[IndMedex] Order placed:', orderData)
    console.log('[IndMedex] Simulating confirmation email to:', form.email)
    console.log('[IndMedex] Simulating admin notification email')

    // Save to session for order received page
    try {
      sessionStorage.setItem('lastOrder', JSON.stringify(orderData))
    } catch {}

    await new Promise(r => setTimeout(r, 1200))

    clearCart()
    router.push('/order-received?orderId=' + orderId)
  }

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <Link href="/shop" className="btn-primary">Shop Now</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/cart" className="hover:text-blue-600">Cart</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">Checkout</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 font-display mb-6">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left - Form */}
            <div className="lg:col-span-2 space-y-5">
              {/* Contact Info */}
              <div className="bg-white rounded-xl shadow-card p-6">
                <h2 className="font-bold text-gray-900 mb-4 font-display">Contact Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name *</label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={e => handleChange('firstName', e.target.value)}
                      className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 ${errors.firstName ? 'border-red-400' : 'border-gray-200'}`}
                      placeholder="John"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name *</label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={e => handleChange('lastName', e.target.value)}
                      className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 ${errors.lastName ? 'border-red-400' : 'border-gray-200'}`}
                      placeholder="Smith"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => handleChange('email', e.target.value)}
                      className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone (optional)</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => handleChange('phone', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      placeholder="+1 555 000 0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Country *</label>
                    <select
                      value={form.country}
                      onChange={e => handleChange('country', e.target.value)}
                      className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white ${errors.country ? 'border-red-400' : 'border-gray-200'}`}
                    >
                      <option value="">Select country...</option>
                      {countries.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-xl shadow-card p-6">
                <h2 className="font-bold text-gray-900 mb-4 font-display">Shipping Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Street Address *</label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={e => handleChange('address', e.target.value)}
                      className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 ${errors.address ? 'border-red-400' : 'border-gray-200'}`}
                      placeholder="123 Main Street, Apt 4B"
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">City *</label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={e => handleChange('city', e.target.value)}
                      className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 ${errors.city ? 'border-red-400' : 'border-gray-200'}`}
                      placeholder="New York"
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">ZIP / Postal Code</label>
                    <input
                      type="text"
                      value={form.zip}
                      onChange={e => handleChange('zip', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      placeholder="10001"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Order Notes (optional)</label>
                    <textarea
                      value={form.notes}
                      onChange={e => handleChange('notes', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
                      placeholder="Any special instructions or notes for your order..."
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-card p-6">
                <h2 className="font-bold text-gray-900 mb-4 font-display">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { id: 'bitcoin', icon: '₿', label: 'Bitcoin (BTC)', desc: 'Send to our Bitcoin wallet address after order' },
                    { id: 'ethereum', icon: 'Ξ', label: 'Ethereum (ETH)', desc: 'Send to our Ethereum wallet address after order' },
                    { id: 'usdt', icon: '₮', label: 'USDT (TRC20/ERC20)', desc: 'Tether stablecoin accepted on both networks' },
                    { id: 'litecoin', icon: 'Ł', label: 'Litecoin (LTC)', desc: 'Fast and low-fee crypto payments' },
                  ].map(method => (
                    <label
                      key={method.id}
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                        form.paymentMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={form.paymentMethod === method.id}
                        onChange={e => handleChange('paymentMethod', e.target.value)}
                        className="mt-0.5 accent-blue-600"
                      />
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{method.icon}</span>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{method.label}</p>
                          <p className="text-gray-500 text-xs">{method.desc}</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                  <p className="text-amber-700 text-xs leading-relaxed">
                    <strong>How it works:</strong> After placing your order, you'll receive payment instructions with our wallet address. Your order will be processed once payment is confirmed on the blockchain (typically 1-3 confirmations).
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-card p-5 sticky top-24">
                <h2 className="font-bold text-gray-900 mb-4 font-display">Order Summary</h2>

                {/* Items */}
                <div className="space-y-3 mb-4 max-h-52 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-900 line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.strength} × {item.quantity}</p>
                      </div>
                      <span className="text-xs font-semibold text-gray-900 flex-shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-3 space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100 text-base">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)} USD</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all ${
                    submitting
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
                  }`}
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Shield size={16} />
                      Place Secure Order
                    </>
                  )}
                </button>

                <div className="mt-4 flex items-center gap-2 text-xs text-gray-400 justify-center">
                  <Shield size={12} className="text-green-500" />
                  <span>Your data is secured with SSL encryption</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
