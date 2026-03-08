'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export default function SearchBar({ dark = false }) {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-lg w-full">
      <div className={`flex flex-1 rounded-xl overflow-hidden shadow-lg ${dark ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'border border-gray-200'}`}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search medicines, e.g. Clomid, Cialis, Finasteride..."
          className={`flex-1 px-4 py-3 text-sm focus:outline-none ${dark ? 'bg-transparent text-white placeholder-white/60' : 'bg-white text-gray-900 placeholder-gray-400'}`}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-400 text-white px-5 py-3 flex items-center gap-2 text-sm font-semibold transition-colors"
        >
          <Search size={16} />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>
    </form>
  )
}
