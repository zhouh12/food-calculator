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
        background: {
          DEFAULT: '#F6FAFD',
        },
        sidebar: {
          DEFAULT: '#F6FAFD',
          foreground: '#575757',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'transparent',
          'accent-foreground': '#4299E1',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
    },
  },
}
