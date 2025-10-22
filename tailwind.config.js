/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'card-light': '0 4px 12px rgba(30, 60, 90, 0.08)', // soft, subtle blueish shadow
        'card-dark': '0 4px 12px rgba(0, 0, 0, 0.4)',      // deeper cozy dark shadow
        'card-yellow-light': '0 12px 28px rgba(250, 204, 21, 0.10)', // warm glow
        'card-yellow-dark':  '0 12px 28px rgba(250, 204, 21, 0.10)',
        'card-red-light': '0 12px 28px rgba(255, 18, 18, 0.1)',     // calm red
        'card-red-dark':  '0 12px 28px rgba(255, 20, 20, 0.1)',
      
      },
    },
  },
  plugins: [],
}
