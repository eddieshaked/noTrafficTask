import { Router } from 'express'
import { delayMiddleware } from '../../middleware/delay.middleware'
import { validateSession } from '../../middleware/session.middleware'
import { logger } from '../logger'
import { polygonService } from './polygon.service'
import { validateCreatePolygon, validatePolygonId } from './polygon.validation'

export const polygonRouter = Router()

// Apply session validation and delay middleware to all polygon routes
polygonRouter.use(validateSession)
polygonRouter.use(delayMiddleware)

// POST /api/polygon - Create a new polygon
polygonRouter.post('/polygon', validateCreatePolygon, async (req, res) => {
  try {
    const { name, points } = req.body
    const userId = req.cookies.sessionId // Get userId from session cookie
    const polygon = await polygonService.createPolygon({ name, points, userId })
    res.status(201).json(polygon)
  } catch (error) {
    logger.error('Error creating polygon:', error)
    res.status(500).json({ error: 'Failed to create polygon' })
  }
})

// GET /api/polygons - Get all polygons for the current user
polygonRouter.get('/polygons', async (req, res) => {
  try {
    const userId = req.cookies.sessionId // Get userId from session cookie
    const polygons = await polygonService.getAllPolygons(userId)
    res.json(polygons)
  } catch (error) {
    logger.error('Error fetching polygons:', error)
    res.status(500).json({ error: 'Failed to fetch polygons' })
  }
})

// GET /api/polygons/:id - Get a polygon by id
polygonRouter.get('/polygons/:id', validatePolygonId, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    const userId = req.cookies.sessionId // Get userId from session cookie
    const polygon = await polygonService.getPolygonById(id, userId)

    if (!polygon) {
      return res.status(404).json({ error: 'Polygon not found' })
    }

    res.json(polygon)
  } catch (error) {
    logger.error('Error fetching polygon:', error)
    res.status(500).json({ error: 'Failed to fetch polygon' })
  }
})

// DELETE /api/polygons/:id - Delete a polygon by id (only if owned by user)
polygonRouter.delete('/polygons/:id', validatePolygonId, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    const userId = req.cookies.sessionId // Get userId from session cookie
    const deleted = await polygonService.deletePolygon(id, userId)

    if (!deleted) {
      return res.status(404).json({ error: 'Polygon not found' })
    }

    res.status(204).send()
  } catch (error) {
    logger.error('Error deleting polygon:', error)
    res.status(500).json({ error: 'Failed to delete polygon' })
  }
})

