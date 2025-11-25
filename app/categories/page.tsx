import Link from 'next/link'
import Image from 'next/image'

const categories = [
  {
    name: 'Pokémon',
    slug: 'pokemon',
    image: '/pokemon-logo.png',
    description: 'Classic and modern cards from the beloved franchise',
    count: '500+ cards',
  },
  {
    name: 'Yu-Gi-Oh!',
    slug: 'yugioh',
    image: '/Yu-Gi-Oh!-logo.jpg',
    description: 'Duel monsters collection with rare finds',
    count: '400+ cards',
  },
  {
    name: 'Magic: The Gathering',
    slug: 'mtg',
    image: '/Magic-The-Gathering-logo.png',
    description: 'Legendary planeswalker cards and artifacts',
    count: '600+ cards',
  },
  {
    name: 'One Piece',
    slug: 'onepiece',
    image: '/One-Piece-Logo.png',
    description: 'Pirate adventure cards from the Grand Line',
    count: '300+ cards',
  },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-wabi-50">
      {/* Hero Section */}
      <section className="bg-white section-spacing">
        <div className="container-zen">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-sumi-900 mb-6">
              Browse by Category
            </h1>
            <p className="text-xl text-sumi-600">
              Explore our carefully curated collections across different TCG universes.
              Each category features authentic, graded cards from trusted sources.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section-spacing">
        <div className="container-zen">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                className="card overflow-hidden group hover:shadow-xl transition-shadow"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
                  {/* Logo */}
                  <div className="flex items-center justify-center bg-wabi-100 p-8">
                    <Image 
                      src={category.image} 
                      alt={`${category.name} logo`} 
                      width={200} 
                      height={150}
                      className="object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-col justify-center">
                    <h2 className="text-3xl font-display font-bold text-sumi-900 mb-3 group-hover:text-sakura-600 transition-colors">
                      {category.name}
                    </h2>
                    <p className="text-sumi-600 mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="inline-block px-4 py-2 bg-sakura-100 text-sakura-700 text-sm font-medium">
                        {category.count}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-sumi-900 text-wabi-50">
        <div className="container-zen text-center">
          <h2 className="text-4xl font-display font-bold mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-lg text-wabi-300 mb-8 max-w-2xl mx-auto">
            Browse all products or use our advanced search to find specific cards.
          </p>
          <Link href="/products" className="btn-primary bg-wabi-50 text-sumi-900 hover:bg-wabi-100 inline-block">
            View All Products
          </Link>
        </div>
      </section>
    </div>
  )
}
