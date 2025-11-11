import { randomUUID } from 'crypto'
import { logger } from '../logger'

export class SessionService {
  generateSessionId(): string {
    const sessionId = randomUUID()
    logger.info(`Generated new session ID: ${sessionId}`)
    return sessionId
  }
}

export const sessionService = new SessionService()

