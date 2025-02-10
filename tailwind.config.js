/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e5ffff',
          100: '#ccffff',
          200: '#99ffff',
          300: '#66ffff',
          400: '#33ffff',
          500: '#00ffff',
          600: '#00cccc',
          700: '#009999',
          800: '#006666',
          900: '#003333',
          950: '#001a1a'
        },
        secondary: {
          50: '#ffe5ff',
          100: '#ffccff',
          200: '#ff99ff',
          300: '#ff66ff',
          400: '#ff33ff',
          500: '#ff00ff',
          600: '#cc00cc',
          700: '#990099',
          800: '#660066',
          900: '#330033',
          950: '#1a001a'
        },
        accent: {
          50: '#ffe5e5',
          100: '#ffcccc',
          200: '#ff9999',
          300: '#ff6666',
          400: '#ff3333',
          500: '#ff0000',
          600: '#cc0000',
          700: '#990000',
          800: '#660000',
          900: '#330000',
          950: '#1a0000'
        }
      }
    },
  },
  plugins: [],
}

