import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="bg-wabi-50">
      {/* Hero Section */}
      <section className="section-spacing bg-white">
        <div className="container-zen">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <Image 
                src="/fox-logo.png" 
                alt="kon logo" 
                width={96} 
                height={96}
                className="object-contain"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-sumi-900 mb-6">
              About kon
            </h1>
            <p className="text-xl text-sumi-600 leading-relaxed">
              Where the spirit of the fox meets the world of trading card collecting.
              We curate authentic, rare cards with care and dedication to quality.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-spacing">
        <div className="container-zen">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="text-4xl mb-4">🎴</div>
              <h3 className="font-display font-semibold text-xl text-sumi-900 mb-3">
                Authenticity
              </h3>
              <p className="text-sumi-600">
                Every card is carefully verified for authenticity. We partner only with trusted suppliers.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="text-4xl mb-4">🌸</div>
              <h3 className="font-display font-semibold text-xl text-sumi-900 mb-3">
                Quality
              </h3>
              <p className="text-sumi-600">
                Meticulous grading and condition assessment ensures you know exactly what you're getting.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="text-4xl mb-4">🍵</div>
              <h3 className="font-display font-semibold text-xl text-sumi-900 mb-3">
                Simplicity
              </h3>
              <p className="text-sumi-600">
                A clean, distraction-free shopping experience that lets the cards speak for themselves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-spacing bg-white">
        <div className="container-zen">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-sumi-900 mb-8 text-center">
              Our Story
            </h2>
            <div className="space-y-6 text-sumi-700 leading-relaxed">
              <p>
                kon was born from a love of trading cards and an appreciation for Japanese minimalist design.
                We believe that collecting should be a thoughtful, intentional practice—a journey of discovery and passion.
              </p>
              <p>
                Each trading card tells its own story through its condition, rarity, and journey to your collection.
                We honor that story by providing a platform that celebrates authenticity and quality.
              </p>
              <p>
                Our platform strips away the noise and complexity often found in e-commerce, creating a serene space where
                collectors can focus on what matters: finding that perfect card for their collection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-spacing">
        <div className="container-zen">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-sumi-900 mb-12 text-center">
              Our Values
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-sakura-500 pl-6 py-2">
                <h3 className="font-display font-semibold text-xl text-sumi-900 mb-2">
                  Transparency
                </h3>
                <p className="text-sumi-600">
                  Clear pricing, honest condition descriptions, and no hidden fees.
                </p>
              </div>
              <div className="border-l-4 border-matcha-500 pl-6 py-2">
                <h3 className="font-display font-semibold text-xl text-sumi-900 mb-2">
                  Community
                </h3>
                <p className="text-sumi-600">
                  Building a respectful, passionate community of collectors who share knowledge and appreciation.
                </p>
              </div>
              <div className="border-l-4 border-sumi-500 pl-6 py-2">
                <h3 className="font-display font-semibold text-xl text-sumi-900 mb-2">
                  Sustainability
                </h3>
                <p className="text-sumi-600">
                  Eco-friendly packaging and practices that honor both cards and our environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-sumi-900 text-wabi-50">
        <div className="container-zen text-center">
          <h2 className="text-4xl font-display font-bold mb-6">
            Start Your Collection
          </h2>
          <p className="text-lg text-wabi-300 mb-8 max-w-2xl mx-auto">
            Join thousands of collectors who trust kon for authentic, quality trading cards.
          </p>
          <a href="/products" className="btn-primary bg-wabi-50 text-sumi-900 hover:bg-wabi-100 inline-block">
            Browse Collection
          </a>
        </div>
      </section>
    </div>
  )
}
