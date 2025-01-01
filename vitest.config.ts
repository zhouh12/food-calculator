import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export const vitestConfig = defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html', 'text-summary', 'json-summary'],
      all: true,
    },
  },
})
