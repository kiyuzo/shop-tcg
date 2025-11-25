'use client'

import Link from 'next/link'
import { useWishlistStore } from '@/store/wishlistStore'
import { XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/store/cartStore'
import toast from 'react-hot-toast'
import Image from 'next/image'

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore()
  const { addItem: addToCart } = useCartStore()

  const handleAddToCart = (item: any) => {
    addToCart({
      productId: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      condition: 'Near Mint', // Default condition
    })
    toast.success('Added to cart')
  }

  if (items.length === 0) {
    return (
      <div className="container-zen section-spacing min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-display font-bold text-sumi-900 mb-4">
            Your Wishlist is Empty
          </h1>
          <p className="text-sumi-600 mb-8">
            Save cards you love for later
          </p>
          <Link href="/products" className="btn-primary inline-block">
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-wabi-50 min-h-screen">
      <div className="container-zen section-spacing">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-sumi-900 mb-12">
          My Wishlist
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.productId} className="card overflow-hidden group">
              <div className="relative aspect-[3/4] bg-wabi-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => removeItem(item.productId)}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm hover:bg-white transition-all z-10"
                  aria-label="Remove from wishlist"
                >
                  <XMarkIcon className="w-5 h-5 text-sumi-700" />
                </button>
              </div>

              <div className="p-4">
                <Link
                  href={`/products/${item.productId}`}
                  className="font-display font-semibold text-sumi-900 mb-2 line-clamp-2 block hover:text-sakura-600 transition-colors"
                >
                  {item.name}
                </Link>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-sumi-900">
                    ${item.price.toFixed(2)}
                  </span>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="p-2 bg-sumi-900 text-wabi-50 hover:bg-sumi-800 transition-colors"
                    aria-label="Add to cart"
                  >
                    <ShoppingCartIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
