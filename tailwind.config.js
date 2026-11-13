
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#090a0d',
        paper: '#f2eee8',
        accent: '#c5a77d',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"DM Sans"', 'sans-serif'],
      },
      screens: {
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
};