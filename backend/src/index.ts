import cookieParser from 'cookie-parser'
import express from 'express'
import { logger } from './services/logger'
import { polygonRouter } from './services/polygon/polygon.routes'
import { rootRouter } from './services/root/root.routes'
import { sessionRouter } from './services/session/session.routes'

const app = express()
// Backend runs on port 3001 (frontend runs on port 3000)
const PORT = parseInt(process.env.PORT || '3001', 10)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// CORS middleware - allow requests from frontend with credentials (cookies)
const FRONTEND_PORT = parseInt(process.env.FRONTEND_PORT || '3000', 10)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `http://localhost:${FRONTEND_PORT}`)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Credentials', 'true') // Allow cookies
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

// Routes - all routes are under /api prefix
// Register session router first to avoid any route conflicts
app.use('/api', sessionRouter)
app.use('/api', rootRouter)
app.use('/api', polygonRouter) // delayMiddleware is applied only to polygon routes

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

