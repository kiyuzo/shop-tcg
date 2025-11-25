export default function AboutPage() {
  return (
    <div className="bg-wabi-50">
      {/* Hero Section */}
      <section className="section-spacing bg-white">
        <div className="container-zen">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <span className="text-7xl font-display text-sumi-200">侘寂</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-sumi-900 mb-6">
              About Wabi Market
            </h1>
            <p className="text-xl text-sumi-600 leading-relaxed">
              Where the imperfect beauty of Wabi-Sabi meets the world of trading card collecting.
              We curate authentic, rare cards with the same care and philosophy as traditional Japanese artisans.
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
                Wabi Market was born from a love of trading cards and an appreciation for Japanese minimalist design.
                We believe that collecting should be a thoughtful, intentional practice—much like the tea ceremony or flower arrangement.
              </p>
              <p>
                The concept of Wabi-Sabi celebrates the beauty in imperfection and impermanence. Similarly, each trading card
                tells its own story through its condition, rarity, and journey to your collection.
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
            Join thousands of collectors who trust Wabi Market for authentic, quality trading cards.
          </p>
          <a href="/products" className="btn-primary bg-wabi-50 text-sumi-900 hover:bg-wabi-100 inline-block">
            Browse Collection
          </a>
        </div>
      </section>
    </div>
  )
}
