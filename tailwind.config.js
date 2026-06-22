/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Jost', 'sans-serif'],
      },
      colors: {
        cream: '#FAF7F2',
        beige: '#EDE8DF',
        taupe: '#C8BEB0',
        muted: '#8B7E6E',
        dark: '#1a1a1a',
        accent: '#6B5E50',
      }
    },
  },
  plugins: [],
}