import { Router, Request, Response } from 'express'
import { query, getClient } from '../db/pool'
import { protect, AuthRequest } from '../middleware/auth'

const router = Router()

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', protect, async (req: AuthRequest, res: Response) => {
  const client = await getClient()
  
  try {
    const {
      orderItems,
      shippingAddress,
      totalPrice,
    } = req.body

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' })
    }

    if (!req.user?.user_id) {
      return res.status(401).json({ message: 'User not authenticated' })
    }

    // Format shipping address
    const shippingAddressText = `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}, ${shippingAddress.country}`

    // Begin transaction
    await client.query('BEGIN')

    // Create order
    const orderQuery = `
      INSERT INTO orders (user_id, total_price, status, shipping_address)
      VALUES ($1, $2, $3, $4)
      RETURNING order_id, user_id, total_price, status, shipping_address, created_at
    `
    const orderResult = await client.query(orderQuery, [
      req.user.user_id,
      totalPrice,
      'Pending',
      shippingAddressText,
    ])

    const orderId = orderResult.rows[0].order_id

    // Insert order items and update inventory
    for (const item of orderItems) {
      // Get product info for this item
      const productQuery = `
        SELECT p.name, i.inventory_id, i.price, i.stock_quantity
        FROM products p
        JOIN inventory i ON p.product_id = i.product_id
        WHERE p.product_id = $1
        ORDER BY i.price ASC
        LIMIT 1
      `
      const productResult = await client.query(productQuery, [parseInt(item.product)])
      
      if (productResult.rows.length === 0) {
        throw new Error(`Product ${item.product} not found`)
      }

      const product = productResult.rows[0]
      const inventoryId = product.inventory_id

      // Check stock
      if (product.stock_quantity < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`)
      }

      // Insert order item
      const orderItemQuery = `
        INSERT INTO order_items (order_id, inventory_id, product_name, quantity, price_at_purchase)
        VALUES ($1, $2, $3, $4, $5)
      `
      await client.query(orderItemQuery, [
        orderId,
        inventoryId,
        product.name,
        item.quantity,
        product.price,
      ])

      // Update inventory stock
      const updateStockQuery = `
        UPDATE inventory
        SET stock_quantity = stock_quantity - $1
        WHERE inventory_id = $2
      `
      await client.query(updateStockQuery, [item.quantity, inventoryId])
    }

    // Commit transaction
    await client.query('COMMIT')

    // Fetch complete order with items
    const completeOrderQuery = `
      SELECT 
        o.order_id,
        o.user_id,
        o.total_price,
        o.status,
        o.shipping_address,
        o.created_at,
        json_agg(
          json_build_object(
            'order_item_id', oi.order_item_id,
            'product_name', oi.product_name,
            'quantity', oi.quantity,
            'price_at_purchase', oi.price_at_purchase
          )
        ) as order_items
      FROM orders o
      LEFT JOIN order_items oi ON o.order_id = oi.order_id
      WHERE o.order_id = $1
      GROUP BY o.order_id
    `
    const completeOrder = await query(completeOrderQuery, [orderId])

    res.status(201).json(completeOrder.rows[0])
  } catch (error: any) {
    await client.query('ROLLBACK')
    console.error('Error creating order:', error)
    res.status(500).json({ message: error.message })
  } finally {
    client.release()
  }
})

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', protect, async (req: AuthRequest, res: Response) => {
  try {
    const orderId = parseInt(req.params.id)

    const orderQuery = `
      SELECT 
        o.order_id,
        o.user_id,
        o.total_price,
        o.status,
        o.shipping_address,
        o.created_at,
        u.username,
        u.email,
        json_agg(
          json_build_object(
            'order_item_id', oi.order_item_id,
            'product_name', oi.product_name,
            'quantity', oi.quantity,
            'price_at_purchase', oi.price_at_purchase
          )
        ) as order_items
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.user_id
      LEFT JOIN order_items oi ON o.order_id = oi.order_id
      WHERE o.order_id = $1
      GROUP BY o.order_id, u.username, u.email
    `
    const result = await query(orderQuery, [orderId])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' })
    }

    const order = result.rows[0]

    // Check if order belongs to user or user is admin
    if (
      order.user_id !== req.user?.user_id &&
      req.user?.role !== 'Admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to view this order' })
    }

    res.json(order)
  } catch (error: any) {
    console.error('Error fetching order:', error)
    res.status(500).json({ message: error.message })
  }
})

// @route   GET /api/orders/user/my-orders
// @desc    Get logged in user orders
// @access  Private
router.get('/user/my-orders', protect, async (req: AuthRequest, res: Response) => {
  try {
    const ordersQuery = `
      SELECT 
        o.order_id,
        o.user_id,
        o.total_price,
        o.status,
        o.shipping_address,
        o.created_at,
        json_agg(
          json_build_object(
            'order_item_id', oi.order_item_id,
            'product_name', oi.product_name,
            'quantity', oi.quantity,
            'price_at_purchase', oi.price_at_purchase
          )
        ) as order_items
      FROM orders o
      LEFT JOIN order_items oi ON o.order_id = oi.order_id
      WHERE o.user_id = $1
      GROUP BY o.order_id
      ORDER BY o.created_at DESC
    `
    const result = await query(ordersQuery, [req.user?.user_id])

    res.json(result.rows)
  } catch (error: any) {
    console.error('Error fetching user orders:', error)
    res.status(500).json({ message: error.message })
  }
})

// @route   PUT /api/orders/:id/status
// @desc    Update order status (Admin only)
// @access  Private/Admin
router.put('/:id/status', protect, async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'Admin') {
      return res.status(403).json({ message: 'Not authorized' })
    }

    const orderId = parseInt(req.params.id)
    const { status } = req.body

    const validStatuses = ['Pending', 'Shipped', 'Cancelled']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' })
    }

    const updateQuery = `
      UPDATE orders
      SET status = $1
      WHERE order_id = $2
      RETURNING order_id, user_id, total_price, status, shipping_address, created_at
    `
    const result = await query(updateQuery, [status, orderId])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.json(result.rows[0])
  } catch (error: any) {
    console.error('Error updating order status:', error)
    res.status(500).json({ message: error.message })
  }
})

export default router
