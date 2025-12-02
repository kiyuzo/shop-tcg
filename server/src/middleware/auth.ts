import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { findUserById } from '../db/queries'

export interface IUser {
  user_id: number
  username: string
  email: string
  role: string
  created_at: Date
}

export interface AuthRequest extends Request {
  user?: IUser
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret')

      // Get user from token (decoded.id is user_id)
      const user = await findUserById(decoded.id)

      if (!user) {
        return res.status(401).json({ message: 'User not found' })
      }

      req.user = user
      next()
    } catch (error) {
      console.error(error)
      return res.status(401).json({ message: 'Not authorized, token failed' })
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' })
  }
}

export const admin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'Admin') {
    next()
  } else {
    res.status(403).json({ message: 'Not authorized as admin' })
  }
}
