'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const categories = ['pokemon', 'yugioh', 'mtg', 'onepiece']
const conditions = ['Mint', 'Near Mint', 'Lightly Played', 'Moderately Played']

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    condition: searchParams.get('condition') || '',
    inStock: searchParams.get('inStock') === 'true',
  })

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    applyFilters(newFilters)
  }

  const applyFilters = (newFilters: typeof filters) => {
    const params = new URLSearchParams()
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString())
      }
    })

    router.push(`/products?${params.toString()}`)
  }

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      condition: '',
      inStock: false,
    })
    router.push('/products')
  }

  return (
    <div className="card p-6 sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-display font-semibold text-lg text-sumi-900">Filters</h3>
        <button onClick={clearFilters} className="text-sm text-sakura-600 hover:text-sakura-700">
          Clear All
        </button>
      </div>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-sumi-700 mb-3">Category</label>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={filters.category === cat}
                onChange={() => handleFilterChange('category', cat)}
                className="mr-2"
              />
              <span className="text-sm text-sumi-700 capitalize">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="divider-zen"></div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-sumi-700 mb-3">Price Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            className="input-base text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            className="input-base text-sm"
          />
        </div>
      </div>

      <div className="divider-zen"></div>

      {/* Condition */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-sumi-700 mb-3">Condition</label>
        <select
          value={filters.condition}
          onChange={(e) => handleFilterChange('condition', e.target.value)}
          className="input-base text-sm"
        >
          <option value="">All Conditions</option>
          {conditions.map((cond) => (
            <option key={cond} value={cond}>
              {cond}
            </option>
          ))}
        </select>
      </div>

      <div className="divider-zen"></div>

      {/* In Stock */}
      <div>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => handleFilterChange('inStock', e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm text-sumi-700">In Stock Only</span>
        </label>
      </div>
    </div>
  )
}
