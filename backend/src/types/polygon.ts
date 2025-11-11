export interface Polygon {
  id: number
  name: string
  points: [number, number][] // Array of [longitude, latitude] pairs
  userId: string // Session ID of the user who created the polygon
}

export interface CreatePolygonDto {
  name: string
  points: [number, number][]
  userId: string // Session ID (from cookies)
}

