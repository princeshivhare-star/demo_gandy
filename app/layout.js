import './globals.css'
import { CartProvider } from '../components/CartContext'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import TopBanner from '../components/layout/TopBanner'

export const metadata = {
  title: 'IndMedex – International Online Pharmacy | FDA-Approved Medicines',
  description: 'IndMedex is your trusted international online pharmacy offering FDA-approved medicines including PCT, anti-estrogens, ED treatments, hair loss, and skin care products. Fast worldwide shipping.',
  keywords: 'online pharmacy, FDA approved medicines, PCT, Clomid, Nolvadex, Cialis, Viagra, hair loss, skin care',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50">
        <CartProvider>
          <TopBanner />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
