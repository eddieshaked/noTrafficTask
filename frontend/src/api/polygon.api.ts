import { apiClient } from './client'

export interface Polygon {
  id: number
  name: string
  points: [number, number][]
  userId: string
}

export interface CreatePolygonDto {
  name: string
  points: [number, number][]
}

/**
 * Create a new polygon
 */
export const createPolygon = async (data: CreatePolygonDto): Promise<Polygon> => {
  const response = await apiClient.post<Polygon>('/polygon', data)
  return response.data
}

/**
 * Get all polygons for the current user
 */
export const getAllPolygons = async (): Promise<Polygon[]> => {
  const response = await apiClient.get<Polygon[]>('/polygons')
  return response.data
}

/**
 * Get a polygon by id
 */
export const getPolygonById = async (id: number): Promise<Polygon> => {
  const response = await apiClient.get<Polygon>(`/polygons/${id}`)
  return response.data
}

/**
 * Delete a polygon by id
 */
export const deletePolygon = async (id: number): Promise<void> => {
  await apiClient.delete(`/polygons/${id}`)
}

