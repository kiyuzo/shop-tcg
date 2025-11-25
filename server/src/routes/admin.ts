import { Router } from 'express'
import { protect, admin, AuthRequest } from '../middleware/auth'

const router = Router()

// Apply protection and admin middleware to all admin routes
router.use(protect as any)
router.use(admin as any)

router.get('/dashboard', (req, res) => {
  res.json({ message: 'Admin dashboard' })
})

export default router
