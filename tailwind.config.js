/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins"'],
      },
      colors: {
        'primary': '#18AD36',
        'primary-light': '#4DDC66',
        'primary-dark': '#0E7A25',
        'secondary': '#0A0E0F',
        'secondary-light': '#33383C',
        'secondary-dark': '#050607',
        'gray': '#5C5C5C',
        'gray-light': '#8C8C8C',
        'gray-dark': '#3A3A3A',
        'white': '#FEFEFE',
        'off-white': '#F5F5F5',
        'blue': "#005AE0"
      },
    },
  },
  plugins: [],
};
