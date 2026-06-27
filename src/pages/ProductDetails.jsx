import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RiArrowLeftLine, RiShoppingBagLine, RiHeartLine, RiHeartFill, RiStarFill } from 'react-icons/ri'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard/ProductCard'

export default function ProductDetails() {
  const { id } = useParams()
  const product = products.find(p => p.id === Number(id))
  const { dispatch } = useCart()
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) return (
    <div className="pt-32 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="font-cormorant text-4xl text-dark mb-4">Product not found</p>
        <Link to="/" className="text-muted underline text-sm">Return Home</Link>
      </div>
    </div>
  )

  const wishlisted = isWishlisted(product.id)
  const related = products.filter(p => p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleWishlist = () => {
    wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)
  }

  return (
    <main className="pt-[73px]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-10 text-[10px] tracking-[0.2em] uppercase text-muted">
          <Link to="/" className="hover:text-dark transition-colors flex items-center gap-1"><RiArrowLeftLine /> Home</Link>
          <span>/</span><span>{product.category}</span><span>/</span>
          <span className="text-dark">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Images */}
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden mb-3">
              <img src={product.images?.[selectedImage] ?? product.image} alt={product.name} className="w-full h-[580px] object-cover" />
            </motion.div>
            {product.images?.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-dark' : 'border-transparent'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted mb-3">{product.category}</p>
            <h1 className="font-cormorant text-4xl md:text-5xl font-light text-dark mb-3">{product.name}</h1>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_,i) => <RiStarFill key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-[#B8956A]' : 'text-taupe'}`} />)}
              </div>
              <span className="text-xs text-muted">({product.reviews} reviews)</span>
            </div>
            <div className="flex items-baseline gap-3 mb-8 pb-8 border-b border-taupe/40">
              <span className="font-cormorant text-3xl text-dark">৳{product.price.toLocaleString()}</span>
              {product.originalPrice && <span className="text-muted line-through text-base">৳{product.originalPrice.toLocaleString()}</span>}
              {product.originalPrice && <span className="text-[10px] tracking-wide uppercase text-accent bg-beige px-2 py-1">{Math.round((1 - product.price / product.originalPrice) * 100)}% Off</span>}
            </div>
            <p className="text-sm text-[#7a6e64] leading-relaxed mb-8">{product.description}</p>

            {/* Colors */}
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted mb-3">Color: <span className="text-dark">{selectedColor || 'Select'}</span></p>
              <div className="flex gap-2 flex-wrap">
                {(product.colors ?? []).map(c => (
                  <button key={c} onClick={() => setSelectedColor(c)}
                    className={`px-4 py-2 text-[11px] tracking-wide border transition-all ${selectedColor === c ? 'border-dark bg-dark text-cream' : 'border-taupe text-muted hover:border-dark'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            {product.sizes?.[0] !== 'One Size' && (
              <div className="mb-8">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted mb-3">Size: <span className="text-dark">{selectedSize || 'Select'}</span></p>
                <div className="flex gap-2 flex-wrap">
                  {(product.sizes ?? []).map(s => (
                    <button key={s} onClick={() => setSelectedSize(s)}
                      className={`w-12 h-12 text-xs border transition-all ${selectedSize === s ? 'border-dark bg-dark text-cream' : 'border-taupe text-muted hover:border-dark'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted mb-3">Quantity</p>
              <div className="flex items-center border border-taupe w-fit">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 text-muted hover:text-dark hover:bg-beige transition-colors text-lg">−</button>
                <span className="w-12 text-center text-sm font-cormorant text-dark">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 text-muted hover:text-dark hover:bg-beige transition-colors text-lg">+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-3 py-4 text-[10px] tracking-[0.25em] uppercase transition-colors duration-300 ${added ? 'bg-accent text-cream' : 'bg-dark text-cream hover:bg-accent'}`}>
                <RiShoppingBagLine className="text-base" />
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <button onClick={handleWishlist}
                className={`w-14 h-14 border flex items-center justify-center transition-all duration-300 ${wishlisted ? 'border-accent bg-accent/10' : 'border-taupe hover:border-dark'}`}>
                {wishlisted
                  ? <RiHeartFill className="text-accent text-lg" />
                  : <RiHeartLine className="text-muted text-lg" />}
              </button>
            </div>

            {/* Wishlist status */}
            {wishlisted && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-[10px] tracking-[0.2em] uppercase text-accent mb-6 flex items-center gap-2">
                <RiHeartFill className="text-xs" /> Saved to your wishlist
              </motion.p>
            )}

            {/* Features */}
            <div className="border-t border-taupe/40 pt-6">
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted mb-4">Product Details</p>
              <ul className="flex flex-col gap-2">
                {(product.features ?? []).map(f => (
                  <li key={f} className="text-xs text-[#7a6e64] flex items-center gap-2">
                    <span className="text-accent text-[8px]">◆</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Related */}
        <section className="mt-24">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-4">You May Also Like</p>
          <h2 className="font-cormorant text-4xl font-light text-dark mb-10">Related <em className="italic text-accent">Pieces</em></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </div>
    </main>
  )
}