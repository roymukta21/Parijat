# Parijat — Luxury Fashion E-Commerce

A modern luxury fashion e-commerce landing page built with React.js, Vite, React Router, and Tailwind CSS.

---

## 🌐 Live Demo
[https://parijatapp.netlify.app/](https://parijatapp.netlify.app/)

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| React.js (Vite) | Frontend framework |
| React Router v6 | Client-side routing |
| Tailwind CSS v3 | Utility-first styling |
| Framer Motion | Animations & transitions |
| React Icons | Icon library |

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── Navbar/
│   │   └── Navbar.jsx        # Sticky navbar with cart count badge
│   ├── Footer/
│   │   └── Footer.jsx        # Footer with links and social icons
│   └── ProductCard/
│       └── ProductCard.jsx   # Reusable product card with quick-add
├── context/
│   └── CartContext.jsx       # Global cart state via useReducer
├── data/
│   └── products.js           # Product & category mock data
└── pages/
    ├── Home.jsx              # Landing page with all sections
    ├── ProductDetails.jsx    # Product detail with gallery
    ├── CartPage.jsx          # Cart management
    └── CheckoutPage.jsx      # 3-step checkout flow
```

---

## 🚀 Project Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/parijat.git
cd parijat
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```

### 4. Open in browser
```
http://localhost:5173
```

### 5. Build for production
```bash
npm run build
```

---

## ☁️ Deploy to Netlify

1. Push project to GitHub
2. Go to [netlify.com](https://netlify.com) and click **"Add new site"**
3. Connect your GitHub repository
4. Set build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy**

> ⚠️ Make sure `public/_redirects` file contains:
> ```
> /* /index.html 200
> ```
> This enables React Router to work on Netlify.

---

## ✨ Features

### Pages
- **Home** — Hero banner, marquee strip, categories, featured products, editorial banner, best sellers, why choose us, special offer, reviews, newsletter
- **Product Details** — Image gallery, size & color selector, quantity picker, add to cart, related products
- **Cart** — Add, remove, increase/decrease quantity, dynamic total, free shipping threshold
- **Checkout** — 3-step flow (Customer Info → Shipping → Payment), multiple payment methods, order success screen

### Technical
- ✅ React Router v6 — no page reloads
- ✅ Context API + useReducer for cart state
- ✅ Framer Motion animations
- ✅ Fully responsive (mobile-first)
- ✅ Reusable components
- ✅ Clean folder structure

---

## 🎨 Design Notes

- **Brand:** Parijat — Luxury Fashion
- **Color Palette:** Cream `#FAF7F2`, Beige `#EDE8DF`, Taupe `#C8BEB0`, Dark `#1a1a1a`, Accent `#6B5E50`
- **Typography:** Cormorant Garamond (serif) + Jost (sans-serif)
- **Aesthetic:** Editorial, minimal, luxury — inspired by modern high-fashion brands

---

## 📝 Additional Notes

- This is a **frontend-only** project — no backend or database required
- All product data is stored locally in `src/data/products.js`
- Cart state is managed with React Context API and resets on page refresh
- Payment UI is for display purposes only — no real transactions occur
- Images are sourced from [Unsplash](https://unsplash.com) (free to use)

---

*Built for CodesRaft Frontend Developer Internship Assessment — 2025*