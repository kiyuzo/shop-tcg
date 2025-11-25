'use client'

import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Please enter your email')
      return
    }

    setLoading(true)

    try {
      await axios.post(`${API_URL}/api/newsletter/subscribe`, { email })
      toast.success('Successfully subscribed to newsletter!')
      setEmail('')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to subscribe')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section-spacing bg-sumi-900 text-wabi-50">
      <div className="container-zen">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-wabi-300 mb-8">
            Subscribe to receive exclusive offers, new arrivals, and TCG news
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-wabi-50 text-sumi-900 placeholder-sumi-400 focus:outline-none focus:ring-2 focus:ring-wabi-200"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-wabi-50 text-sumi-900 font-medium hover:bg-wabi-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          
          <p className="text-sm text-wabi-400 mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}
