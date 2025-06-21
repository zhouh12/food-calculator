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
          foreground: '#FFFFFF',
        },
        background: {
          DEFAULT: '#F6FAFD',
          secondary: '#FFFFFF',
        },
        // fitness: {
        //   primary: '#4F46E5', // Indigo-600
        //   secondary: '#7C3AED', // Violet-600
        //   light: '#F8FAFC', // Slate-50
        // },
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
