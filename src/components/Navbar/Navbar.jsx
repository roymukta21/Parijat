import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { RiShoppingBagLine, RiSearchLine, RiHeartLine, RiMenuLine, RiCloseLine } from 'react-icons/ri'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const { count } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-cream shadow-sm py-3' : 'bg-cream/95 py-5'}`}
      style={{ borderBottom: '0.5px solid #D4C9B8' }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="font-cormorant text-2xl font-light tracking-[0.3em] text-dark uppercase">
          Parijat
        </Link>
        <nav className="hidden md:flex gap-10">
          {[['/', 'Home'], ['/', 'Collections'], ['/', 'Products'], ['/', 'About']].map(([to, label]) => (
            <Link key={label} to={to} className="text-[11px] tracking-[0.25em] uppercase text-muted hover:text-dark transition-colors duration-200">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <RiSearchLine className="text-xl text-muted hover:text-dark cursor-pointer transition-colors hidden md:block" />
          <RiHeartLine className="text-xl text-muted hover:text-dark cursor-pointer transition-colors hidden md:block" />
          <Link to="/cart" className="relative">
            <RiShoppingBagLine className="text-xl text-muted hover:text-dark transition-colors" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-dark text-cream text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <button className="md:hidden text-xl text-dark" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <RiCloseLine /> : <RiMenuLine />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-cream border-t px-6 py-6 flex flex-col gap-5" style={{ borderColor: '#D4C9B8' }}>
            {[['/', 'Home'], ['/', 'Collections'], ['/', 'Products'], ['/', 'About']].map(([to, label]) => (
              <Link key={label} to={to} className="text-[11px] tracking-[0.25em] uppercase text-muted hover:text-dark">{label}</Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
