'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Package, Mail, Clock, Shield, ArrowRight } from 'lucide-react'

const cryptoAddresses = {
  bitcoin: { label: 'Bitcoin (BTC)', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7Divf...' },
  ethereum: { label: 'Ethereum (ETH)', address: '0x742d35Cc6634C0532925a3b8D4C9...' },
  usdt: { label: 'USDT (TRC20)', address: 'TGkGxCKR9vKFdM8HkNkHzN6xJVDB...' },
  litecoin: { label: 'Litecoin (LTC)', address: 'LMWvRWCvGmHiTSZUJRTr9kVKs...' },
}

export default function OrderReceivedClient() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') || 'IM-DEMO'
  const [order, setOrder] = useState(null)

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('lastOrder')
      if (saved) setOrder(JSON.parse(saved))
    } catch {}
  }, [])

  const paymentInfo = order
    ? (cryptoAddresses[order.customer?.paymentMethod] || cryptoAddresses.bitcoin)
    : cryptoAddresses.bitcoin

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={44} className="text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 font-display mb-2">Order Received!</h1>
          <p className="text-gray-500">Thank you for your order. Please complete your payment to confirm.</p>
        </div>

        {/* Order ID */}
        <div className="bg-white rounded-xl shadow-card p-6 mb-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-sm text-gray-500 mb-1">Order Reference</p>
              <p className="text-2xl font-bold text-blue-600 font-display">{orderId}</p>
            </div>
            <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
              <Clock size={16} />
              Awaiting Payment
            </div>
          </div>
        </div>

        {/* Order Items */}
        {order?.items && (
          <div className="bg-white rounded-xl shadow-card p-6 mb-5">
            <h2 className="font-bold text-gray-900 mb-4 font-display flex items-center gap-2">
              <Package size={18} className="text-blue-500" />
              Order Items
            </h2>
            <div className="space-y-3">
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.strength} · Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-gray-100 pt-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span>{order.shipping === 0 ? 'FREE' : `$${order.shipping?.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 mt-2">
                  <span>Total</span>
                  <span>${order.total?.toFixed(2)} USD</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Instructions */}
        <div className="bg-white rounded-xl shadow-card p-6 mb-5 border-2 border-blue-100">
          <h2 className="font-bold text-gray-900 mb-4 font-display">💳 Payment Instructions</h2>
          <div className="bg-blue-50 rounded-xl p-4 mb-4">
            <p className="text-sm font-semibold text-blue-900 mb-1">Payment Method: {paymentInfo.label}</p>
            <p className="text-xs text-blue-700 mb-3">
              Send exactly <strong>${order?.total?.toFixed(2) || 'the total amount'} USD</strong> worth of {paymentInfo.label} to:
            </p>
            <div className="bg-white border border-blue-200 rounded-lg px-4 py-3 font-mono text-xs text-gray-800 break-all">
              {paymentInfo.address}
            </div>
            <p className="text-xs text-blue-600 mt-2">⚠️ Demo wallet address – do not send real funds</p>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <span className="text-blue-500 font-bold text-xs mt-0.5 flex-shrink-0">1.</span>
              <span>Copy the wallet address above and open your crypto wallet app</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500 font-bold text-xs mt-0.5 flex-shrink-0">2.</span>
              <span>Send the exact amount. Include your order ID <strong>{orderId}</strong> in the payment notes if possible</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500 font-bold text-xs mt-0.5 flex-shrink-0">3.</span>
              <span>Email your transaction hash to: <strong className="text-blue-600">payments@indmedex.com</strong></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 font-bold text-xs mt-0.5 flex-shrink-0">4.</span>
              <span>Your order will be dispatched within 24 hours of payment confirmation</span>
            </div>
          </div>
        </div>

        {/* Email confirmation */}
        <div className="bg-white rounded-xl shadow-card p-5 mb-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Mail size={20} className="text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">Confirmation Email Sent</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                A confirmation email has been sent to <strong>{order?.customer?.email || 'your email'}</strong> with your order details and payment instructions.
              </p>
            </div>
          </div>
        </div>

        {/* Trust signals */}
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 text-green-700 text-sm font-semibold mb-2">
            <Shield size={16} />
            Your Order is Protected
          </div>
          <ul className="space-y-1 text-xs text-green-700">
            <li>✓ All products are genuine, FDA-approved medicines</li>
            <li>✓ Discreet packaging with no medical labels on outside</li>
            <li>✓ Full refund if package is seized by customs</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/shop" className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm transition-colors">
            Continue Shopping <ArrowRight size={16} />
          </Link>
          <Link href="/" className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 py-3 rounded-xl font-semibold text-sm transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
