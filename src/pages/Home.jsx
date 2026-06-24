import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { RiArrowRightLine } from 'react-icons/ri'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard/ProductCard'


const marqueeItems = ['New Season Arrivals','Free Shipping Worldwide','Sustainably Crafted','Timeless Elegance','Exclusive Designs']

const PAGE_SIZE = 8

function FeaturedSection() {
  const [tab, setTab] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [page, setPage] = useState(1)
  const [showAll, setShowAll] = useState(false)

  const allCategories = ['All', ...Array.from(new Set(products.map(p => p.category)))]
  const tabs = ['All', 'New Arrivals', 'Best Sellers', 'Sale']

  const filtered = products
    .filter(p => {
      if (tab === 'New Arrivals') return p.isNew
      if (tab === 'Best Sellers') return p.isBestSeller
      if (tab === 'Sale') return p.isSale
      return true
    })
    .filter(p => categoryFilter === 'All' || p.category === categoryFilter)

  const displayed = showAll ? filtered : filtered.slice(0, page * PAGE_SIZE)

  function handleTabChange(t) { setTab(t); setPage(1); setShowAll(false) }
  function handleCatChange(c) { setCategoryFilter(c); setPage(1); setShowAll(false) }

  return (
    <section className="py-10 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-4">Handpicked</p>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
        <h2 className="font-cormorant text-5xl font-light text-dark">
          Featured <em className="italic text-accent">Picks</em>
          <span className="font-sans text-sm font-normal text-muted ml-3 not-italic">
            {filtered.length} items
          </span>
        </h2>
        {/* Status tabs */}
        <div className="flex items-center gap-1 bg-beige p-1 flex-wrap">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => handleTabChange(t)}
              className={`text-[10px] tracking-[0.2em] uppercase px-4 py-2 transition-colors duration-200
                ${tab === t ? 'bg-dark text-cream' : 'text-muted hover:text-dark'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2" style={{scrollbarWidth:'none'}}>
        {allCategories.map(c => (
          <button
            key={c}
            onClick={() => handleCatChange(c)}
            className={`shrink-0 text-[10px] tracking-[0.2em] uppercase px-4 py-2 border transition-all duration-200
              ${categoryFilter === c
                ? 'bg-dark text-cream border-dark'
                : 'bg-transparent border-[#C0B0A0] text-muted hover:border-dark hover:text-dark'}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-cormorant text-2xl text-muted">No products found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {displayed.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 8) * 0.07 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>

          {/* Load more controls */}
          {!showAll && filtered.length > displayed.length && (
            <div className="flex flex-col items-center gap-4 mt-14">
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted">
                Showing {displayed.length} of {filtered.length} pieces
              </p>
              {/* Progress bar */}
              <div className="w-48 h-px bg-[#D4C9B8] overflow-hidden">
                <div
                  className="h-full bg-dark transition-all duration-500"
                  style={{ width: `${(displayed.length / filtered.length) * 100}%` }}
                />
              </div>
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="inline-flex items-center gap-3 bg-dark text-cream px-8 py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-accent transition-colors duration-300"
                >
                  Load More <RiArrowRightLine />
                </button>
                <button
                  onClick={() => setShowAll(true)}
                  className="inline-flex items-center gap-3 border border-dark text-dark px-8 py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-dark hover:text-cream transition-colors duration-300"
                >
                  View All {filtered.length}
                </button>
              </div>
            </div>
          )}

          {showAll && (
            <div className="flex justify-center mt-14">
              <button
                onClick={() => { setShowAll(false); setPage(1) }}
                className="border border-dark text-dark px-8 py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-dark hover:text-cream transition-colors duration-300"
              >
                Show Less
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default function Home() {
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4)

  return (
    <main className="pt-[73px]">
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1400&auto=format&fit=crop" alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-6">SS 2025 Collection</p>
            <h1 className="font-cormorant text-6xl md:text-8xl font-light text-dark leading-none mb-6">
              Summer<br /><em className="italic text-accent">Space,</em><br />Minimal<br />Grace
            </h1>
            <p className="text-sm text-[#7a6e64] tracking-wide max-w-xs leading-relaxed mb-10">
              Effortless silhouettes crafted for the modern woman who moves with intention.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/" className="inline-flex items-center gap-3 bg-dark text-cream px-8 py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-accent transition-colors duration-300">
                Explore Collection <RiArrowRightLine />
              </Link>
              <Link to="/" className="inline-flex items-center gap-3 border border-dark text-dark px-8 py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-dark hover:text-cream transition-colors duration-300">
                Our Story
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex gap-10 mt-16 flex-wrap">
            {[['240+','New Pieces'],['18','Designers'],['Free','Shipping']].map(([val, label]) => (
              <div key={label}>
                <div className="font-cormorant text-3xl font-light text-dark">{val}</div>
                <div className="text-[9px] tracking-[0.3em] uppercase text-muted mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-dark py-4 overflow-hidden">
        <div className="marquee-track">
          {[...marqueeItems,...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-6 mr-12 text-[10px] tracking-[0.3em] uppercase text-[#6a6058] whitespace-nowrap">
              {item} <span className="w-1 h-1 rounded-full bg-accent inline-block" />
            </span>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-4">Explore</p>
        <div className="flex justify-between items-end mb-10">
          <h2 className="font-cormorant text-5xl font-light text-dark">Shop by<br /><em className="italic text-accent">Category</em></h2>
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted border-b border-muted pb-0.5 cursor-pointer">View All</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((cat, i) => (
            <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden cursor-pointer"
              style={{ height: i === 0 || i === 2 ? '420px' : '320px' }}>
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/40 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-cormorant text-2xl italic text-cream font-light">{cat.name}</p>
                <p className="text-[9px] tracking-[0.2em] uppercase text-cream/70 mt-1">{cat.count}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS — with filter + load more */}
      <FeaturedSection />

      {/* EDITORIAL BANNER */}
      <section className="my-20 grid md:grid-cols-2 min-h-[440px]">
        <div className="bg-dark flex flex-col justify-center px-12 py-16">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#6B5E50] mb-6">Limited Edition</p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light text-beige leading-tight mb-6">Essential<br /><em className="italic">Dressing</em></h2>
          <p className="text-xs text-[#7a6e64] tracking-wide leading-relaxed max-w-xs mb-10">Sustainably designed, effortlessly worn. Our capsule collection for the mindful wardrobe.</p>
          <Link to="/" className="inline-flex items-center gap-3 border border-beige text-beige px-8 py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-beige hover:text-dark transition-colors duration-300 w-fit">
            Shop the Edit <RiArrowRightLine />
          </Link>
        </div>
        <div className="relative overflow-hidden min-h-[300px]">
          <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&auto=format&fit=crop" alt="Editorial" className="w-full h-full object-cover" />
          <div className="absolute top-6 right-6 bg-dark text-cream text-[9px] tracking-[0.2em] uppercase px-4 py-3 text-center">New<br />Season</div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="py-4 px-6 max-w-7xl mx-auto">
        <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-4">Trending Now</p>
        <h2 className="font-cormorant text-5xl font-light text-dark mb-10">Best <em className="italic text-accent">Sellers</em></h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 my-10 bg-beige">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-4 text-center">Our Promise</p>
          <h2 className="font-cormorant text-5xl font-light text-dark text-center mb-14">Why <em className="italic text-accent">Parijat</em></h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: '✦', title: 'Curated Quality', desc: 'Every piece is handpicked and quality-verified before it reaches you.' },
              { icon: '◈', title: 'Sustainable Design', desc: 'We partner with ethical manufacturers who share our values.' },
              { icon: '◇', title: 'Free Worldwide Shipping', desc: 'Complimentary shipping on all orders above ৳3000.' },
              { icon: '○', title: 'Easy Returns', desc: '30-day hassle-free returns with no questions asked.' },
            ].map(item => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
                <div className="text-2xl text-accent mb-4">{item.icon}</div>
                <h3 className="font-cormorant text-xl text-dark mb-3">{item.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIAL OFFER */}
      <section className="relative overflow-hidden py-24 px-6">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1495385794356-15371f348c31?w=1400&auto=format&fit=crop" alt="offer" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-dark/55" />
        </div>
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] uppercase text-taupe mb-4">Special Offer</p>
          <h2 className="font-cormorant text-5xl md:text-7xl font-light text-cream mb-6">Up to <em className="italic">40% Off</em><br />New Season</h2>
          <p className="text-sm text-cream/70 mb-10 leading-relaxed">Limited time offer on selected pieces from our new collection.</p>
          <Link to="/" className="inline-flex items-center gap-3 bg-cream text-dark px-10 py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-beige transition-colors duration-300">
            Shop Sale <RiArrowRightLine />
          </Link>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20 px-6 bg-[#F0EBE2]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-4">Testimonials</p>
          <h2 className="font-cormorant text-5xl font-light text-dark mb-14">What Our <em className="italic text-accent">Clients Say</em></h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { text: "The quality is unmatched. Every piece feels like it was made just for me — effortless and beautiful.", author: "Sofia M.", location: "London" },
              { text: "Parijat understands the modern woman. Minimalist yet expressive — I receive compliments on every piece.", author: "Isabelle R.", location: "Paris" },
              { text: "Sustainable and stunning. I love that I can wear these pieces season after season without feeling dated.", author: "Amara K.", location: "New York" },
            ].map(r => (
              <motion.div key={r.author} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-cream p-8" style={{ border: '0.5px solid #D4C9B8' }}>
                <div className="flex gap-1 mb-5">{[...Array(5)].map((_,i) => <span key={i} className="text-[#B8956A] text-sm">★</span>)}</div>
                <p className="font-cormorant text-xl italic font-light text-dark leading-relaxed mb-6">"{r.text}"</p>
                <div className="w-6 h-px bg-taupe mb-3" />
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted">{r.author} — {r.location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 px-6 bg-beige">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-4">Stay Inspired</p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-dark leading-tight">Join Our<br /><em className="italic text-accent">Fashion Circle</em></h2>
            <p className="text-xs text-muted mt-4 leading-relaxed">Be the first to know about new arrivals, exclusive offers, and styling notes.</p>
          </div>
          <div className="flex-1 max-w-md w-full">
            <div className="flex">
              <input type="email" placeholder="Your email address"
                className="flex-1 bg-transparent border border-[#B0A090] border-r-0 px-5 py-4 text-xs text-dark placeholder-[#A09080] outline-none" />
              <button className="bg-dark text-cream px-7 py-4 text-[10px] tracking-[0.25em] uppercase hover:bg-accent transition-colors duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-[10px] text-muted mt-3">No spam — only curated fashion inspiration.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
