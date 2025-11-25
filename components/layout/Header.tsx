'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCartIcon, UserIcon, HeartIcon, Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import SearchBar from './SearchBar'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { items } = useCartStore()
  const { user, isAuthenticated } = useAuthStore()
  
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-sumi-200 shadow-wabi">
      <div className="container-zen">
        {/* Top bar */}
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-sumi-900 flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-wabi-50 font-display text-xl">侘</span>
            </div>
            <span className="text-2xl font-display font-semibold text-sumi-900 hidden sm:block">
              KON
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-sumi-700 hover:text-sumi-900 transition-colors font-medium">
              Products
            </Link>
            <Link href="/categories" className="text-sumi-700 hover:text-sumi-900 transition-colors font-medium">
              Categories
            </Link>
            <Link href="/about" className="text-sumi-700 hover:text-sumi-900 transition-colors font-medium">
              About
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-sumi-700 hover:text-sumi-900 transition-colors"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="w-6 h-6" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="p-2 text-sumi-700 hover:text-sumi-900 transition-colors hidden sm:block"
              aria-label="Wishlist"
            >
              <HeartIcon className="w-6 h-6" />
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-sumi-700 hover:text-sumi-900 transition-colors">
              <ShoppingCartIcon className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-sakura-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* User */}
            {isAuthenticated ? (
              <Link href="/account" className="p-2 text-sumi-700 hover:text-sumi-900 transition-colors">
                <UserIcon className="w-6 h-6" />
              </Link>
            ) : (
              <Link href="/login" className="btn-ghost text-sm hidden sm:block">
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-sumi-700 hover:text-sumi-900 transition-colors md:hidden"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-sumi-200 animate-slide-down">
            <SearchBar />
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-sumi-200 animate-slide-down bg-white">
          <nav className="container-zen py-6 space-y-4">
            <Link
              href="/products"
              className="block py-2 text-sumi-700 hover:text-sumi-900 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="block py-2 text-sumi-700 hover:text-sumi-900 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/wishlist"
              className="block py-2 text-sumi-700 hover:text-sumi-900 transition-colors font-medium sm:hidden"
              onClick={() => setIsMenuOpen(false)}
            >
              Wishlist
            </Link>
            <Link
              href="/about"
              className="block py-2 text-sumi-700 hover:text-sumi-900 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {!isAuthenticated && (
              <Link
                href="/login"
                className="block py-2 text-sumi-700 hover:text-sumi-900 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
