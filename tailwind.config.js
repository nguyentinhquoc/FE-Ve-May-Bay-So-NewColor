/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ejs,js}"
  ],
  theme: {
    // Đặt breakpoint desktop-first ở đây
    screens: {
      '2xl': {'max': '1535px'},
      'xl': {'max': '1279px'},
      'lg': {'max': '1023px'},
      'md': {'max': '767px'},
      'sm': {'max': '639px'},
    },
    // Chỉ control .container ở đây
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