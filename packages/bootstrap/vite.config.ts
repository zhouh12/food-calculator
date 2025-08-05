import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://v6.vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    target: 'modules',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          bootstrap: ['bootstrap', 'react-bootstrap']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})