/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme.js'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Nunito Sans',
          'Nunito Sans Fallback',
          ...defaultTheme.fontFamily.sans,
        ]
      }
    },
  },
  plugins: [],
}
