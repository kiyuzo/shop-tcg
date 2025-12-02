'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'

interface Product {
  product_id: number
  name: string
  image_url: string
  set_name?: string
  rarity?: string
  game?: string
  inventory_id?: number
  price?: number
  stock_quantity?: number
  condition?: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const { addItem: addToCart } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  
  const productId = product.product_id.toString()
  const inWishlist = isInWishlist(productId)
  const inStock = (product.stock_quantity || 0) > 0
  const price = product.price || 0
  const imageUrl = product.image_url || '/placeholder-card.jpg'
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    
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
        name: product.name,
        price: price,
        image: imageUrl,
      })
      toast.success('Added to wishlist')
    }
  }
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      toast.error('Please login to add items to your cart')
      router.push('/login')
      return
    }
    
    if (!product.inventory_id) {
      toast.error('This product is not available')
      return
    }
    
    if (!inStock) {
      toast.error('This product is out of stock')
      return
    }
    
    addToCart({
      productId: productId,
      name: product.name,
      price: price,
      image: imageUrl,
      quantity: 1,
      condition: product.condition || 'Near Mint',
      stockQuantity: product.stock_quantity,
    })
    
    toast.success('Added to cart')
  }

  return (
    <Link href={`/products/${product.product_id}`} className="group">
      <div className="card overflow-hidden">
        {/* Image */}
        <div className="relative aspect-[3/4] bg-wabi-100 overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Wishlist button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm hover:bg-white transition-all z-10"
            aria-label="Add to wishlist"
          >
            {inWishlist ? (
              <HeartIconSolid className="w-5 h-5 text-sakura-500" />
            ) : (
              <HeartIcon className="w-5 h-5 text-sumi-700" />
            )}
          </button>
          
          {/* Rarity badge */}
          {product.rarity && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-sumi-900/80 backdrop-blur-sm text-wabi-50 text-xs font-medium">
              {product.rarity}
            </div>
          )}
          
          {/* Stock status */}
          {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-medium text-lg">Out of Stock</span>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-sumi-500 uppercase tracking-wide mb-2">
            {product.game || 'TCG'} {product.set_name && `• ${product.set_name}`}
          </p>
          <h3 className="font-display font-semibold text-sumi-900 mb-2 line-clamp-2 group-hover:text-sakura-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-lg font-bold text-sumi-900">
              Rp {price.toLocaleString('id-ID')}
            </span>
            
            {inStock && (
              <button
                onClick={handleAddToCart}
                className="p-2 bg-sumi-900 text-wabi-50 hover:bg-sumi-800 transition-colors"
                aria-label="Add to cart"
              >
                <ShoppingCartIcon className="w-5 h-5" />
              </button>
            )}
          </div>
          
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs px-2 py-1 bg-wabi-100 text-sumi-700">
              {product.condition || 'Near Mint'}
            </span>
            {inStock && (
              <span className="text-xs text-sumi-500">
                Stock: {product.stock_quantity}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
