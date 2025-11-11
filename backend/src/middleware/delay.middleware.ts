import { Request, Response, NextFunction } from 'express'
import { sleep } from '../utils/sleep'
import { logger } from '../services/logger'

const DELAY_MS = 5000 // 5 seconds

export const delayMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  logger.info(`Adding ${DELAY_MS}ms delay for ${req.method} ${req.path}`)
  await sleep(DELAY_MS)
  next()
}

