import { Router, Request, Response } from 'express'
import jwt, { SignOptions } from 'jsonwebtoken'
import { 
  findUserByEmail, 
  findUserByEmailWithPassword, 
  findUserByUsername,
  createUser, 
  comparePassword 
} from '../db/queries'
import { protect, AuthRequest } from '../middleware/auth'

const router = Router()

// Generate JWT Token
const generateToken = (id: number): string => {
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

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }

    // Check if user exists
    const userExists = await findUserByEmail(email)

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Check if username exists
    const usernameExists = await findUserByUsername(name)
    
    if (usernameExists) {
      return res.status(400).json({ message: 'Username already taken' })
    }

    // Create user
    const user = await createUser(name, email, password)

    if (user) {
      res.status(201).json({
        _id: user.user_id,
        name: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user.user_id),
      })
    } else {
      res.status(400).json({ message: 'Invalid user data' })
    }
  } catch (error: any) {
    console.error('Register error:', error)
    res.status(500).json({ message: error.message })
  }
})

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' })
    }

    // Find user by email (with password)
    const user = await findUserByEmailWithPassword(email)

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Check password
    const isPasswordValid = await comparePassword(password, user.password_hash)

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Return user data without password
    res.json({
      _id: user.user_id,
      name: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user.user_id),
    })
  } catch (error: any) {
    console.error('Login error:', error)
    res.status(500).json({ message: error.message })
  }
})

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, async (req: AuthRequest, res: Response) => {
  try {
    if (req.user) {
      res.json({
        _id: req.user.user_id,
        name: req.user.username,
        email: req.user.email,
        role: req.user.role,
      })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error: any) {
    console.error('Get me error:', error)
    res.status(500).json({ message: error.message })
  }
})

export default router
