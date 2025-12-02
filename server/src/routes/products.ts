import { Router, Request, Response } from 'express'
import { query } from '../db/pool'

const router = Router()

// @route   GET /api/products
// @desc    Get all products with inventory
// @access  Public
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 12
    const offset = (page - 1) * limit

    // Build WHERE conditions
    const conditions: string[] = []
    const params: any[] = []
    let paramCount = 1

    // Game filter
    if (req.query.game) {
      conditions.push(`p.game = $${paramCount}`)
      params.push(req.query.game)
      paramCount++
    }

    // Rarity filter
    if (req.query.rarity) {
      conditions.push(`p.rarity = $${paramCount}`)
      params.push(req.query.rarity)
      paramCount++
    }

    // Search by name
    if (req.query.search) {
      conditions.push(`p.name ILIKE $${paramCount}`)
      params.push(`%${req.query.search}%`)
      paramCount++
    }

    // Price range filter
    if (req.query.minPrice) {
      conditions.push(`i.price >= $${paramCount}`)
      params.push(parseInt(req.query.minPrice as string))
      paramCount++
    }
    if (req.query.maxPrice) {
      conditions.push(`i.price <= $${paramCount}`)
      params.push(parseInt(req.query.maxPrice as string))
      paramCount++
    }

    // Condition filter
    if (req.query.condition) {
      conditions.push(`i.condition = $${paramCount}`)
      params.push(req.query.condition)
      paramCount++
    }

    // In stock filter
    if (req.query.inStock === 'true') {
      conditions.push(`i.stock_quantity > 0`)
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

    // Sort
    let orderBy = 'p.product_id DESC'
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'price-asc':
          orderBy = 'i.price ASC'
          break
        case 'price-desc':
          orderBy = 'i.price DESC'
          break
        case 'name-asc':
          orderBy = 'p.name ASC'
          break
        case 'name-desc':
          orderBy = 'p.name DESC'
          break
      }
    }

    // Get products with inventory
    const productsQuery = `
      SELECT DISTINCT ON (p.product_id)
        p.product_id,
        p.api_card_id,
        p.name,
        p.image_url,
        p.set_name,
        p.rarity,
        p.game,
        i.inventory_id,
        i.price,
        i.stock_quantity,
        i.condition
      FROM products p
      LEFT JOIN inventory i ON p.product_id = i.product_id
      ${whereClause}
      ORDER BY p.product_id, i.price ASC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `

    params.push(limit, offset)

    const productsResult = await query(productsQuery, params)

    // Count total
    const countQuery = `
      SELECT COUNT(DISTINCT p.product_id) as total
      FROM products p
      LEFT JOIN inventory i ON p.product_id = i.product_id
      ${whereClause}
    `
    const countResult = await query(countQuery, params.slice(0, -2))
    const total = parseInt(countResult.rows[0].total)

    res.json({
      products: productsResult.rows,
      page,
      pages: Math.ceil(total / limit),
      total,
    })
  } catch (error: any) {
    console.error('Error fetching products:', error)
    res.status(500).json({ message: error.message })
  }
})

// @route   GET /api/products/:id
// @desc    Get product by ID with all inventory items
// @access  Public
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id)

    // Get product details
    const productQuery = `
      SELECT 
        p.product_id,
        p.api_card_id,
        p.name,
        p.image_url,
        p.set_name,
        p.rarity,
        p.game
      FROM products p
      WHERE p.product_id = $1
    `
    const productResult = await query(productQuery, [productId])

    if (productResult.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' })
    }

    // Get all inventory items for this product
    const inventoryQuery = `
      SELECT 
        inventory_id,
        price,
        stock_quantity,
        condition
      FROM inventory
      WHERE product_id = $1
      ORDER BY price ASC
    `
    const inventoryResult = await query(inventoryQuery, [productId])

    const product = {
      ...productResult.rows[0],
      inventory: inventoryResult.rows,
    }

    res.json(product)
  } catch (error: any) {
    console.error('Error fetching product:', error)
    res.status(500).json({ message: error.message })
  }
})

export default router
