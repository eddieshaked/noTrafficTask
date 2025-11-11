import { CreatePolygonDto, Polygon } from '../../types/polygon'
import prisma from '../database'
import { logger } from '../logger'

export class PolygonService {
  async createPolygon(data: CreatePolygonDto): Promise<Polygon> {
    // Store points as JSON string
    const pointsJson = JSON.stringify(data.points)
    
    const polygon = await prisma.polygon.create({
      data: {
        name: data.name,
        points: pointsJson,
        userId: data.userId,
      },
    })
    
    logger.info(`Created polygon with id: ${polygon.id} for userId: ${data.userId}`)
    
    return {
      id: polygon.id,
      name: polygon.name,
      points: JSON.parse(polygon.points) as [number, number][],
      userId: polygon.userId,
    }
  }

  async getAllPolygons(userId: string): Promise<Polygon[]> {
    const polygons = await prisma.polygon.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    type PrismaPolygon = typeof polygons[number]
    
    return polygons.map((polygon: PrismaPolygon) => {
      const result: Polygon = {
        id: polygon.id,
        name: polygon.name,
        points: JSON.parse(polygon.points) as [number, number][],
        userId: polygon.userId,
      }
      return result
    })
  }

  async getPolygonById(id: number, userId: string): Promise<Polygon | null> {
    const polygon = await prisma.polygon.findFirst({
      where: {
        id,
        userId,
      },
    })
    
    if (!polygon) {
      return null
    }
    
    return {
      id: polygon.id,
      name: polygon.name,
      points: JSON.parse(polygon.points) as [number, number][],
      userId: polygon.userId,
    }
  }

  async deletePolygon(id: number, userId: string): Promise<boolean> {
    try {
      const result = await prisma.polygon.deleteMany({
        where: {
          id,
          userId,
        },
      })
      
      const deleted = result.count > 0
      
      if (deleted) {
        logger.info(`Deleted polygon with id: ${id} for userId: ${userId}`)
      } else {
        logger.warn(`Polygon with id ${id} not found for userId: ${userId}`)
      }
      
      return deleted
    } catch (error) {
      logger.error(`Error deleting polygon: ${error}`)
      return false
    }
  }
}

export const polygonService = new PolygonService()

