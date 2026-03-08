'use client'
import Link from 'next/link'
import { useCart } from '../../components/CartContext'
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, Package, Shield } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart()

  const shipping = totalPrice > 150 ? 0 : 15
  const finalTotal = totalPrice + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart size={40} className="text-blue-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 font-display mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some products to your cart to get started</p>
          <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
            Browse Products <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 font-display mb-6">Shopping Cart ({totalItems} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-xl p-4 shadow-card flex items-center gap-4">
                {/* Product icon */}
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Package size={28} className="text-blue-400" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.slug}`} className="font-semibold text-gray-900 text-sm hover:text-blue-600 transition-colors line-clamp-1 font-display">
                    {item.name}
                  </Link>
                  <p className="text-xs text-gray-500 mt-0.5">{item.strength} · {item.quantity}</p>
                  <p className="text-sm font-bold text-blue-600 mt-1">${item.price.toFixed(2)} each</p>
                </div>

                {/* Quantity */}
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2.5 py-2 hover:bg-gray-50 transition-colors text-gray-500"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-3 py-2 font-semibold text-gray-900 text-sm min-w-[32px] text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2.5 py-2 hover:bg-gray-50 transition-colors text-gray-500"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Subtotal + Remove */}
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-400 hover:text-red-600 transition-colors mt-1 flex items-center gap-1 text-xs ml-auto"
                  >
                    <Trash2 size={12} /> Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Continue shopping */}
            <Link href="/shop" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-card p-5 sticky top-24">
              <h2 className="font-bold text-gray-900 mb-4 font-display">Order Summary</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal ({totalItems} items)</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-blue-600 bg-blue-50 p-2.5 rounded-lg">
                    Add ${(150 - totalPrice).toFixed(2)} more for free shipping!
                  </p>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-5">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-gray-900">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold transition-colors text-sm"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </Link>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Shield size={12} className="text-green-500" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-green-500">✓</span>
                  <span>Accepts Bitcoin, Ethereum, USDT, Litecoin</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-green-500">✓</span>
                  <span>Discreet worldwide shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
