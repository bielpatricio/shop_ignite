import { createStitches } from '@stitches/react'

export const {
  config,
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
} = createStitches({
  theme: {
    colors: {
      white: '#fff',

      gray900: '#121214',
      gray800: '#202024',
      gray300: '#c4c4cc',
      gray100: '#e1e1e6',

      green500: '#0f766e',
      green300: '#0d9488',

      indigo500: '#6366f1',
      indigo300: '#a5b4fc',
      indigo100: '#e0e7ff',

      purple800: '#6b21a8',
      purple500: '#a855f7',
      purple300: '#d8b4fe',
    },

    fontSizes: {
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
    },
  },
})
