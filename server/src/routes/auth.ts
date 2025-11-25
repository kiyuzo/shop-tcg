import { Router, Request, Response } from 'express'
import jwt, { SignOptions } from 'jsonwebtoken'
import User from '../models/User'
import { protect, AuthRequest } from '../middleware/auth'

const router = Router()

// Generate JWT Token
const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET as string
  const expiresIn = process.env.JWT_EXPIRE as string
  return jwt.sign({ id }, secret, { expiresIn } as SignOptions)
}

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id.toString()),
      })
    } else {
      res.status(400).json({ message: 'Invalid user data' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Find user by email
    const user = await User.findOne({ email }).select('+password')

    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id.toString()),
      })
    } else {
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?._id)
    
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        address: user.address,
        phone: user.phone,
      })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

export default router
