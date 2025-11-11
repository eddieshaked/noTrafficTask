import { Request, Response, NextFunction } from 'express'
import { CreatePolygonDto } from '../../types/polygon'

export const validateCreatePolygon = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, points }: CreatePolygonDto = req.body

  // Validate name
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    res.status(400).json({ error: 'Name is required and must be a non-empty string' })
    return
  }

  // Validate points array
  if (!Array.isArray(points) || points.length === 0) {
    res.status(400).json({ error: 'Points must be a non-empty array' })
    return
  }

  // Validate minimum points for a polygon (at least 3 points)
  if (points.length < 3) {
    res.status(400).json({ error: 'A polygon must have at least 3 points' })
    return
  }

  // Validate each point format: [number, number]
  for (let i = 0; i < points.length; i++) {
    const point = points[i]
    if (
      !Array.isArray(point) ||
      point.length !== 2 ||
      typeof point[0] !== 'number' ||
      typeof point[1] !== 'number' ||
      !isFinite(point[0]) ||
      !isFinite(point[1])
    ) {
      res.status(400).json({
        error: `Point at index ${i} must be an array of two finite numbers [longitude, latitude]`,
      })
      return
    }
  }

  // Validation passed, continue to next middleware
  next()
}

export const validatePolygonId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const id = parseInt(req.params.id, 10)

  if (isNaN(id) || id <= 0) {
    res.status(400).json({ error: 'Invalid polygon id. Must be a positive integer' })
    return
  }

  // Attach parsed id to request for use in route handler
  req.params.id = id.toString()
  next()
}

