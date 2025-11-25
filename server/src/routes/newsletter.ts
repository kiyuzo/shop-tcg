import { Router } from 'express'
const router = Router()

router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body
    // Add newsletter subscription logic here
    res.json({ message: 'Successfully subscribed!' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

export default router
