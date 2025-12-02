/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'res.cloudinary.com', 'images.unsplash.com', 'images.pokemontcg.io', 'storage.googleapis.com', 'asia.pokemon-card.com', 'static.wikia.nocookie.net', 'images.ygoprodeck.com'],
  },
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  },
}

module.exports = nextConfig
