'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/products/ProductCard'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products?featured=true&limit=8`)
        setProducts(response.data.products)
      } catch (error) {
        console.error('Error fetching featured products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeatured()
  }, [])

  if (loading) {
    return (
      <section className="section-spacing bg-wabi-50">
        <div className="container-zen">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-2 border-sumi-900 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-spacing bg-wabi-50">
      <div className="container-zen">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-sumi-900 mb-4">
            Featured Cards
          </h2>
          <p className="text-lg text-sumi-600 max-w-2xl mx-auto">
            Handpicked selections from our premium collection
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/products" className="btn-primary inline-block">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
