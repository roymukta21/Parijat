import { createContext, useContext, useReducer } from 'react'
const CartContext = createContext()
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const exists = state.find(i => i.id === action.payload.id)
      if (exists) return state.map(i => i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...state, { ...action.payload, quantity: 1 }]
    }
    case 'REMOVE_FROM_CART': return state.filter(i => i.id !== action.payload)
    case 'INCREASE_QTY': return state.map(i => i.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i)
    case 'DECREASE_QTY': return state.map(i => i.id === action.payload ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i)
    case 'CLEAR_CART': return []
    default: return state
  }
}
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [])
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const count = cart.reduce((sum, i) => sum + i.quantity, 0)
  return <CartContext.Provider value={{ cart, dispatch, total, count }}>{children}</CartContext.Provider>
}
export function useCart() { return useContext(CartContext) }
