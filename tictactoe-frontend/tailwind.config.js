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
      }
    },
  },
  plugins: [],
}

