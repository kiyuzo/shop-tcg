import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-sumi-900 text-wabi-100 mt-auto">
      <div className="container-zen">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-wabi-50 flex items-center justify-center">
                <span className="text-sumi-900 font-display text-xl">侘</span>
              </div>
              <span className="text-xl font-display font-semibold text-wabi-50">
                KON
              </span>
            </div>
            <p className="text-wabi-300 text-sm leading-relaxed">
              Discover rare trading cards with Japanese minimalist elegance. Quality and authenticity in every card.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-display font-semibold text-wabi-50 mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-wabi-300 hover:text-wabi-50 transition-colors text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-wabi-300 hover:text-wabi-50 transition-colors text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-wabi-300 hover:text-wabi-50 transition-colors text-sm">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-wabi-300 hover:text-wabi-50 transition-colors text-sm">
                  Special Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-display font-semibold text-wabi-50 mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-wabi-300 hover:text-wabi-50 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-wabi-300 hover:text-wabi-50 transition-colors text-sm">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-wabi-300 hover:text-wabi-50 transition-colors text-sm">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-wabi-300 hover:text-wabi-50 transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-display font-semibold text-wabi-50 mb-4">Account</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/account" className="text-wabi-300 hover:text-wabi-50 transition-colors text-sm">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-wabi-300 hover:text-wabi-50 transition-colors text-sm">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-wabi-300 hover:text-wabi-50 transition-colors text-sm">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/settings" className="text-wabi-300 hover:text-wabi-50 transition-colors text-sm">
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-sumi-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-wabi-400 text-sm">
              © {currentYear} Wabi Market. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-wabi-400 hover:text-wabi-50 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-wabi-400 hover:text-wabi-50 transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
