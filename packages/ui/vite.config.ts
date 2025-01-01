import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, './@'),
        src: resolve(__dirname, './src'),
      },
    },
    build: {
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, 'src/index.ts'),
        name: '@core/ui',
        // formats: ['es'],
        // fileName: (format) => `ui-v3.${format}.js`,
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled into your library
        external: ['react', 'react-dom'],
        // output: {
        //   // provide global variables to use in the UMD build for externalized deps
        //   globals: {
        //     react: 'React',
        //   },
        // },
      },
    },
    plugins: [react()],
  }
})
