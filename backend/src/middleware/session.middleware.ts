import { NextFunction, Request, Response } from 'express'
import { logger } from '../services/logger'

export const validateSession = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const sessionId = req.cookies?.sessionId

  if (!sessionId) {
    logger.warn('Session validation failed: No sessionId found in cookies')
    res.status(401).json({ 
      error: 'Unauthorized: Session ID required. Please call /api/session first.' 
    })
    return
  }

  logger.info(`Session validated for sessionId: ${sessionId}`)
  next()
}

