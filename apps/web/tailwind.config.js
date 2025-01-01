// export * from '@core/ui/tailwind.config'

/** @type {import('tailwindcss').Config} */
import sharedConfig from '@core/ui/tailwind.config'

export default {
  // Extend the shared config
  ...sharedConfig,
  theme: {
    ...sharedConfig.theme,
    extend: {
      ...sharedConfig.theme.extend,
      colors: {
        ...sharedConfig.theme.extend.colors,
        primary: {
          DEFAULT: '#6843EC',
          foreground: '#fff',
        },
      },
    },
  },
}
