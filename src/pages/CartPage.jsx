import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { RiDeleteBinLine, RiArrowLeftLine, RiShoppingBagLine } from 'react-icons/ri'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { cart, dispatch, total, count } = useCart()

  if (cart.length === 0) return (
    <main className="pt-[73px] min-h-screen flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <RiShoppingBagLine className="text-6xl text-taupe mx-auto mb-6" />
        <h2 className="font-cormorant text-4xl font-light text-dark mb-4">Your Cart is Empty</h2>
        <p className="text-sm text-muted mb-8">Discover our curated collection and find something you love.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-dark text-cream px-8 py-4 text-[10px] tracking-[0.25em] uppercase hover:bg-accent transition-colors">
          <RiArrowLeftLine /> Continue Shopping
        </Link>
      </motion.div>
    </main>
  )

  const shipping = total >= 3000 ? 0 : 150

  return (
    <main className="pt-[73px] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-2">Review</p>
            <h1 className="font-cormorant text-5xl font-light text-dark">Your <em className="italic text-accent">Cart</em></h1>
          </div>
          <span className="text-sm text-muted">{count} {count === 1 ? 'item' : 'items'}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-14">
          <div className="lg:col-span-2">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 mb-4 text-[10px] tracking-[0.2em] uppercase text-muted" style={{ borderBottom: '0.5px solid #D4C9B8' }}>
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-1 text-right">Total</div>
            </div>
            <AnimatePresence>
              {cart.map(item => (
                <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="grid md:grid-cols-12 gap-4 items-center py-6" style={{ borderBottom: '0.5px solid #D4C9B8' }}>
                  <div className="md:col-span-6 flex gap-4 items-center">
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-20 h-24 object-cover bg-beige" />
                    </Link>
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-muted mb-1">{item.category}</p>
                      <Link to={`/product/${item.id}`}><h3 className="font-cormorant text-lg text-dark hover:text-accent transition-colors">{item.name}</h3></Link>
                      <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                        className="flex items-center gap-1 text-[10px] text-muted hover:text-dark mt-2 transition-colors md:hidden">
                        <RiDeleteBinLine className="text-sm" /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="md:col-span-2 text-center">
                    <span className="font-cormorant text-lg text-dark">৳{item.price.toLocaleString()}</span>
                  </div>
                  <div className="md:col-span-3 flex items-center justify-center">
                    <div className="flex items-center border border-taupe">
                      <button onClick={() => dispatch({ type: 'DECREASE_QTY', payload: item.id })} className="w-8 h-8 text-muted hover:text-dark hover:bg-beige transition-colors">−</button>
                      <span className="w-10 text-center text-sm font-cormorant text-dark">{item.quantity}</span>
                      <button onClick={() => dispatch({ type: 'INCREASE_QTY', payload: item.id })} className="w-8 h-8 text-muted hover:text-dark hover:bg-beige transition-colors">+</button>
                    </div>
                  </div>
                  <div className="md:col-span-1 text-right flex md:block items-center justify-between">
                    <span className="font-cormorant text-lg text-dark">৳{(item.price * item.quantity).toLocaleString()}</span>
                    <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                      className="hidden md:block text-muted hover:text-dark transition-colors ml-auto mt-2">
                      <RiDeleteBinLine className="text-base" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <Link to="/" className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted hover:text-dark transition-colors mt-6">
              <RiArrowLeftLine /> Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-beige p-8 sticky top-24">
              <h2 className="font-cormorant text-2xl font-light text-dark mb-6">Order Summary</h2>
              <div className="flex flex-col gap-4 pb-6 mb-6" style={{ borderBottom: '0.5px solid #D4C9B8' }}>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-cormorant text-dark">৳{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Shipping</span>
                  <span className="font-cormorant text-dark">{shipping === 0 ? 'Free' : '৳150'}</span>
                </div>
                {total < 3000 && <p className="text-[10px] text-accent">Add ৳{(3000 - total).toLocaleString()} more for free shipping</p>}
              </div>
              <div className="flex justify-between mb-8">
                <span className="text-[10px] tracking-[0.2em] uppercase text-dark font-medium">Total</span>
                <span className="font-cormorant text-2xl text-dark">৳{(total + shipping).toLocaleString()}</span>
              </div>
              <Link to="/checkout" className="block w-full text-center bg-dark text-cream py-4 text-[10px] tracking-[0.25em] uppercase hover:bg-accent transition-colors duration-300 mb-3">
                Proceed to Checkout
              </Link>
              <button onClick={() => dispatch({ type: 'CLEAR_CART' })}
                className="block w-full text-center border border-taupe text-muted py-3 text-[10px] tracking-[0.2em] uppercase hover:border-dark hover:text-dark transition-colors">
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
