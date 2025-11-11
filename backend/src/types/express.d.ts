import { Request } from 'express'

// Extend Express Request type to include cookies from cookie-parser
declare module 'express-serve-static-core' {
  interface Request {
    cookies: {
      sessionId?: string
      [key: string]: string | undefined
    }
  }
}

