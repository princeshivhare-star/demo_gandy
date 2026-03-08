'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '../../../components/CartContext'
import { categories } from '../../../data/products'
import ProductCard from '../../../components/shop/ProductCard'
import { ShoppingCart, Plus, Minus, Shield, Truck, CheckCircle, Star, Package, ChevronRight, Info } from 'lucide-react'

export default function ProductDetail({ product, related }) {
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const category = categories.find(c => c.id === product.category)

  const categoryColors = {
    'pct': { bg: '#dbeafe', icon: '#2563eb' },
    'anti-estrogens': { bg: '#ede9fe', icon: '#7c3aed' },
    'erectile-dysfunction': { bg: '#fce7f3', icon: '#be185d' },
    'fat-loss': { bg: '#fef3c7', icon: '#d97706' },
    'hormones-hcg': { bg: '#d1fae5', icon: '#059669' },
    'hair-loss': { bg: '#cffafe', icon: '#0891b2' },
    'skin-care': { bg: '#ffe4e6', icon: '#e11d48' },
    'other': { bg: '#f1f5f9', icon: '#475569' },
  }
  const colors = categoryColors[product.category] || categoryColors['other']

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight size={14} />
          <Link href="/shop" className="hover:text-blue-600">Shop</Link>
          <ChevronRight size={14} />
          <Link href={`/shop?category=${product.category}`} className="hover:text-blue-600">{category?.name}</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Product Image */}
          <div className="space-y-4">
            <div
              className="w-full aspect-square rounded-2xl flex flex-col items-center justify-center relative shadow-card"
              style={{ backgroundColor: colors.bg }}
            >
              <div className="w-28 h-28 rounded-3xl flex items-center justify-center mb-4 shadow-lg" style={{ backgroundColor: colors.icon }}>
                <Package size={56} color="white" />
              </div>
              <div className="px-4 py-2 rounded-full text-white font-bold text-sm" style={{ backgroundColor: colors.icon }}>
                {category?.name}
              </div>

              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
                    {product.badge}
                  </span>
                )}
                {discount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow">
                    -{discount}% OFF
                  </span>
                )}
              </div>

              {product.fda && (
                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow flex items-center gap-1">
                  <CheckCircle size={12} />
                  FDA Approved
                </div>
              )}
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <Shield size={16} className="text-green-500" />, label: 'Genuine Product' },
                { icon: <Truck size={16} className="text-blue-500" />, label: 'Fast Shipping' },
                { icon: <CheckCircle size={16} className="text-purple-500" />, label: 'Discreet Pack' },
              ].map(item => (
                <div key={item.label} className="bg-white rounded-xl p-3 text-center shadow-card">
                  <div className="flex justify-center mb-1">{item.icon}</div>
                  <p className="text-xs text-gray-600 font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-2xl p-6 shadow-card">
            <div className="mb-3">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{product.brand}</span>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1 font-display">{product.name}</h1>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">{product.strength}</span>
              <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">{product.quantity}</span>
              {product.tags.slice(0, 3).map(tag => (
                <span key={tag} className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full font-medium">{tag}</span>
              ))}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={16} className={s <= Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'} />
                ))}
              </div>
              <span className="font-bold text-gray-900">{product.rating}</span>
              <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-6">
              <span className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <div className="flex flex-col">
                  <span className="text-lg text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                  <span className="text-xs text-green-600 font-semibold">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
                </div>
              )}
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-3 hover:bg-gray-100 transition-colors text-gray-600"
                >
                  <Minus size={16} />
                </button>
                <span className="px-5 py-3 font-semibold text-gray-900 min-w-[50px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-3 hover:bg-gray-100 transition-colors text-gray-600"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  added ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
                }`}
              >
                <ShoppingCart size={18} />
                {added ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>
            </div>

            <Link
              href="/cart"
              className="block w-full text-center bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold text-sm transition-colors"
            >
              Buy Now
            </Link>

            {quantity > 1 && (
              <p className="text-center text-sm text-gray-500 mt-3">
                Subtotal: <span className="font-semibold text-gray-900">${(product.price * quantity).toFixed(2)}</span>
              </p>
            )}

            <div className="mt-5 p-4 bg-blue-50 rounded-xl flex gap-3">
              <Info size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700 leading-relaxed">
                All products are genuine and FDA-approved. Shipped discreetly within 24-48 hours. Crypto payments accepted for maximum privacy.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-card mb-10">
          <div className="flex border-b border-gray-100">
            {[
              { id: 'description', label: 'Description' },
              { id: 'usage', label: 'Usage & Dosage' },
              { id: 'sideEffects', label: 'Side Effects' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-semibold transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-6">
            {activeTab === 'description' && (
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            )}
            {activeTab === 'usage' && (
              <div>
                <p className="text-gray-600 leading-relaxed mb-4">{product.usage}</p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
                  <span className="text-amber-600 text-lg">⚠️</span>
                  <p className="text-amber-700 text-sm">Always consult a qualified healthcare provider before starting any new medication.</p>
                </div>
              </div>
            )}
            {activeTab === 'sideEffects' && (
              <div>
                <p className="text-gray-600 leading-relaxed mb-4">{product.sideEffects}</p>
                <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex gap-3">
                  <span className="text-red-500 text-lg">🚨</span>
                  <p className="text-red-600 text-sm">Discontinue use and consult a doctor immediately if you experience severe side effects.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {related && related.length > 0 && (
          <div>
            <h2 className="section-title mb-6">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
