import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { RiHeartLine, RiDeleteBinLine, RiShoppingBagLine, RiArrowLeftLine } from 'react-icons/ri'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { dispatch } = useCart()

  const handleMoveToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
    removeFromWishlist(product.id)
  }

  if (wishlist.length === 0) return (
    <main className="pt-[73px] min-h-screen flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="text-center">
        <RiHeartLine className="text-6xl text-taupe mx-auto mb-6" />
        <h2 className="font-cormorant text-4xl font-light text-dark mb-4">
          Your Wishlist is Empty
        </h2>
        <p className="text-sm text-muted mb-8">
          Save pieces you love and come back to them anytime.
        </p>
        <Link to="/" className="inline-flex items-center gap-2 bg-dark text-cream px-8 py-4 text-[10px] tracking-[0.25em] uppercase hover:bg-accent transition-colors">
          <RiArrowLeftLine /> Explore Collection
        </Link>
      </motion.div>
    </main>
  )

  return (
    <main className="pt-[73px] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-2">Saved Pieces</p>
            <h1 className="font-cormorant text-5xl font-light text-dark">
              My <em className="italic text-accent">Wishlist</em>
            </h1>
          </div>
          <span className="text-sm text-muted">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <AnimatePresence>
            {wishlist.map(product => (
              <motion.div key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group">

                {/* Image */}
                <div className="relative overflow-hidden mb-4 bg-beige">
                  <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.name}
                      className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105" />
                  </Link>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 bg-cream/90 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-dark hover:text-cream"
                  >
                    <RiDeleteBinLine className="text-sm" />
                  </button>

                  {/* Move to cart overlay */}
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="absolute bottom-0 left-0 right-0 bg-dark/90 text-cream text-[10px] tracking-[0.2em] uppercase py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2"
                  >
                    <RiShoppingBagLine /> Move to Cart
                  </button>
                </div>

                {/* Info */}
                <div className="text-[10px] tracking-[0.2em] uppercase text-muted mb-1">
                  {product.category}
                </div>
                <Link to={`/product/${product.id}`}>
                  <div className="font-cormorant text-lg text-dark hover:text-accent transition-colors mb-1">
                    {product.name}
                  </div>
                </Link>
                <div className="text-sm text-dark">
                  ৳{product.price.toLocaleString()}
                  {product.originalPrice && (
                    <span className="text-muted line-through ml-2 text-xs">
                      ৳{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link to="/"
            className="inline-flex items-center gap-2 border border-dark text-dark px-10 py-4 text-[10px] tracking-[0.25em] uppercase hover:bg-dark hover:text-cream transition-colors duration-300">
            <RiArrowLeftLine /> Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  )
}