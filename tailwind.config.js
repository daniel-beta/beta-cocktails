/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class', // O 'media' para modo automático basado en preferencias del sistema
}