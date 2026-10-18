import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './app/**/*.{js,vue,ts}',
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        // App-prefixed aliases matching design specifications
        'app-bg': 'rgb(var(--color-background) / <alpha-value>)',
        'app-surface': 'rgb(var(--color-surface) / <alpha-value>)',
        'app-surface-subtle': 'rgb(var(--color-surface-subtle) / <alpha-value>)',
        'app-surface-raised': 'rgb(var(--color-surface-raised) / <alpha-value>)',
        'app-border': 'rgb(var(--color-border) / <alpha-value>)',
        'app-primary': {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          hover: 'rgb(var(--color-primary-hover) / <alpha-value>)',
          soft: 'rgb(var(--color-primary-soft) / <alpha-value>)',
        },
        'app-primary-soft': 'rgb(var(--color-primary-soft) / <alpha-value>)',
        'app-primary-hover': 'rgb(var(--color-primary-hover) / <alpha-value>)',
        'app-text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'app-text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
        'app-accent': 'rgb(var(--color-accent) / <alpha-value>)',
        'app-accent-soft': 'rgb(var(--color-accent-soft) / <alpha-value>)',
        'app-success': 'rgb(var(--color-success) / <alpha-value>)',
        'app-warning': 'rgb(var(--color-warning) / <alpha-value>)',
        'app-danger': 'rgb(var(--color-danger) / <alpha-value>)',

        // Standard semantic tokens
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          subtle: 'rgb(var(--color-surface-subtle) / <alpha-value>)',
          raised: 'rgb(var(--color-surface-raised) / <alpha-value>)',
        },
        'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          hover: 'rgb(var(--color-primary-hover) / <alpha-value>)',
          soft: 'rgb(var(--color-primary-soft) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          soft: 'rgb(var(--color-accent-soft) / <alpha-value>)',
        },
        success: 'rgb(var(--color-success) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
      },
      borderRadius: {
        card: '16px',
        'card-lg': '20px',
        button: '12px',
        input: '12px',
        modal: '24px',
      },
      fontFamily: {
        sans: [
          'Montserrat',
          'IBM Plex Sans Arabic',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        heading: ['Montserrat', 'Reem Kufi', 'sans-serif'],
        arabic: ['IBM Plex Sans Arabic', 'sans-serif'],
      },
      maxWidth: {
        'app-container': '1360px',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        raised: '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
      },
      transitionDuration: {
        '140': '140ms',
        '180': '180ms',
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require('tailwindcss-rtl'),
  ],
} satisfies Config
