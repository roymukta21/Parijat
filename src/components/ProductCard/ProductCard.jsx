import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RiHeartLine, RiHeartFill } from 'react-icons/ri'
import { useState } from 'react'
import { useCart } from '../../context/CartContext'

export default function ProductCard({ product }) {
  const [wished, setWished] = useState(false)
  const { dispatch } = useCart()

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5 }} className="group cursor-pointer">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden mb-4 bg-beige">
          {product.tag && (
            <span className="absolute top-3 left-3 z-10 bg-dark text-cream text-[9px] tracking-[0.2em] uppercase px-2 py-1">{product.tag}</span>
          )}
          <button onClick={(e) => { e.preventDefault(); setWished(!wished) }}
            className="absolute top-3 right-3 z-10 bg-cream/90 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {wished ? <RiHeartFill className="text-dark text-sm" /> : <RiHeartLine className="text-dark text-sm" />}
          </button>
          <img src={product.image} alt={product.name} className="w-full h-72 object-cover product-card-img" />
          <button onClick={(e) => { e.preventDefault(); dispatch({ type: 'ADD_TO_CART', payload: product }) }}
            className="absolute bottom-0 left-0 right-0 bg-dark/90 text-cream text-[10px] tracking-[0.2em] uppercase py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            Quick Add
          </button>
        </div>
        <div className="text-[10px] tracking-[0.2em] uppercase text-muted mb-1">{product.category}</div>
        <div className="font-cormorant text-lg text-dark mb-1">{product.name}</div>
        <div className="text-sm text-dark">
          ৳{product.price.toLocaleString()}
          {product.originalPrice && <span className="text-muted line-through ml-2 text-xs">৳{product.originalPrice.toLocaleString()}</span>}
        </div>
      </Link>
    </motion.div>
  )
}
