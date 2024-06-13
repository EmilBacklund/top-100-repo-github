/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './index.html', './src/styles/*.css'],
  theme: {
    extend: {
      colors: {
        primaryRed: '#EB737A',
        primaryBlue: '#4078C0',
        primaryYellow: '#C0A440',
        primaryGrey: '#909090',
        secondaryGrey: '#474747',
        background: '#333333',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      maxWidth: {
        container: '960px',
      },
      screens: {
        smallScreen: '457px',
        tablet: '686px',
      },
    },
  },
  plugins: [],
};
