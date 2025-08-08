/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        writing: ['"Atkinson Hyperlegible"', 'sans-serif'],
        calm: ['"Lexend Deca"', 'sans-serif'],
      },
      colors: {
        darkCustom: '#252525',
      },
    },
  },
  plugins: [],
};