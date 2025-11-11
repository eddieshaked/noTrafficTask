import { Router } from 'express'
import { logger } from '../logger'

export const rootRouter = Router()

// Root API endpoint - accessible at /api or /api/
rootRouter.get('/', (req, res) => {
  logger.info('Root API endpoint accessed')
  res.json({ message: 'Hello from NoTraffic backend!' })
})

