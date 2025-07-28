import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,           // allows you to use describe, it, expect without importing
    environment: 'jsdom',    // simulates browser DOM
    setupFiles: './src/setupTests.js' // optional, create this file if you need common setup
  }
})
