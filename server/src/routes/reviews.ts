import { Router, Response } from 'express'
import { protect, AuthRequest } from '../middleware/auth'
import Review from '../models/Review'
import Product from '../models/Product'

const router = Router()

// @route   POST /api/reviews
// @desc    Create a review
// @access  Private
router.post('/', protect, async (req: AuthRequest, res: Response) => {
  try {
    const { product, rating, title, comment } = req.body

    const existingReview = await Review.findOne({
      user: req.user?._id,
      product,
    })

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' })
    }

    const review = await Review.create({
      user: req.user?._id,
      product,
      rating,
      title,
      comment,
    })

    // Update product rating
    const reviews = await Review.find({ product })
    const productDoc = await Product.findById(product)
    
    if (productDoc) {
      productDoc.numReviews = reviews.length
      productDoc.averageRating =
        reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length
      await productDoc.save()
    }

    res.status(201).json(review)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

export default router
