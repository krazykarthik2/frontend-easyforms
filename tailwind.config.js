/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: { 
      colors: {
        'slightly-green': '#45824E',
        'slightly-red': '#f17676',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

