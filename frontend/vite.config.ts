import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Frontend runs on port 3000
// Backend runs on port 3001 (configured in backend/src/index.ts)
const FRONTEND_PORT = parseInt(process.env.VITE_PORT || '3000', 10)
const BACKEND_PORT = parseInt(process.env.VITE_BACKEND_PORT || '3001', 10)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: FRONTEND_PORT,
    proxy: {
      '/api': {
        target: `http://localhost:${BACKEND_PORT}`,
        changeOrigin: true,
        // Ensure cookies are properly forwarded
        cookieDomainRewrite: 'localhost',
        cookiePathRewrite: '/',
        // Preserve cookies when proxying
        xfwd: true,
      },
    },
  },
})

