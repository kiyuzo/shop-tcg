'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'

export default function AccountPage() {
  const router = useRouter()
  const { user, isAuthenticated, logout, checkAuth } = useAuthStore()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load user data if authenticated
    if (isAuthenticated) {
      checkAuth()
    }
  }, [])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    // Fetch user orders
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token')
        console.log('Fetching orders with token:', token ? 'Token exists' : 'No token')
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/user/my-orders`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        console.log('Orders response status:', response.status)
        
        if (response.ok) {
          const data = await response.json()
          console.log('Orders data:', data)
          setOrders(data)
        } else {
          const error = await response.text()
          console.error('Failed to fetch orders:', error)
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [isAuthenticated, router])

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    router.push('/')
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-wabi-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-sumi-900 mb-2">My Account</h1>
          <p className="text-sumi-600">Manage your profile and view your orders</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <h2 className="text-2xl font-display font-semibold text-sumi-900 mb-6">Profile</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-sumi-600 block mb-1">Name</label>
                  <p className="text-sumi-900 font-medium">{user?.name}</p>
                </div>
                
                <div>
                  <label className="text-sm text-sumi-600 block mb-1">Email</label>
                  <p className="text-sumi-900 font-medium">{user?.email}</p>
                </div>

                <div className="pt-4 border-t border-sumi-200">
                  <button
                    onClick={handleLogout}
                    className="btn-secondary w-full"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              <h2 className="text-2xl font-display font-semibold text-sumi-900 mb-6">Order History</h2>
              
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sumi-900"></div>
                  <p className="mt-4 text-sumi-600">Loading orders...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-sumi-600 mb-4">No orders yet</p>
                  <button
                    onClick={() => router.push('/products')}
                    className="btn-primary"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div 
                      key={order.order_id}
                      className="border border-sumi-200 rounded-lg p-4 hover:border-sakura-600 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-sumi-900">Order #{order.order_id}</p>
                          <p className="text-sm text-sumi-600">
                            {new Date(order.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>

                      <div className="space-y-2 mb-3">
                        {order.order_items?.map((item: any, idx: number) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-sumi-700">{item.product_name} × {item.quantity}</span>
                            <span className="text-sumi-900 font-medium">Rp {(item.price_at_purchase * item.quantity)?.toLocaleString('id-ID')}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-sumi-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-sumi-600">Shipping Address</span>
                        </div>
                        <p className="text-sm text-sumi-700 mb-3">{order.shipping_address}</p>
                        
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-sumi-900">Total</span>
                          <span className="text-lg font-bold text-sakura-600">Rp {order.total_price?.toLocaleString('id-ID')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
