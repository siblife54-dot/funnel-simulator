import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages publishes this project at /funnel-simulator/, not at domain root.
  base: '/funnel-simulator/',
  plugins: [react()],
})
