import Product from '../models/Product'
import User from '../models/User'
import Category from '../models/Category'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const sampleProducts = [
  {
    name: 'Charizard VMAX - Rainbow Rare',
    description: 'Stunning rainbow rare Charizard VMAX from Champion\'s Path. One of the most sought-after cards in modern Pokémon TCG.',
    price: 299.99,
    category: 'pokemon',
    images: ['https://images.unsplash.com/photo-1606706681916-12ab35989735?w=800'],
    condition: 'Mint',
    rarity: 'Secret Rare',
    cardSet: 'Champion\'s Path',
    cardNumber: '074/073',
    inStock: true,
    stockQuantity: 3,
    featured: true,
    tags: ['charizard', 'rainbow', 'vmax', 'secret rare'],
  },
  {
    name: 'Blue-Eyes White Dragon - LOB 1st Edition',
    description: 'Classic Blue-Eyes White Dragon from Legend of Blue Eyes White Dragon, 1st Edition. A cornerstone of any Yu-Gi-Oh! collection.',
    price: 450.00,
    category: 'yugioh',
    images: ['https://images.unsplash.com/photo-1606706681916-12ab35989735?w=800'],
    condition: 'Near Mint',
    rarity: 'Ultra Rare',
    cardSet: 'Legend of Blue Eyes White Dragon',
    cardNumber: 'LOB-001',
    inStock: true,
    stockQuantity: 1,
    featured: true,
    tags: ['blue-eyes', 'classic', 'ultra rare', '1st edition'],
  },
  {
    name: 'Black Lotus - Alpha',
    description: 'The most iconic Magic: The Gathering card ever printed. Alpha edition Black Lotus in excellent condition.',
    price: 15000.00,
    category: 'mtg',
    images: ['https://images.unsplash.com/photo-1606706681916-12ab35989735?w=800'],
    condition: 'Lightly Played',
    rarity: 'Rare',
    cardSet: 'Alpha',
    inStock: true,
    stockQuantity: 1,
    featured: true,
    tags: ['power nine', 'alpha', 'black lotus', 'vintage'],
  },
  {
    name: 'Monkey D. Luffy - Gear Fifth',
    description: 'Latest Luffy card featuring his incredible Gear Fifth transformation. From the newest One Piece Card Game set.',
    price: 89.99,
    category: 'onepiece',
    images: ['https://images.unsplash.com/photo-1606706681916-12ab35989735?w=800'],
    condition: 'Mint',
    rarity: 'Secret Rare',
    cardSet: 'Paramount War',
    cardNumber: 'OP05-119',
    inStock: true,
    stockQuantity: 8,
    featured: true,
    tags: ['luffy', 'gear fifth', 'secret rare', 'protagonist'],
  },
  // Add more sample products
  {
    name: 'Pikachu VMAX - Rainbow Rare',
    description: 'Adorable Pikachu VMAX in rainbow rare variant. Perfect for Pikachu collectors.',
    price: 125.00,
    category: 'pokemon',
    images: ['https://images.unsplash.com/photo-1606706681916-12ab35989735?w=800'],
    condition: 'Near Mint',
    rarity: 'Secret Rare',
    cardSet: 'Vivid Voltage',
    inStock: true,
    stockQuantity: 5,
    featured: false,
    tags: ['pikachu', 'rainbow', 'vmax'],
  },
  {
    name: 'Dark Magician Girl - MFC 1st Edition',
    description: 'Beloved Dark Magician Girl from Magician\'s Force, 1st Edition Ultra Rare.',
    price: 180.00,
    category: 'yugioh',
    images: ['https://images.unsplash.com/photo-1606706681916-12ab35989735?w=800'],
    condition: 'Near Mint',
    rarity: 'Ultra Rare',
    cardSet: 'Magician\'s Force',
    inStock: true,
    stockQuantity: 2,
    featured: false,
    tags: ['dark magician girl', 'ultra rare', 'classic'],
  },
]

const sampleCategories = [
  {
    name: 'Pokémon',
    slug: 'pokemon',
    description: 'Classic and modern Pokémon trading cards',
    image: '🎴',
    productCount: 0,
  },
  {
    name: 'Yu-Gi-Oh!',
    slug: 'yugioh',
    description: 'Duel monsters and spell cards',
    image: '⚔️',
    productCount: 0,
  },
  {
    name: 'Magic: The Gathering',
    slug: 'mtg',
    description: 'Legendary planeswalker cards',
    image: '🔮',
    productCount: 0,
  },
  {
    name: 'One Piece',
    slug: 'onepiece',
    description: 'Pirate adventure cards',
    image: '🏴‍☠️',
    productCount: 0,
  },
]

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tcg-ecommerce')
    console.log('✓ Connected to MongoDB')

    // Clear existing data
    await Product.deleteMany({})
    await Category.deleteMany({})
    console.log('✓ Cleared existing data')

    // Create categories
    await Category.insertMany(sampleCategories)
    console.log('✓ Created categories')

    // Create products
    await Product.insertMany(sampleProducts)
    console.log('✓ Created products')

    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@wabimarket.com' })
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@wabimarket.com',
        password: 'admin123',
        role: 'admin',
      })
      console.log('✓ Created admin user (email: admin@wabimarket.com, password: admin123)')
    }

    console.log('\n✅ Database seeded successfully!')
    console.log('You can now login with:')
    console.log('  Email: admin@wabimarket.com')
    console.log('  Password: admin123')
    
    process.exit(0)
  } catch (error) {
    console.error('✗ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
