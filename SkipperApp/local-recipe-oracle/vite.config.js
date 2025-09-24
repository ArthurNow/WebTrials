import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/WebTrials/SkipperApp/local-recipe-oracle/',  // 👈 must match repo subfolder
})
