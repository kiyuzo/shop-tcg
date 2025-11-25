/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'res.cloudinary.com', 'images.unsplash.com'],
  },
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  },
}

module.exports = nextConfig
