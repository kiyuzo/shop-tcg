import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  condition: string
  stockQuantity?: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const items = get().items
        const existingItem = items.find(
          (i) => i.productId === item.productId && i.condition === item.condition
        )
        
        if (existingItem) {
          const newQuantity = existingItem.quantity + item.quantity
          const maxStock = item.stockQuantity || existingItem.stockQuantity || 999
          
          if (newQuantity > maxStock) {
            // Don't add more than available stock
            return
          }
          
          set({
            items: items.map((i) =>
              i.id === existingItem.id
                ? { ...i, quantity: newQuantity, stockQuantity: item.stockQuantity || i.stockQuantity }
                : i
            ),
          })
        } else {
          set({
            items: [...items, { ...item, id: crypto.randomUUID() }],
          })
        }
      },
      
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) })
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
        } else {
          const item = get().items.find((i) => i.id === id)
          const maxStock = item?.stockQuantity || 999
          
          // Cap quantity at available stock
          const finalQuantity = Math.min(quantity, maxStock)
          
          set({
            items: get().items.map((i) =>
              i.id === id ? { ...i, quantity: finalQuantity } : i
            ),
          })
        }
      },
      
      clearCart: () => {
        set({ items: [] })
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)
