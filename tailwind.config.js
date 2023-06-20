/** @type {import('tailwindcss').Config} */
module.exports ={
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      textShadow: {
        'default': '0 2px 5px rgba(0, 0, 0, 0.5)', // Add your desired shadow values
      },
    },
  },
  variants: {
    extend: {
      textShadow: ['hover'], // Add any additional variants you want to support
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
