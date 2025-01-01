import { defineConfig, mergeConfig } from 'vitest/config'
import { vitestConfig } from '../../vitest.config'

export default defineConfig(() => {
  return mergeConfig(vitestConfig, {
    // Add custom config here
    test: {
      setupFiles: './vitest.setup.ts',
    },
  })
})
