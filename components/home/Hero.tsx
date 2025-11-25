import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-wabi-100 to-wabi-50 section-spacing">
      <div className="container-zen">
        <div className="max-w-4xl mx-auto text-center">
          {/* Japanese character accent */}
          <div className="mb-8 flex justify-center">
            <span className="text-8xl font-display text-sumi-200 opacity-50">侘寂</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold text-sumi-900 mb-6 animate-fade-in">
            kon
            <span className="block mt-2 text-sakura-600">Trading Cards</span>
          </h1>
          
          <p className="text-xl text-sumi-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Curated collection of rare and authentic trading cards. 
            Experience Japanese minimalist elegance in every purchase.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/products" className="btn-primary px-8 py-4 text-lg">
              Explore Collection
            </Link>
            <Link href="/about" className="btn-secondary px-8 py-4 text-lg">
              Learn More
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border-t-2 border-l-2 border-sumi-300 opacity-30 hidden lg:block"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 border-b-2 border-r-2 border-sumi-300 opacity-30 hidden lg:block"></div>
      </div>
    </section>
  )
}
