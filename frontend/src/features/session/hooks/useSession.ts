import { useQuery } from 'react-query'
import { getSession } from '../../../api/session.api'

export const useSession = () => {
  return useQuery('session', getSession, {
    staleTime: 30 * 60 * 1000, // Consider data fresh for 30 minutes
    cacheTime: 24 * 60 * 60 * 1000, // Cache for 24 hours
    retry: 1,
  })
}

