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
    },
  },
  plugins: [],
}

