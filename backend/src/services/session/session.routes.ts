import { Request, Response, Router } from 'express'
import { logger } from '../logger'
import { sessionService } from './session.service'

export const sessionRouter = Router()

// GET /api/session - Get or create sessionId
sessionRouter.get('/session', (req: Request, res: Response) => {
  try {
    logger.info(`Session route accessed: ${req.method} ${req.path}`)
    logger.info(`Cookies received:`, JSON.stringify(req.cookies, null, 2))
    logger.info(`Cookie header:`, req.headers.cookie)
    
    // Check if sessionId already exists in cookies
    const existingSessionId = req.cookies?.sessionId

    if (existingSessionId) {
      logger.info(`Existing session ID found: ${existingSessionId}`)
      return res.json({ 
        sessionId: existingSessionId,
        message: 'Using existing session' 
      })
    }

    logger.info(`No existing session ID found, creating new one`)

    // Generate new sessionId if it doesn't exist
    const newSessionId = sessionService.generateSessionId()
    
    // Set cookie with sessionId
    // httpOnly: true for security (prevents client-side JS access)
    // Note: Since we're using Vite proxy, requests appear same-origin to the browser
    // So we can use sameSite: 'lax' instead of 'none'
    // For production with actual cross-origin, use sameSite: 'none' with secure: true
    res.cookie('sessionId', newSessionId, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: 'lax', // Works with Vite proxy (browser sees it as same-origin)
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: '/', // Make cookie available for all paths
    })

    logger.info(`Created new session ID: ${newSessionId}`)
    
    res.json({ 
      sessionId: newSessionId,
      message: 'New session created' 
    })
  } catch (error) {
    logger.error('Error handling session:', error)
    res.status(500).json({ error: 'Failed to handle session' })
  }
})

