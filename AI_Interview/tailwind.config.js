/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: 'selector',
  theme: {
    extend: {
      colors:{
        'custom-blue': '#0a2640',
        'custom-green':"#5cdb94",
      }
    },
  },
  plugins: [],
}
