/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'fec-color':'#F9F2FF'
      },
      // Include transform module
      transform: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [
  
  ],
}
