import mongoose, { Document, Schema } from 'mongoose'

export interface IProduct extends Document {
  name: string
  description: string
  price: number
  category: string
  subcategory?: string
  images: string[]
  condition: 'Mint' | 'Near Mint' | 'Lightly Played' | 'Moderately Played' | 'Heavily Played' | 'Damaged'
  rarity?: string
  cardSet?: string
  cardNumber?: string
  artist?: string
  inStock: boolean
  stockQuantity: number
  featured: boolean
  tags: string[]
  specifications: {
    key: string
    value: string
  }[]
  averageRating: number
  numReviews: number
  createdAt: Date
  updatedAt: Date
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: 0,
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: ['pokemon', 'yugioh', 'mtg', 'onepiece', 'other'],
    },
    subcategory: String,
    images: {
      type: [String],
      required: [true, 'Please provide at least one image'],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'At least one image is required',
      },
    },
    condition: {
      type: String,
      required: true,
      enum: ['Mint', 'Near Mint', 'Lightly Played', 'Moderately Played', 'Heavily Played', 'Damaged'],
      default: 'Near Mint',
    },
    rarity: String,
    cardSet: String,
    cardNumber: String,
    artist: String,
    inStock: {
      type: Boolean,
      default: true,
    },
    stockQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    specifications: [
      {
        key: String,
        value: String,
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

// Indexes for better query performance
productSchema.index({ name: 'text', description: 'text', tags: 'text' })
productSchema.index({ category: 1, price: 1 })
productSchema.index({ featured: 1 })

export default mongoose.model<IProduct>('Product', productSchema)
