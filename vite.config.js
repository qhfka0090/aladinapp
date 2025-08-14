import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://qhfka0090.github.io/aladinapp/', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})