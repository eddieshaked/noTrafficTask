import axios from 'axios'

// Create axios instance with default configuration
export const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true, // Important: allows cookies to be sent with requests
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - ensure credentials are always sent
apiClient.interceptors.request.use(
  (config) => {
    // Ensure withCredentials is always true to send cookies (sessionId) with every request
    config.withCredentials = true
    
    // Optional: Log requests for debugging
    // console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`)
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor (optional - for error handling)
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle common errors here if needed
    if (error.response?.status === 401) {
      // Handle unauthorized errors
      console.error('Unauthorized: Session may be invalid')
    }
    return Promise.reject(error)
  }
)

