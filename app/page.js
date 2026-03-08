import Link from 'next/link'
import { ArrowRight, ShieldCheck, Truck, Clock, Star, ChevronRight } from 'lucide-react'
import { products, categories, getFeaturedProducts } from '../data/products'
import ProductCard from '../components/shop/ProductCard'
import SearchBar from '../components/shop/SearchBar'

export default function HomePage() {
  const featured = getFeaturedProducts()
  const mostPopular = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4)

  return (
    <div>
      {/* HERO */}
      <section className="hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute bottom-10 right-20 w-48 h-48 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-20 h-20 border border-white rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6 backdrop-blur-sm">
              <ShieldCheck size={14} className="text-green-300" />
              <span>100% FDA-Approved Medicines</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight mb-4">
              Your Trusted<br />
              <span className="text-blue-200">International</span><br />
              Pharmacy
            </h1>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed max-w-lg">
              Access FDA-approved medicines from around the world. Discreet packaging, fast shipping, and professional service you can trust.
            </p>

            {/* Search */}
            <SearchBar dark />

            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/shop" className="flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition-colors text-sm">
                Browse All Products <ArrowRight size={16} />
              </Link>
              <Link href="/shop?category=pct" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-6 py-3 rounded-lg transition-colors text-sm backdrop-blur-sm">
                Shop PCT
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-white/20 bg-black/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '10,000+', label: 'Happy Customers' },
              { value: '100%', label: 'FDA Approved' },
              { value: '48h', label: 'Avg Delivery' },
              { value: '24/7', label: 'Support' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-white font-display">{stat.value}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: <ShieldCheck size={20} className="text-green-500" />, title: 'FDA-Approved Products', desc: 'Only genuine, verified medicines' },
              { icon: <Truck size={20} className="text-blue-500" />, title: 'Worldwide Shipping', desc: 'Discreet packaging to 150+ countries' },
              { icon: <Clock size={20} className="text-purple-500" />, title: 'Fast Processing', desc: 'Orders dispatched within 24 hours' },
            ].map(item => (
              <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors">
                <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                  <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-14 bg-gray-50 medical-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Shop by Category</h2>
              <p className="text-gray-500 mt-1 text-sm">Browse our comprehensive range of medical categories</p>
            </div>
            <Link href="/shop" className="hidden sm:flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {categories.map(cat => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.id}`}
                className="category-card bg-white rounded-xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-card group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 text-2xl group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${cat.color}18` }}
                >
                  {cat.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors font-display leading-snug">
                  {cat.name}
                </h3>
                <p className="text-gray-400 text-xs mt-1 line-clamp-2">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Featured Products</h2>
              <p className="text-gray-500 mt-1 text-sm">Handpicked selection of our best-selling medicines</p>
            </div>
            <Link href="/shop" className="hidden sm:flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
              See All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* MOST POPULAR */}
      <section className="py-14 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Most Popular</h2>
              <p className="text-gray-500 mt-1 text-sm">Loved by thousands of customers worldwide</p>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {mostPopular.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CRYPTO PAYMENT BANNER */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold font-display mb-2">Secure Crypto Payments Accepted</h2>
            <p className="text-gray-400">Pay securely with cryptocurrency for maximum privacy and security</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {['₿ Bitcoin', 'Ξ Ethereum', '₮ USDT', 'Ł Litecoin'].map(crypto => (
              <span key={crypto} className="bg-white/10 border border-white/20 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/20 transition-colors cursor-pointer">
                {crypto}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-2">Customer Reviews</h2>
          <p className="text-gray-500 text-center mb-10 text-sm">Trusted by thousands of customers worldwide</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'James R.', country: '🇺🇸 USA', rating: 5, text: 'Excellent service! My order arrived within a week. Products are genuine and packaging was very discreet. Will order again.' },
              { name: 'Marcus T.', country: '🇬🇧 UK', rating: 5, text: 'IndMedex has been my go-to pharmacy for over a year. Great prices, fast shipping and responsive customer support.' },
              { name: 'Dmitri K.', country: '🇩🇪 Germany', rating: 5, text: 'Very professional. Products are authentic with proper documentation. Shipped within 24 hours. Highly recommended.' },
            ].map(review => (
              <div key={review.name} className="card p-6">
                <div className="flex mb-3">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900 text-sm">{review.name}</span>
                  <span className="text-xs text-gray-400">{review.country}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
