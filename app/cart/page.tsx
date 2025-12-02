'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="container-zen section-spacing min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-display font-bold text-sumi-900 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-sumi-600 mb-8">
            Start adding some cards to your collection
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
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="card p-6">
                <div className="flex gap-6">
                  {/* Image */}
                  <div className="relative w-24 h-32 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-grow">
                    <Link
                      href={`/products/${item.productId}`}
                      className="font-display font-semibold text-lg text-sumi-900 hover:text-sakura-600 block mb-2"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-sumi-600 mb-4">
                      Condition: {item.condition}
                      {item.stockQuantity && (
                        <span className="ml-2 text-xs">
                          (Stock: {item.stockQuantity})
                        </span>
                      )}
                    </p>

                    <div className="flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-sumi-100 transition-colors"
                        >
                          <MinusIcon className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.stockQuantity ? item.quantity >= item.stockQuantity : false}
                          className="p-1 hover:bg-sumi-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <PlusIcon className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-sumi-900">
                          Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-sumi-600 hover:text-sakura-600 transition-colors"
                        >
                          <XMarkIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="font-display font-semibold text-xl text-sumi-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sumi-700">
                  <span>Subtotal</span>
                  <span>Rp {getTotalPrice().toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sumi-700">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="divider-zen"></div>

              <div className="flex justify-between text-lg font-bold text-sumi-900 mb-6">
                <span>Total</span>
                <span>Rp {getTotalPrice().toLocaleString('id-ID')}</span>
              </div>

              <Link href="/checkout" className="btn-primary w-full text-center block mb-4">
                Proceed to Checkout
              </Link>

              <Link
                href="/products"
                className="btn-secondary w-full text-center block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
