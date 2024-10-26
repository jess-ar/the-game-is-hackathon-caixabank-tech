/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007EAE', // Light primary blue
          dark: '#005C9E', // Darker blue
        },
        secondary: {
          DEFAULT: '#90caf9', // Lighter blue for dark mode
          dark: '#ff4081', // Secondary color in dark mode
        },
        background: {
          light: '#F4F5F7', // Light background
          dark: '#121212', // Dark background
        },
        text: {
          primary: '#333333', // Dark text
          secondary: '#777777', // Lighter gray text
          light: '#ffffff', // Light text in dark mode
          gray: '#bbbbbb', // Grayish text in dark mode
        },
      },
      borderRadius: {
        'lg': '16px',
        'full': '50px',
      },
      boxShadow: {
        light: '0 2px 10px rgba(0, 0, 0, 0.1)',
        dark: '0 2px 10px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};

