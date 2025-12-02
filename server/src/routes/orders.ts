import { Router, Request, Response } from 'express'
import Order from '../models/Order'
import Product from '../models/Product'
import { protect, AuthRequest } from '../middleware/auth'
import Stripe from 'stripe'

const router = Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16' as any,
})

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', protect, async (req: AuthRequest, res: Response) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' })
    }

    const order = new Order({
      user: req.user?.user_id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    // Update product stock
    for (const item of orderItems) {
      const product = await Product.findById(item.product)
      if (product) {
        product.stockQuantity -= item.quantity
        if (product.stockQuantity <= 0) {
          product.inStock = false
        }
        await product.save()
      }
    }

    res.status(201).json(createdOrder)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', protect, async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
      // Check if order belongs to user or user is admin
      if (
        order.user._id.toString() === req.user?.user_id.toString() ||
        req.user?.role === 'Admin'
      ) {
        res.json(order)
      } else {
        res.status(403).json({ message: 'Not authorized to view this order' })
      }
    } else {
      res.status(404).json({ message: 'Order not found' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// @route   GET /api/orders/user/my-orders
// @desc    Get logged in user orders
// @access  Private
router.get('/user/my-orders', protect, async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user?.user_id }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// @route   POST /api/orders/:id/pay
// @desc    Process payment with Stripe
// @access  Private
router.post('/:id/pay', protect, async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalPrice * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        orderId: order._id.toString(),
      },
    })

    res.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// @route   PUT /api/orders/:id/confirm-payment
// @desc    Update order to paid
// @access  Private
router.put('/:id/confirm-payment', protect, async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findById(req.params.id)

    if (order) {
      order.isPaid = true
      order.paidAt = new Date()
      order.status = 'processing'
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      }

      const updatedOrder = await order.save()
      res.json(updatedOrder)
    } else {
      res.status(404).json({ message: 'Order not found' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

export default router
