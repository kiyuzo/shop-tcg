'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useAuthStore } from '@/store/authStore'
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

interface InventoryItem {
  inventory_id: number
  price: number
  stock_quantity: number
  condition: string
}

interface Product {
  product_id: number
  api_card_id?: string
  name: string
  image_url: string
  set_name?: string
  rarity?: string
  game?: string
  inventory: InventoryItem[]
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { addItem: addToCart } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedInventory, setSelectedInventory] = useState<InventoryItem | null>(null)
  const [quantity, setQuantity] = useState(1)

  const productId = params.id as string
  const inWishlist = isInWishlist(productId)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products/${productId}`)
        if (response.ok) {
          const data = await response.json()
          setProduct(data)
          
          // Select first available inventory by default
          if (data.inventory && data.inventory.length > 0) {
            setSelectedInventory(data.inventory[0])
          }
        } else {
          toast.error('Product not found')
          router.push('/products')
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        toast.error('Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId, router])

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to your cart')
      router.push('/login')
      return
    }

    if (!selectedInventory || selectedInventory.stock_quantity === 0) {
      toast.error('This product is out of stock')
      return
    }

    if (quantity > selectedInventory.stock_quantity) {
      toast.error(`Only ${selectedInventory.stock_quantity} items available`)
      return
    }

    addToCart({
      productId: productId,
      name: product!.name,
      price: selectedInventory.price,
      image: product!.image_url,
      quantity: quantity,
      condition: selectedInventory.condition,
      stockQuantity: selectedInventory.stock_quantity,
    })

    toast.success('Added to cart')
  }

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to your wishlist')
      router.push('/login')
      return
    }

    if (inWishlist) {
      removeFromWishlist(productId)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist({
        productId: productId,
        name: product!.name,
        price: selectedInventory?.price || 0,
        image: product!.image_url,
      })
      toast.success('Added to wishlist')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-wabi-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sumi-900"></div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  return (
    <div className="min-h-screen bg-wabi-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="text-sumi-600 hover:text-sumi-900 mb-6 flex items-center gap-2"
        >
          ← Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative aspect-[3/4] bg-wabi-100 rounded-lg overflow-hidden">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Product Info */}
          <div>
            {/* Game & Set */}
            <p className="text-sm text-sumi-500 uppercase tracking-wide mb-2">
              {product.game || 'TCG'} {product.set_name && `• ${product.set_name}`}
            </p>

            {/* Name */}
            <h1 className="text-4xl font-display font-bold text-sumi-900 mb-4">
              {product.name}
            </h1>

            {/* Rarity */}
            {product.rarity && (
              <div className="inline-block px-3 py-1 bg-sumi-900 text-wabi-50 text-sm font-medium mb-6">
                {product.rarity}
              </div>
            )}

            {/* Inventory Options */}
            {product.inventory && product.inventory.length > 0 ? (
              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-sumi-900 mb-3">
                    Available Options
                  </h3>
                  
                  {/* Condition Selection */}
                  <div className="space-y-2">
                    {product.inventory.map((inv) => (
                      <button
                        key={inv.inventory_id}
                        onClick={() => {
                          setSelectedInventory(inv)
                          setQuantity(1)
                        }}
                        className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                          selectedInventory?.inventory_id === inv.inventory_id
                            ? 'border-sakura-600 bg-sakura-50'
                            : 'border-sumi-200 hover:border-sumi-400'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-sumi-900">
                              {inv.condition}
                            </p>
                            <p className="text-sm text-sumi-600">
                              Stock: {inv.stock_quantity}
                            </p>
                          </div>
                          <p className="text-xl font-bold text-sumi-900">
                            Rp {inv.price.toLocaleString('id-ID')}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
                {selectedInventory && selectedInventory.stock_quantity > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-sumi-900 mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 border border-sumi-300 hover:bg-sumi-100 transition-colors"
                      >
                        -
                      </button>
                      <span className="text-xl font-semibold text-sumi-900 w-12 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          setQuantity(Math.min(selectedInventory.stock_quantity, quantity + 1))
                        }
                        disabled={quantity >= selectedInventory.stock_quantity}
                        className="px-4 py-2 border border-sumi-300 hover:bg-sumi-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                {/* Price Display */}
                {selectedInventory && (
                  <div className="pt-6 border-t border-sumi-200">
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-3xl font-bold text-sumi-900">
                        Rp {(selectedInventory.price * quantity).toLocaleString('id-ID')}
                      </span>
                      {quantity > 1 && (
                        <span className="text-sm text-sumi-600">
                          (Rp {selectedInventory.price.toLocaleString('id-ID')} each)
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <button
                        onClick={handleAddToCart}
                        disabled={selectedInventory.stock_quantity === 0}
                        className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ShoppingCartIcon className="w-5 h-5" />
                        {selectedInventory.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>

                      <button
                        onClick={handleWishlistToggle}
                        className="btn-secondary px-6"
                      >
                        {inWishlist ? (
                          <HeartIconSolid className="w-6 h-6 text-sakura-500" />
                        ) : (
                          <HeartIcon className="w-6 h-6" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-sumi-600">
                No inventory available for this product
              </div>
            )}

            {/* Card ID */}
            {product.api_card_id && (
              <div className="mt-8 pt-8 border-t border-sumi-200">
                <p className="text-sm text-sumi-600">
                  Card ID: <span className="font-mono">{product.api_card_id}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
