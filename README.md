# IndMedex – International Online Pharmacy (Demo)

A modern, responsive e-commerce website for an international medicine business built with Next.js 14, React, and Tailwind CSS.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# 1. Navigate to project folder
cd indmedex

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

### Build for Production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
indmedex/
├── app/                          # Next.js App Router
│   ├── layout.js                 # Root layout (Navbar, Footer, Cart Provider)
│   ├── globals.css               # Global styles + Tailwind
│   ├── page.js                   # Homepage
│   ├── shop/
│   │   └── page.js               # Shop page (search, filter, sort)
│   ├── product/
│   │   └── [slug]/
│   │       └── page.js           # Product detail page
│   ├── cart/
│   │   └── page.js               # Cart page
│   ├── checkout/
│   │   └── page.js               # Checkout page
│   ├── order-received/
│   │   └── page.js               # Order confirmation page
│   └── categories/
│       └── page.js               # All categories page
│
├── components/
│   ├── CartContext.js             # Global cart state (React Context)
│   ├── layout/
│   │   ├── Navbar.js             # Navigation with mobile menu
│   │   ├── Footer.js             # Footer with links
│   │   └── TopBanner.js          # Dismissible top banner
│   └── shop/
│       ├── ProductCard.js        # Product card with add-to-cart
│       └── SearchBar.js          # Search input component
│
├── data/
│   └── products.js               # Mock product database (12 products, 8 categories)
│
├── tailwind.config.js
├── next.config.js
└── package.json
```

---

## 🛍️ Features

### Homepage
- Hero section with search bar
- Trust badges and stats
- Category grid (8 categories)
- Featured products section
- Most popular products
- Crypto payment banner
- Customer testimonials

### Shop Page
- Category sidebar filter
- Real-time search/filter
- Sort by: Popular, Rating, Price
- Mobile-responsive filters
- Product count display

### Product Page
- Product image with category color
- Badges: FDA Approved, Sale %, Brand badge
- Rating and reviews
- Quantity selector
- Add to cart with feedback
- Tab sections: Description, Usage, Side Effects
- Related products

### Cart
- Add/Remove/Update items
- Live price calculation
- Free shipping threshold ($150)
- Order summary

### Checkout
- Full form validation
- Country selector (30+ countries)
- 4 crypto payment options
- Order notes field
- Order placed → redirect to confirmation

### Order Received
- Order ID generation
- Crypto wallet address display
- Payment instructions (step by step)
- Email confirmation simulation

---

## 🏗️ Scaling for 2000+ Products

The product database in `/data/products.js` is designed for easy migration:

```javascript
// Current: static JSON
export const products = [...]

// Future: API call
export async function getProducts() {
  const res = await fetch('/api/products')
  return res.json()
}

// Or: Database query (Prisma, MongoDB, Supabase)
export async function getProducts() {
  return await db.product.findMany()
}
```

Simply replace the export functions with API/database calls. All components use the same function signatures.

---

## 💰 Crypto Payment Integration

To add real crypto payments:

1. **NOWPayments** – `nowpayments.io` (easiest integration)
2. **CoinGate** – `coingate.com`
3. **Plisio** – `plisio.net`

Replace the payment section in `/app/checkout/page.js` with the payment gateway's checkout widget.

---

## 🎨 Design System

- **Primary color**: `#0066CC` (medical blue)
- **Font Display**: Outfit (headings)
- **Font Body**: DM Sans (body text)
- **Shadows**: Custom `shadow-card` and `shadow-card-hover`
- **Animations**: CSS transitions, hover transforms

---

## ⚠️ Demo Disclaimer

This is a demo prototype for client presentation purposes. 
- No real products are sold
- No real payments are processed
- Crypto wallet addresses are placeholders
- Email sending is simulated (console.log)

---

## 📧 Admin Order Simulation

When an order is placed, the system:
1. Generates a unique order ID (`IM` + timestamp + random)
2. Logs full order data to browser console
3. Simulates customer email confirmation
4. Simulates admin notification email
5. Saves order to `sessionStorage` for the confirmation page
6. Clears the cart

In production, replace the `handleSubmit` function in checkout with:
- API call to backend (Next.js API routes)
- Database save (Prisma/MongoDB)
- Email via SendGrid/Mailgun/Postmark
- Webhook to admin panel
