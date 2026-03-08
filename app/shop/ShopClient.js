'use client'
import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { products, categories, searchProducts } from '../../data/products'
import ProductCard from '../../components/shop/ProductCard'
import { Filter, SlidersHorizontal, X } from 'lucide-react'

export default function ShopClient() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || ''
  const initialQuery = searchParams.get('q') || ''

  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [sortBy, setSortBy] = useState('popular')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let result = products

    if (searchQuery) {
      result = searchProducts(searchQuery)
    }

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory)
    }

    switch (sortBy) {
      case 'price-asc': return [...result].sort((a, b) => a.price - b.price)
      case 'price-desc': return [...result].sort((a, b) => b.price - a.price)
      case 'popular': return [...result].sort((a, b) => b.reviews - a.reviews)
      case 'rating': return [...result].sort((a, b) => b.rating - a.rating)
      default: return result
    }
  }, [selectedCategory, searchQuery, sortBy])

  const currentCategory = categories.find(c => c.id === selectedCategory)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 font-display">
          {searchQuery ? `Search: "${searchQuery}"` : currentCategory ? currentCategory.name : 'All Products'}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-card p-5 sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Categories</h3>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!selectedCategory ? 'bg-blue-600 text-white font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                All Products ({products.length})
              </button>
              {categories.map(cat => {
                const count = products.filter(p => p.category === cat.id).length
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id === selectedCategory ? '' : cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${selectedCategory === cat.id ? 'bg-blue-600 text-white font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <span>{cat.icon}</span>
                    <span className="flex-1">{cat.name}</span>
                    <span className={`text-xs ${selectedCategory === cat.id ? 'text-blue-200' : 'text-gray-400'}`}>({count})</span>
                  </button>
                )
              })}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium bg-white hover:bg-gray-50"
            >
              <Filter size={14} />
              Filter {selectedCategory && <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">1</span>}
            </button>

            <div className="flex items-center gap-2 ml-auto">
              <SlidersHorizontal size={14} className="text-gray-400" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 bg-white"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Top Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filter products..."
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 bg-white w-40 sm:w-52"
            />
          </div>

          {/* Mobile filters */}
          {showFilters && (
            <div className="lg:hidden bg-white rounded-xl shadow-card p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 text-sm">Categories</h3>
                <button onClick={() => setShowFilters(false)}><X size={16} className="text-gray-400" /></button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setSelectedCategory(''); setShowFilters(false) }}
                  className={`text-left px-3 py-2 rounded-lg text-xs transition-colors ${!selectedCategory ? 'bg-blue-600 text-white font-medium' : 'bg-gray-50 text-gray-600'}`}
                >
                  All Products
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.id === selectedCategory ? '' : cat.id); setShowFilters(false) }}
                    className={`text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center gap-1.5 ${selectedCategory === cat.id ? 'bg-blue-600 text-white font-medium' : 'bg-gray-50 text-gray-600'}`}
                  >
                    <span>{cat.icon}</span> {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active filters */}
          {(selectedCategory || searchQuery) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategory && (
                <span className="flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs px-3 py-1.5 rounded-full font-medium">
                  {currentCategory?.icon} {currentCategory?.name}
                  <button onClick={() => setSelectedCategory('')}><X size={12} /></button>
                </span>
              )}
              {searchQuery && (
                <span className="flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs px-3 py-1.5 rounded-full font-medium">
                  Search: &quot;{searchQuery}&quot;
                  <button onClick={() => setSearchQuery('')}><X size={12} /></button>
                </span>
              )}
            </div>
          )}

          {/* Product grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('') }}
                className="mt-4 text-blue-600 text-sm hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
