import { apiClient } from './client'

export interface SessionResponse {
  sessionId: string
  message: string
}

/**
 * Get or create a session
 * If a sessionId already exists in cookies, it returns the existing one
 * Otherwise, it creates a new session and sets it in cookies
 */
export const getSession = async (): Promise<SessionResponse> => {
  const response = await apiClient.get<SessionResponse>('/session')
  return response.data
}

