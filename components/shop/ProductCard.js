'use client'
import Link from 'next/link'
import { ShoppingCart, Star, Package } from 'lucide-react'
import { useCart } from '../CartContext'
import { useState } from 'react'

function ProductImage({ product }) {
  const categoryColors = {
    'pct': { bg: '#dbeafe', icon: '#2563eb', label: 'PCT' },
    'anti-estrogens': { bg: '#ede9fe', icon: '#7c3aed', label: 'AE' },
    'erectile-dysfunction': { bg: '#fce7f3', icon: '#be185d', label: 'ED' },
    'fat-loss': { bg: '#fef3c7', icon: '#d97706', label: 'FL' },
    'hormones-hcg': { bg: '#d1fae5', icon: '#059669', label: 'HCG' },
    'hair-loss': { bg: '#cffafe', icon: '#0891b2', label: 'HL' },
    'skin-care': { bg: '#ffe4e6', icon: '#e11d48', label: 'SC' },
    'other': { bg: '#f1f5f9', icon: '#475569', label: 'Rx' },
  }
  const colors = categoryColors[product.category] || categoryColors['other']

  return (
    <div
      className="w-full h-48 flex flex-col items-center justify-center rounded-t-xl relative"
      style={{ backgroundColor: colors.bg }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-2 shadow-sm"
        style={{ backgroundColor: colors.icon }}
      >
        <Package size={28} color="white" />
      </div>
      <div
        className="px-3 py-1 rounded-full text-xs font-bold text-white"
        style={{ backgroundColor: colors.icon }}
      >
        {colors.label}
      </div>
      <div className="absolute top-3 right-3 flex flex-col gap-1">
        {product.badge && (
          <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow-sm">
            {product.badge}
          </span>
        )}
        {product.fda && (
          <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow-sm">
            FDA ✓
          </span>
        )}
      </div>
      {product.originalPrice && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-sm">
          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
        </div>
      )}
    </div>
  )
}

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Link href={`/product/${product.slug}`} className="product-card card block group">
      <ProductImage product={product} />
      <div className="p-4">
        <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-1">{product.brand}</p>
        <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors line-clamp-2 font-display">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mb-2">{product.strength} · {product.quantity}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[1,2,3,4,5].map(s => (
              <Star key={s} size={11} className={s <= Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'} />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
            added
              ? 'bg-green-500 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
          }`}
        >
          <ShoppingCart size={15} />
          {added ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </Link>
  )
}
