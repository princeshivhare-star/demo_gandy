import Link from 'next/link'
import { categories, products } from '../../data/products'
import { ArrowRight } from 'lucide-react'

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 font-display mb-3">Product Categories</h1>
          <p className="text-gray-500">Browse our comprehensive range of FDA-approved medicines</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categories.map(cat => {
            const count = products.filter(p => p.category === cat.id).length
            return (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.id}`}
                className="category-card bg-white rounded-2xl p-6 shadow-card border border-gray-100 hover:border-blue-200 group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${cat.color}18` }}
                >
                  {cat.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-1 font-display group-hover:text-blue-600 transition-colors">{cat.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{cat.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{count} product{count !== 1 ? 's' : ''}</span>
                  <span className="flex items-center gap-1 text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
                    Shop <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
