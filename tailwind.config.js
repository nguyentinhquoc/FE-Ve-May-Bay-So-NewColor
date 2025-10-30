/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    container: {
      center: true,
      screens: {
        sm: "40rem",   // 640px
        md: "48rem",   // 768px
        lg: "64rem",   // 1024px
        xl: "80rem",   // 1280px
        // ❌ không khai báo 2xl để bỏ rule 96rem
      },
    },
  },
};
