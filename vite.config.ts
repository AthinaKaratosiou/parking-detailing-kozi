import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Root-relative assets work on Cloudflare's custom domain and preview URL.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
