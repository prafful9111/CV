/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fontOne: ['FontOne', 'Griastetrial'], // your first custom font
        fontTwo: ['FontTwo', 'Gatometrix'],      // your second custom font
      },
    },
  },
  plugins: [],
};