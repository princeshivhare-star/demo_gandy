import Link from 'next/link'
import { Shield, Mail, Globe, Phone } from 'lucide-react'
import { categories } from '../../data/products'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      {/* Trust bar */}
      <div className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-white">
          {[
            { icon: '🔒', label: 'Secure Payments' },
            { icon: '✅', label: 'FDA-Approved Only' },
            { icon: '🌍', label: 'Worldwide Shipping' },
            { icon: '💬', label: '24/7 Support' },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-center gap-2">
              <span>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IM</span>
              </div>
              <span className="font-bold text-white text-lg font-display">IndMedex</span>
            </div>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Your trusted international online pharmacy. We provide FDA-approved medicines with fast, discreet worldwide shipping.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Shield size={14} className="text-green-400" />
              <span>SSL Secured & Verified</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.slice(0, 6).map(cat => (
                <li key={cat.id}>
                  <Link href={`/shop?category=${cat.id}`} className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    <span>{cat.icon}</span> {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/shop', label: 'All Products' },
                { href: '/cart', label: 'Shopping Cart' },
                { href: '#', label: 'Track Order' },
                { href: '#', label: 'FAQ' },
                { href: '#', label: 'Shipping Policy' },
                { href: '#', label: 'Privacy Policy' },
              ].map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail size={14} className="text-blue-400 flex-shrink-0" />
                <span>support@indmedex.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Globe size={14} className="text-blue-400 flex-shrink-0" />
                <span>Worldwide Shipping Available</span>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-gray-500 leading-relaxed">
                <strong className="text-gray-400">Disclaimer:</strong> All products sold are for legitimate medical use. Consult a healthcare provider before use. For demo purposes only.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© 2024 IndMedex. All rights reserved. Demo version.</span>
          <div className="flex items-center gap-4">
            <span>Accepts: BTC • ETH • USDT • LTC</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
