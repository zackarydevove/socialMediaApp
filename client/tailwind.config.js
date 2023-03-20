/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login_bg': "url('./images/twitterbg.png')",
      }
    },
  },
  plugins: [],
}