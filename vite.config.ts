import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Actions sets BASE_PATH to /repository-name/.
// For local development, Vite uses /.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
})
