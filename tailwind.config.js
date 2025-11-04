/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ejs,js}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "40rem",
        xl: "48rem",
        lg: "64rem",
        xl: "80rem",
        "2xl": "80rem"
      }
    },
    extend: {},
  },
  plugins: [],
}