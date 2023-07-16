const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Karla', ...defaultTheme.fontFamily.sans],
        'flower': ['"Indie Flower"', ...defaultTheme.fontFamily.serif],
        'chelsea': ['"Chelsea Market"', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        'slate-blue': '#7E7BF2',

        'sand-yellow': '#F4D875',
        'sand-yellow-bright': '#FED542',
        'quarter-white': '#F7F1DD',
        'deep-bronze': '#443706',

        'dodger-blue': '#4F75FC',
        'hot-pink': '#FE72AD',

        'mint': '#9FD6D1',

        'pale-red': '#BD502E',
        'dull-blue': '#B8B7E5',
        'deep-purple': '#6260B4'
      },
      animation: {
        'slide-right': 'slide-right 100ms ease-out 1',
        'slide-left': 'slide-left 100ms ease-out 1',
        'slide-up': 'slide-up 100ms ease-out 1',
      },
      keyframes: {
        'slide-right': {
          '0%': { transform: 'translateX(-20%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-left': {
          '0%': { transform: 'translateX(20%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}

