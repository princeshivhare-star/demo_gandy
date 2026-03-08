'use client'
import { useState } from 'react'
import { X, Truck, Shield, CreditCard } from 'lucide-react'

export default function TopBanner() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  return (
    <div className="bg-blue-700 text-white text-sm py-2 px-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 flex-wrap">
        <span className="flex items-center gap-1.5">
          <Truck size={14} />
          Free Shipping on orders over $150
        </span>
        <span className="hidden sm:flex items-center gap-1.5">
          <Shield size={14} />
          100% FDA-Approved Products
        </span>
        <span className="hidden md:flex items-center gap-1.5">
          <CreditCard size={14} />
          Secure Crypto Payments
        </span>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Close banner"
      >
        <X size={14} />
      </button>
    </div>
  )
}
