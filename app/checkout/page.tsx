'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'
import Image from 'next/image'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { user, isAuthenticated } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  })

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to checkout')
      router.push('/login')
      return
    }

    if (items.length === 0) {
      router.push('/cart')
    }
  }, [isAuthenticated, items, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const total = getTotalPrice()
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          orderItems: items.map(item => ({
            product: item.productId,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
            condition: item.condition,
          })),
          shippingAddress: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
          },
          paymentMethod: 'Credit Card',
          itemsPrice: total,
          taxPrice: 0,
          shippingPrice: 500,
          totalPrice: total + 500,
        })
      })

      console.log('Order response status:', response.status)
      
      if (response.ok) {
        const orderData = await response.json()
        console.log('Order created:', orderData)
        clearCart()
        toast.success('🎉 Order placed successfully!', {
          duration: 4000,
          style: {
            background: '#10b981',
            color: '#fff',
            padding: '16px',
            fontSize: '16px',
          },
        })
        setTimeout(() => {
          router.push('/account')
        }, 1500)
      } else {
        const error = await response.json()
        console.error('Order creation failed:', error)
        toast.error(error.message || 'Failed to place order')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error('An error occurred during checkout')
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated || items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-wabi-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold text-sumi-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="card p-6 mb-6">
              <h2 className="text-2xl font-display font-semibold text-sumi-900 mb-6">
                Shipping Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="street" className="block text-sm font-medium text-sumi-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    required
                    value={formData.street}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-sumi-300 focus:ring-2 focus:ring-sakura-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-sumi-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-sumi-300 focus:ring-2 focus:ring-sakura-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-sumi-700 mb-2">
                      State/Province *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-sumi-300 focus:ring-2 focus:ring-sakura-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-sumi-700 mb-2">
                      Zip/Postal Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-sumi-300 focus:ring-2 focus:ring-sakura-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-sumi-700 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-sumi-300 focus:ring-2 focus:ring-sakura-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-sumi-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-sumi-300 focus:ring-2 focus:ring-sakura-500 focus:border-transparent"
                  />
                </div>

                <div className="pt-6 border-t border-sumi-200">
                  <h3 className="text-xl font-display font-semibold text-sumi-900 mb-4">
                    Payment Information
                  </h3>
                  <p className="text-sm text-sumi-600 mb-4">
                    This is a demo checkout. Enter any valid format for testing.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-sumi-700 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        required
                        placeholder="1234 5678 9012 3456"
                        pattern="[0-9\s]{13,19}"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-sumi-300 focus:ring-2 focus:ring-sakura-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-sumi-700 mb-2">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        required
                        placeholder="John Doe"
                        value={formData.cardName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-sumi-300 focus:ring-2 focus:ring-sakura-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-sumi-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          required
                          placeholder="MM/YY"
                          pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-sumi-300 focus:ring-2 focus:ring-sakura-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-sumi-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          required
                          placeholder="123"
                          pattern="[0-9]{3,4}"
                          value={formData.cvv}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-sumi-300 focus:ring-2 focus:ring-sakura-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-sumi-200">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-2xl font-display font-semibold text-sumi-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-4">
                    <div className="relative w-16 h-20 bg-wabi-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sumi-900 text-sm">{item.name}</h3>
                      <p className="text-sm text-sumi-600">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-sumi-900">
                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-sumi-200 pt-4 space-y-2">
                <div className="flex justify-between text-sumi-700">
                  <span>Subtotal</span>
                  <span>Rp {getTotalPrice().toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sumi-700">
                  <span>Shipping</span>
                  <span>Rp 500</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-sumi-900 pt-2 border-t border-sumi-200">
                  <span>Total</span>
                  <span>Rp {(getTotalPrice() + 500).toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
