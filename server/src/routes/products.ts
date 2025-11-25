import { Router, Request, Response } from 'express'
import Product from '../models/Product'
import Review from '../models/Review'

const router = Router()

// @route   GET /api/products
// @desc    Get all products with filters
// @access  Public
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 12
    const skip = (page - 1) * limit

    // Build query
    const query: any = {}

    // Category filter
    if (req.query.category) {
      query.category = req.query.category
    }

    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {}
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice)
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice)
    }

    // Condition filter
    if (req.query.condition) {
      query.condition = req.query.condition
    }

    // Search
    if (req.query.search) {
      query.$text = { $search: req.query.search as string }
    }

    // Featured
    if (req.query.featured === 'true') {
      query.featured = true
    }

    // In stock filter
    if (req.query.inStock === 'true') {
      query.inStock = true
    }

    // Sort
    let sort: any = { createdAt: -1 }
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'price-asc':
          sort = { price: 1 }
          break
        case 'price-desc':
          sort = { price: -1 }
          break
        case 'name-asc':
          sort = { name: 1 }
          break
        case 'name-desc':
          sort = { name: -1 }
          break
        case 'rating':
          sort = { averageRating: -1 }
          break
      }
    }

    const products = await Product.find(query)
      .sort(sort)
      .limit(limit)
      .skip(skip)

    const total = await Product.countDocuments(query)

    res.json({
      products,
      page,
      pages: Math.ceil(total / limit),
      total,
    })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// @route   GET /api/products/:id/reviews
// @desc    Get product reviews
// @access  Public
router.get('/:id/reviews', async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ product: req.params.id })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 })

    res.json(reviews)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

export default router
