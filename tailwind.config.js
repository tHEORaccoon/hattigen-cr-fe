/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			poppins: [
  				'Poppins"'
  			]
  		},
  		colors: {
  			primary: '#18AD36',
  			'primary-light': '#4DDC66',
  			'primary-dark': '#0E7A25',
  			secondary: '#0A0E0F',
  			'secondary-light': '#33383C',
  			'secondary-dark': '#050607',
  			'cv-gray': '#5C5C5C',
  			'gray-light': '#8C8C8C',
  			'gray-dark': '#3A3A3A',
  			'cv-white': '#FEFEFE',
  			'off-white': '#F5F5F5',
  			'cv-blue': '#005AE0',
  			error: '#FF1A1A'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
