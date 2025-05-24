/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    screens:{
      base: "1200px",
      lg: "1000px",
      sm: "500px"

    },
    extend: {
      gridTemplateColumns:{
        "min": "300px 1fr"
      },
      fontFamily: {
        "quicksand": ['Quicksand', 'sans-serif']
      },
      fontSize:{
        "xxs": "10px"
      }
    },
  },
  plugins: [],
}
