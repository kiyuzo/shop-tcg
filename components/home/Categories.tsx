import Link from 'next/link'

const categories = [
  {
    name: 'Pokémon',
    slug: 'pokemon',
    image: '🎴',
    description: 'Classic and modern cards',
  },
  {
    name: 'Yu-Gi-Oh!',
    slug: 'yugioh',
    image: '⚔️',
    description: 'Duel monsters collection',
  },
  {
    name: 'Magic: The Gathering',
    slug: 'mtg',
    image: '🔮',
    description: 'Legendary planeswalker cards',
  },
  {
    name: 'One Piece',
    slug: 'onepiece',
    image: '🏴‍☠️',
    description: 'Pirate adventure cards',
  },
]

export default function Categories() {
  return (
    <section className="section-spacing bg-white">
      <div className="container-zen">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-sumi-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-sumi-600 max-w-2xl mx-auto">
            Explore our carefully curated collections across different TCG universes
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className="card p-8 text-center group transition-transform hover:-translate-y-1"
            >
              <div className="text-6xl mb-4">{category.image}</div>
              <h3 className="text-xl font-display font-semibold text-sumi-900 mb-2 group-hover:text-sakura-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-sumi-600">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
